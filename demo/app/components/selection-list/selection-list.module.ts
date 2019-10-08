import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsCardModule } from '@terminus/ui/card';
import { TsOptionModule } from '@terminus/ui/option';
import { TsSelectionListModule } from '@terminus/ui/selection-list';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { SelectionListRoutingModule } from './selection-list-routing.module';
import { SelectionListComponent } from './selection-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectionListRoutingModule,
    TsCardModule,
    TsOptionModule,
    TsSelectionListModule,
    TsSpacingModule,
  ],
  declarations: [SelectionListComponent],
})
export class SelectionListModule {}
