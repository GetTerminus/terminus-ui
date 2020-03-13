import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { TsIconModule } from '@terminus/ui/icon';

import { TsChipBadgeDirective } from './chip-badge.directive';
import { TsChipCollectionComponent } from './chip-collection.component';
import { TsChipComponent } from './chip.component';

export * from './chip.component';
export * from './chip-collection.component';
export * from './chip-badge.directive';

const EXPORTED_DECLARATIONS = [
  TsChipBadgeDirective,
  TsChipComponent,
  TsChipCollectionComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    TsIconModule,
  ],
  declarations: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class TsChipModule { }
