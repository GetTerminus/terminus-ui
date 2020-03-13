import { NgModule } from '@angular/core';
import {
  RouterModule, Routes,
} from '@angular/router';

import { SpacingComponent } from './spacing.component';


const routes: Routes = [
  {
    path: '',
    component: SpacingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpacingRoutingModule { }
