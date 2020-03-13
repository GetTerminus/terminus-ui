import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { PopoverComponent } from './popover.component';


const routes: Routes = [
  {
    path: '',
    component: PopoverComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopoverRoutingModule { }
