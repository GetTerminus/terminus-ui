import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TsButtonModule } from './../button/button.module';
import { TsSelectModule } from './../select/select.module';
import { TsMenuModule } from './../menu/menu.module';
import { TsTooltipModule } from './../tooltip/tooltip.module';

import { TsPaginatorComponent } from './paginator.component';
export { TsPaginatorComponent } from './paginator.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TsButtonModule,
    TsSelectModule,
    TsMenuModule,
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
