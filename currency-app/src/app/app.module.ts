import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyComponent } from './currency/currency.component';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { HeadComponent } from './head/head.component';
@NgModule({
  declarations: [
    AppComponent,
    CurrencyComponent,
    ChartComponent,
    HeadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

