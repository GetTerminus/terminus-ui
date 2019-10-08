import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TsCardModule } from '@terminus/ui/card';
import { TsPipesModule } from '@terminus/ui/pipes';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { PipesRoutingModule } from './pipes-routing.module';
import { PipesComponent } from './pipes.component';


@NgModule({
  imports: [
    CommonModule,
    PipesRoutingModule,
    TsCardModule,
    TsPipesModule,
    TsSpacingModule,
  ],
  declarations: [
    PipesComponent,
  ],
})
export class PipesModule {}
