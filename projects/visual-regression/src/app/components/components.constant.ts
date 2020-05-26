import { Routes } from '@angular/router';


export const componentsList: Routes = [
  {
    path: 'button',
    loadChildren: () => import('./button/button.module').then(m => m.ButtonModule),
    data: { name: 'Button' },
  },
  {
    path: 'card',
    loadChildren: () => import('./card/card.module').then(m => m.CardModule),
  },
  {
    path: 'chip',
    loadChildren: () => import('./chip/chip.module').then(m => m.ChipModule),
  },
  {
    path: 'expansion-panel',
    loadChildren: () => import('./expansion-panel/expansion-panel.module').then(m => m.ExpansionPanelModule),
  },
  {
    path: 'input',
    loadChildren: () => import('./input/input.module').then(m => m.InputModule),
    data: { name: 'Input' },
  },
  {
    path: 'paginator',
    loadChildren: () => import('./paginator/paginator.module').then(m => m.PaginatorModule),
    data: { name: 'Paginator' },
  },
  {
    path: 'selection-list',
    loadChildren: () => import('./selection-list/selection-list.module').then(m => m.SelectionListModule),
    data: { name: 'Selection List' },
  },
  {
    path: 'validation',
    loadChildren: () => import('./validation/validation.module').then(m => m.ValidationModule),
    data: { name: 'Validation' },
  },
];
