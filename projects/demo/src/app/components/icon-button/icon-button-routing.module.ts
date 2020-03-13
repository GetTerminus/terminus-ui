import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { IconButtonComponent } from './icon-button.component';


const routes: Routes = [
  {
    path: '',
    component: IconButtonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IconButtonRoutingModule { }
