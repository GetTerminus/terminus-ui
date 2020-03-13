import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { FormControlsComponent } from './form-controls.component';


const routes: Routes = [
  {
    path: '',
    component: FormControlsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormControlsRoutingModule { }
