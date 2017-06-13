import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaddaModule } from 'angular2-ladda';
import {
  MdButtonModule,
  MdIconModule,
} from '@angular/material';

import { LibComponent } from './components/lib.component';
import { LibService } from './service/lib.service';

import { ButtonComponent } from './components/button/button.component';

const MATERIAL_MODULES = [
  MdButtonModule,
  MdIconModule,
];

const TERMINUS_COMPONENTS = [
  LibComponent,
  ButtonComponent,
  /*
   *InputComponent,
   *InputMessagesComponent,
   *SearchComponent,
   */
];

@NgModule({
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    LaddaModule.forRoot({
      style: 'expand-right',
    }),
  ],
  declarations: [
    ...TERMINUS_COMPONENTS,
  ],
  providers: [
    LibService,
  ],
  exports: [
    ...TERMINUS_COMPONENTS,
  ],
})
export class TerminusUIModule { }
