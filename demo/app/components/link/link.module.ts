import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TsCardModule } from '@terminus/ui/card';
import { TsLinkModule } from '@terminus/ui/link';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { LinkRoutingModule } from './link-routing.module';
import { LinkComponent } from './link.component';

@NgModule({
  imports: [CommonModule, LinkRoutingModule, TsCardModule, TsLinkModule, TsSpacingModule],
  declarations: [LinkComponent],
})
export class LinkModule {}
