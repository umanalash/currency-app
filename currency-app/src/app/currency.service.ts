import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  constructor(private http: HttpClient) { }

  getCurrency(baseCurrency:string): Observable<any> {
    const url=`https://openexchangerates.org/api/latest.json?app_id=fcce0b7e80e64a4fa32b081d1a261cb9&base=${baseCurrency}`;
    console.log('url:',url);
    return this.http.get(url);
  }

  getDate( selectedDate: string): Observable<any> {
    const url1=`https://openexchangerates.org/api/historical/${selectedDate}.json?app_id=fcce0b7e80e64a4fa32b081d1a261cb9`;
    console.log('kkk' + url1);
    return this.http.get(url1);
  }

}


