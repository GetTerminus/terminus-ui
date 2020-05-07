import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TsCardModule } from '@terminus/ui/card';
import { TsPaginatorModule } from '@terminus/ui/paginator';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { PaginatorRoutingModule } from './paginator-routing.module';
import { PaginatorComponent } from './paginator.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaginatorRoutingModule,
    TsCardModule,
    TsPaginatorModule,
    TsSpacingModule,
  ],
  declarations: [
    PaginatorComponent,
  ],
})
export class PaginatorModule {}
