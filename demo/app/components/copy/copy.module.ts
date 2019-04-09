import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TsCardModule } from '@terminus/ui/card';
import { TsCopyModule } from '@terminus/ui/copy';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { CopyRoutingModule } from './copy-routing.module';
import { CopyComponent } from './copy.component';

@NgModule({
  imports: [CommonModule, CopyRoutingModule, FormsModule, TsCardModule, TsCopyModule, TsSpacingModule],
  declarations: [CopyComponent],
})
export class CopyModule {}
