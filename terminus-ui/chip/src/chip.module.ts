import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { TsIconModule } from '@terminus/ui/icon';

import { TsChipCollectionComponent } from './chip-collection.component';
import { TsChipComponent } from './chip.component';

export * from './chip.component';
export * from './chip-collection.component';


@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    TsIconModule,
  ],
  declarations: [
    TsChipComponent,
    TsChipCollectionComponent,
  ],
  exports: [
    TsChipComponent,
    TsChipCollectionComponent,
  ],
})
export class TsChipModule { }
