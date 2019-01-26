import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsTabContentDirective } from './tab-content.directive';
import { TsTabHeaderDirective } from './tab-header.directive';
import { TsTabsetComponent } from './tabs.component';

export * from './tab-content.directive';
export * from './tab-header.directive';
export * from './tabs.component';
export * from './tab';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [TsTabContentDirective, TsTabHeaderDirective, TsTabsetComponent],
  declarations: [TsTabContentDirective, TsTabHeaderDirective, TsTabsetComponent],
})
export class TsTabsModule { }
