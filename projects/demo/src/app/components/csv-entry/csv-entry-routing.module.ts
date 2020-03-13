import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { CSVEntryComponent } from './csv-entry.component';


const routes: Routes = [
  {
    path: '',
    component: CSVEntryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CSVEntryRoutingModule { }
