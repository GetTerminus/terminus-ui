import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TsCardModule } from '@terminus/ui/card';
import { TsIconModule } from '@terminus/ui/icon';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { IconRoutingModule } from './icon-routing.module';
import { IconComponent } from './icon.component';

@NgModule({
  imports: [CommonModule, IconRoutingModule, TsCardModule, TsIconModule, TsSpacingModule],
  declarations: [IconComponent],
})
export class IconModule {}
