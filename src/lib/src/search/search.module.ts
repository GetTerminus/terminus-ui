import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TsInputModule } from '@input/input.module';
import { TsButtonModule } from '@button/button.module';

import { TsSearchComponent } from '@search/search.component';
export { TsSearchComponent } from '@search/search.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
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
