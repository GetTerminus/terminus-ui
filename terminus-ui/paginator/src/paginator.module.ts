import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TsButtonModule } from '@terminus/ui/button';
import { TsSelectModule } from '@terminus/ui/select';
import { TsMenuModule } from '@terminus/ui/menu';
import { TsTooltipModule } from '@terminus/ui/tooltip';

import { TsPaginatorComponent } from './paginator.component';

export * from './paginator.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TsButtonModule,
    TsMenuModule,
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