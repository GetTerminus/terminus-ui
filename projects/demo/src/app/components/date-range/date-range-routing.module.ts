import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { DateRangeComponent } from './date-range.component';


const routes: Routes = [
  {
    path: '',
    component: DateRangeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DateRangeRoutingModule { }
