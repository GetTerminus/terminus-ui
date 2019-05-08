import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TsCardModule } from '@terminus/ui/card';

import { TypographyRoutingModule } from './typography-routing.module';
import { TypographyComponent } from './typography.component';


@NgModule({
  imports: [
    CommonModule,
    TsCardModule,
    TypographyRoutingModule,
  ],
  declarations: [
    TypographyComponent,
  ],
})
export class TypographyModule {}
