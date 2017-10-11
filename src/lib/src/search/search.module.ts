import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TsInputModule } from './../input/input.module';
import { TsButtonModule } from './../button/button.module';

import { TsSearchComponent } from './search.component';
export { TsSearchComponent } from './search.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TsInputModule,
    TsButtonModule,
  ],
  exports: [
    TsSearchComponent,
  ],
  declarations: [
    TsSearchComponent,
  ],
})
export class TsSearchModule {}
