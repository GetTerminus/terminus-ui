import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsOptionModule } from '@terminus/ui/option';
import { TsPopoverModule } from '@terminus/ui/popover';
import { TsSelectionListModule } from '@terminus/ui/selection-list';

import { PopoverRoutingModule } from './popover-routing.module';
import { PopoverComponent } from './popover.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PopoverRoutingModule,
    ReactiveFormsModule,
    TsPopoverModule,
    TsSelectionListModule,
    TsOptionModule,
  ],
  declarations: [
    PopoverComponent,
  ],
})
export class PopoverModule {}
