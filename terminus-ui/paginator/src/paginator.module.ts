import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TsButtonModule } from '@terminus/ui/button';
import { TsMenuModule } from '@terminus/ui/menu';
import { TsOptionModule } from '@terminus/ui/option';
import { TsSelectModule } from '@terminus/ui/select';
import { TsTooltipModule } from '@terminus/ui/tooltip';

import { TsPaginatorComponent } from './paginator.component';

export * from './paginator.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TsButtonModule,
    TsMenuModule,
    TsOptionModule,
    TsSelectModule,
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
