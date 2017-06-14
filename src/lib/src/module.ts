// Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 3rd party imports
import { LaddaModule } from 'angular2-ladda';
import {
  MdButtonModule,
  MdIconModule,
  MdInputModule,
} from '@angular/material';

const MATERIAL_MODULES = [
  MdButtonModule,
  MdIconModule,
  MdInputModule,
];

// Components (atoms)
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { InputMessagesComponent } from './components/input-messages/input-messages.component';

// Components (compound)
/*
 *import { SearchModule } from './components/search/search.component';
 */


const TERMINUS_COMPONENTS = [
  ButtonComponent,
  InputComponent,
  InputMessagesComponent,
  /*
   *SearchComponent,
   */
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ...MATERIAL_MODULES,
    LaddaModule.forRoot({
      style: 'expand-right',
    }),
  ],
  declarations: [
    ...TERMINUS_COMPONENTS,
  ],
  providers: [
  ],
  exports: [
    ...TERMINUS_COMPONENTS,
  ],
})
export class TerminusUIModule { }
