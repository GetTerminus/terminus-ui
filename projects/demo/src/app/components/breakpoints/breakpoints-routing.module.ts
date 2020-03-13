import { NgModule } from '@angular/core';
import {
  RouterModule, Routes,
} from '@angular/router';

import { BreakpointsComponent } from './breakpoints.component';


const routes: Routes = [
  {
    path: '',
    component: BreakpointsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BreakpointsRoutingModule { }
