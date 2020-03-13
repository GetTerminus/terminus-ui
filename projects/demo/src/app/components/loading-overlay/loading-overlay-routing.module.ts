import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { LoadingOverlayComponent } from './loading-overlay.component';


const routes: Routes = [
  {
    path: '',
    component: LoadingOverlayComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingOverlayRoutingModule { }
