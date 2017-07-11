import { Routes } from '@angular/router';

import { ButtonComponent } from './button.component';
import { InputComponent } from './input.component';
import { MenuComponent } from './menu.component';
import { SelectComponent } from './select.component';
import { PaginationComponent } from './pagination.component';
import { ToggleComponent } from './toggle.component';

export const componentsList: Routes = [
  {
    path: 'button',
    component: ButtonComponent,
    data: {
      name: 'Button',
    },
  },
  {
    path: 'input',
    component: InputComponent,
    data: {
      name: 'Input',
    },
  },
  {
    path: 'menu',
    component: MenuComponent,
    data: {
      name: 'Menu',
    },
  },
  {
    path: 'select',
    component: SelectComponent,
    data: {
      name: 'Select',
    },
  },
  {
    path: 'pagination',
    component: PaginationComponent,
    data: {
      name: 'Pagination',
    },
  },
  {
    path: 'toggle',
    component: ToggleComponent,
    data: {
      name: 'Toggle',
    },
  },
];
