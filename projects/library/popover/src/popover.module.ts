import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TsPopoverTriggerDirective } from './popover-trigger.directive';
import { TsPopoverComponent } from './popover.component';

export * from './popover.component';
export * from './popover-trigger.directive';
export * from './popover-options';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TsPopoverComponent,
    TsPopoverTriggerDirective,
  ],
  exports: [
    TsPopoverComponent,
    TsPopoverTriggerDirective,
  ],
})
export class TsPopoverModule { }
