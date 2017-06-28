import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ButtonComponent } from './components/button.component';
import { InputComponent } from './components/input.component';
import { MenuComponent } from './components/menu.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
