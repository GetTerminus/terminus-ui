import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { CopyComponent } from './copy.component';


const routes: Routes = [
  {
    path: '',
    component: CopyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopyRoutingModule { }
