import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { LogoComponent } from './logo.component';


const routes: Routes = [
  {
    path: '',
    component: LogoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogoRoutingModule { }
