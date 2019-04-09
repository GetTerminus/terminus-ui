import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TsCardModule } from '@terminus/ui/card';
import { TsScrollbarsModule } from '@terminus/ui/scrollbars';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { ScrollbarsRoutingModule } from './scrollbars-routing.module';
import { ScrollbarsComponent } from './scrollbars.component';

@NgModule({
  imports: [CommonModule, FormsModule, ScrollbarsRoutingModule, TsCardModule, TsScrollbarsModule, TsSpacingModule],
  declarations: [ScrollbarsComponent],
})
export class ScrollbarsModule {}
