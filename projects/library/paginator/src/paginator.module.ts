import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsButtonModule } from '@terminus/ui/button';
import { TsMenuModule } from '@terminus/ui/menu';
import { TsOptionModule } from '@terminus/ui/option';
import { TsSelectionListModule } from '@terminus/ui/selection-list';
import { TsTooltipModule } from '@terminus/ui/tooltip';

import { TsPaginatorComponent } from './paginator.component';

export * from './paginator.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TsButtonModule,
    TsMenuModule,
    TsOptionModule,
    TsSelectionListModule,
    TsTooltipModule,
  ],
  exports: [
    TsPaginatorComponent,
  ],
  declarations: [
    TsPaginatorComponent,
  ],
})
export class TsPaginatorModule {}
