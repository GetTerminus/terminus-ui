import { NgModule } from '@angular/core';
import {
  ExtraOptions,
  RouterModule,
  Routes,
} from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { componentsList } from './components/components.constant';


const routerOptions: ExtraOptions = { anchorScrolling: 'enabled' };

const routes: Routes = [
  {
    path: 'components',
    component: ComponentsComponent,
    children: componentsList,
  },
  {
    path: '**',
    redirectTo: '/components',
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
