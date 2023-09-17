import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CurrencyService } from '../currency.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})

export class ChartComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef | undefined;
  baseCurrency: string = 'USD';
  selectedDate: string = ''; 
  chart: any;
  rateOptions: string[] = [];
  currencies: string[] = [];
  amount:number=1;
  exchangeRates: { [key: string]: number } = {};
  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.fetchCurrencyData();
    const currentDate = new Date();
    this.selectedDate = this.getFormattedDate(currentDate);
  }

  fetchCurrencyData() {
    this.currencyService.getCurrency(this.baseCurrency).subscribe(
      (data) => {
        this.rateOptions = Object.keys(data.rates);
        this.updateChart();
        console.log('Fetched currency data:', data);
      },
      (error) => {
        console.error('Error fetching currency data:', error);
      }
    );
  }
  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  updateChart() {
    if (this.selectedDate && this.canvas) {
      const ctx = this.canvas.nativeElement.getContext('2d');
      if (ctx) {
        this.currencyService
          .getDate(this.selectedDate)
          .subscribe((data: any) => {
            this.currencies = Object.keys(data.rates),
            this.exchangeRates = data.rates;

            if (this.chart) {
              this.chart.destroy();
            }

            this.chart = new Chart(ctx, {
              type: 'line',
              data: {
                labels: this.currencies,
                datasets: [
                  {
                    label:  `Exchange Rates for ${this.baseCurrency} on ${this.selectedDate}`,
                    data:  this.currencies.map((currency) => this.exchangeRates[currency]),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  },
                ],
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Currencies',
                      font : {
                        size:22,
                      }
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Exchange Rate',
                      font : {
                        size:22,
                      }
                    },
                    beginAtZero: true,
                  },
                },
              },
            });
          });
        }
    }
  }
}


