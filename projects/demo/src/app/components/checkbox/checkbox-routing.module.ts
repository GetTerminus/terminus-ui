import { NgModule } from '@angular/core';
import {
  RouterModule, Routes,
} from '@angular/router';

import { CheckboxComponent } from './checkbox.component';


const routes: Routes = [
  {
    path: '',
    component: CheckboxComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckboxRoutingModule { }
