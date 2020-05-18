import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { ExpansionPanelComponent } from './expansion-panel.component';


const routes: Routes = [
  {
    path: '',
    component: ExpansionPanelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpansionPanelRoutingModule { }
