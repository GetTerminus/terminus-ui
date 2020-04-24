import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsOptionModule } from '@terminus/ui/option';
import { TsSelectionListModule } from '@terminus/ui/selection-list';

import { SelectionListRoutingModule } from './selection-list-routing.module';
import { SelectionListComponent } from './selection-list.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectionListRoutingModule,
    ReactiveFormsModule,
    TsOptionModule,
    TsSelectionListModule,
    FlexLayoutModule,
  ],
  declarations: [
    SelectionListComponent,
  ],
})
export class SelectionListModule {}
