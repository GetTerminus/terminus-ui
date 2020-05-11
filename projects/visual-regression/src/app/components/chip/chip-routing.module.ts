import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { ChipComponent } from './chip.component';


const routes: Routes = [
  {
    path: '',
    component: ChipComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChipRoutingModule { }
