import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TsCardModule } from '@terminus/ui/card';
import { TsDateRangeModule } from '@terminus/ui/date-range';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { DateRangeRoutingModule } from './date-range-routing.module';
import { DateRangeComponent } from './date-range.component';

@NgModule({
  imports: [CommonModule, DateRangeRoutingModule, FormsModule, ReactiveFormsModule, TsCardModule, TsDateRangeModule, TsSpacingModule],
  declarations: [DateRangeComponent],
})
export class DateRangeModule {}
