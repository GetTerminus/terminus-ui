import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { SelectionListComponent } from './selection-list.component';


const routes: Routes = [
  {
    path: '',
    component: SelectionListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectionListRoutingModule { }
