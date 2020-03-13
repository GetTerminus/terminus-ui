import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { DrawerComponent } from './drawer.component';


const routes: Routes = [
  {
    path: '',
    component: DrawerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrawerRoutingModule { }
