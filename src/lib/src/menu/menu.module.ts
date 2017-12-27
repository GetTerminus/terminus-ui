import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TsButtonModule } from '@button/button.module';

import { TsMenuComponent } from '@menu/menu.component';
export { TsMenuComponent } from '@menu/menu.component';


@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    TsButtonModule,
  ],
  exports: [
    TsMenuComponent,
  ],
  declarations: [
    TsMenuComponent,
  ],
})
export class TsMenuModule {}
