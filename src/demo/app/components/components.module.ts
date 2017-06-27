import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TsButtonModule,
  TsInputModule,
  TsSearchModule,
  TsMenuModule,
} from '@terminus/ui';
import {
  MdMenuModule,
  MdIconModule,
} from '@angular/material';


import { DemoComponentsComponent } from './components.component';
import { DemoMenuComponent } from './menu.component';
import { DemoButtonComponent } from './button.component';
import { DemoInputComponent } from './input.component';


const routes: Routes = [
  {
    path: 'components',
    component: DemoComponentsComponent,
    children: [
      {
        path: 'menu',
        component: DemoMenuComponent,
      },
      {
        path: 'button',
        component: DemoButtonComponent,
      },
      {
        path: 'input',
        component: DemoInputComponent,
      },
    ],
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    BrowserAnimationsModule,
    TsButtonModule,
    TsInputModule,
    TsSearchModule,
    TsMenuModule,
    MdMenuModule,
    MdIconModule,
  ],
  declarations: [
    DemoComponentsComponent,
    DemoButtonComponent,
    DemoMenuComponent,
    DemoInputComponent,
  ],
})
export class ComponentsModule {
}

