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
    path: 'input',
    loadChildren: () => import('./input/input.module').then(m => m.InputModule),
    data: { name: 'Input' },
  },
  {
    path: 'selection-list',
    loadChildren: () => import('./selection-list/selection-list.module').then(m => m.SelectionListModule),
    data: { name: 'Selection List' },
  },
];
