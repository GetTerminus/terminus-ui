import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { TypographyComponent } from './typography.component';


const routes: Routes = [
  {
    path: '',
    component: TypographyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypographyRoutingModule { }
