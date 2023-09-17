import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CurrencyService } from '../currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {
  currencyData: any;
  baseCurrency: string = 'USD';
  targetCurrency: string = 'INR';
  amount: number = 1;
  conversionResult: number=0;
  rateOptions:string[]=[];

  @Output() historicalDataEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private currencyService: CurrencyService) { }

  ngOnInit() {
    this.fetchCurrencyData();
  }

  fetchCurrencyData() {
    this.currencyService.getCurrency(this.baseCurrency).subscribe(
      (data) => {
        this.currencyData = data;
         this.rateOptions = Object.keys(this.currencyData.rates);
        console.log('Fetched currency data:', this.currencyData);
      },
      (error) => {
        console.error('Error fetching currency data:', error);
      }
    );
  }

  convertCurrency() {
    const rate = this.currencyData.rates[this.targetCurrency];
    if (rate) {
      this.conversionResult = this.amount * rate;
    } else {
      console.error(`Currency conversion rate not available for ${this.targetCurrency}`);
    }
  }
}
