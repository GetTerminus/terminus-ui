import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TsInputModule } from '@terminus/ui/input';
import { TsButtonModule } from '@terminus/ui/button';

import { TsSearchComponent } from './search.component';

export * from './search.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TsButtonModule,
    TsInputModule,
  ],
  exports: [
    TsSearchComponent,
  ],
  declarations: [
    TsSearchComponent,
  ],
})
export class TsSearchModule {}
