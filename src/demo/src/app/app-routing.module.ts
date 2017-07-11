import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { componentsList } from './components/components.constant';

import { ComponentsComponent } from './components/components.component';

const routes: Routes = [
  {
    path: 'components',
    component: ComponentsComponent,
    children: componentsList,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
