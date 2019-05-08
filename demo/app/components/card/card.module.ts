import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TsButtonModule } from '@terminus/ui/button';
import { TsCardModule } from '@terminus/ui/card';
import { TsMenuModule } from '@terminus/ui/menu';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { CardRoutingModule } from './card-routing.module';
import { CardComponent } from './card.component';


@NgModule({
  imports: [
    CardRoutingModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    TsButtonModule,
    TsCardModule,
    TsMenuModule,
    TsSpacingModule,
  ],
  declarations: [
    CardComponent,
  ],
})
export class CardModule {}
