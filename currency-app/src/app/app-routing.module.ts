import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyComponent } from './currency/currency.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {path:'', component:CurrencyComponent},
  {path:'front', component:CurrencyComponent},
  {path:'chart', component:ChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
