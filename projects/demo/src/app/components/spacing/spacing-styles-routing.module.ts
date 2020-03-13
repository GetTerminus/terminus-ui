import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { SpacingStylesComponent } from './spacing-styles.component';


const routes: Routes = [
  {
    path: '',
    component: SpacingStylesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpacingStylesRoutingModule { }
