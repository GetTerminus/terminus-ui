import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { CohortDateRangeComponent } from './cohort-date-range.component';


const routes: Routes = [
  {
    path: '',
    component: CohortDateRangeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CohortDateRangeRoutingModule { }
