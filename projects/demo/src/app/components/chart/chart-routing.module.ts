import { NgModule } from '@angular/core';
import {
  RouterModule, Routes,
} from '@angular/router';

import { ChartComponent } from './chart.component';


const routes: Routes = [
  {
    path: '',
    component: ChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartRoutingModule { }
