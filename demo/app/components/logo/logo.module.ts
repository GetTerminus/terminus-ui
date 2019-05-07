import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TsCardModule } from '@terminus/ui/card';
import { TsLogoModule } from '@terminus/ui/logo';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { LogoRoutingModule } from './logo-routing.module';
import { LogoComponent } from './logo.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    LogoRoutingModule,
    TsCardModule,
    TsLogoModule,
    TsSpacingModule,
  ],
  declarations: [
    LogoComponent,
  ],
})
export class LogoModule {}
