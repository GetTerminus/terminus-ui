import { NgModule } from '@angular/core';
import {
  RouterModule, Routes,
} from '@angular/router';

import { AutofocusComponent } from './autofocus.component';


const routes: Routes = [
  {
    path: '',
    component: AutofocusComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutofocusRoutingModule { }
