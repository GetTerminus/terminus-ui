import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsCardModule } from '@terminus/ui/card';
import { TsCohortDateRangeModule } from '@terminus/ui/cohort-date-range';
import { TsDateRangeModule } from "@terminus/ui/date-range";
import { TsSpacingModule } from '@terminus/ui/spacing';

import { CohortDateRangeComponent } from "./cohort-date-range.component";
import { CohortDateRangeRoutingModule } from "./cohort-date-range-routing.module";


@NgModule({
  imports: [
    CommonModule,
    CohortDateRangeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TsCardModule,
    TsCohortDateRangeModule,
    TsDateRangeModule,
    TsSpacingModule,
  ],
  declarations: [
    CohortDateRangeComponent,
  ],
})
export class CohortDateRangeModule {}
