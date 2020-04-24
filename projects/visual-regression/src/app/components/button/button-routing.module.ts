import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { ButtonComponent } from './button.component';


const routes: Routes = [
  {
    path: '',
    component: ButtonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ButtonRoutingModule { }
