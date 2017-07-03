import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ButtonComponent } from './components/button.component';
import { InputComponent } from './components/input.component';
import { MenuComponent } from './components/menu.component';
import { SelectComponent } from './components/select.component';
import { PaginationComponent } from './components/pagination.component';
import { ToggleComponent } from './components/toggle.component';

const routes: Routes = [
  {
    path: 'components',
    component: ComponentsComponent,
    children: [
      {
        path: 'button',
        component: ButtonComponent,
      },
      {
        path: 'input',
        component: InputComponent,
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'pagination',
        component: PaginationComponent,
      },
      {
        path: 'select',
        component: SelectComponent,
      },
      {
        path: 'toggle',
        component: ToggleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
