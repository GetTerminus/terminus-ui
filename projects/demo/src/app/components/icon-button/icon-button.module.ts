import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TsButtonModule } from '@terminus/ui/button';
import { TsCardModule } from '@terminus/ui/card';
import { TsIconButtonModule } from '@terminus/ui/icon-button';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { IconButtonRoutingModule } from './icon-button-routing.module';
import { IconButtonComponent } from './icon-button.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    IconButtonRoutingModule,
    TsButtonModule,
    TsCardModule,
    TsIconButtonModule,
    TsSpacingModule,
  ],
  declarations: [
    IconButtonComponent,
  ],
})
export class IconButtonModule {}
