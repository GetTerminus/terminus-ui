import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TsAutofocusDirective } from './autofocus.directive';

export * from './autofocus.directive';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TsAutofocusDirective,
  ],
  exports: [
    TsAutofocusDirective,
  ],
})
export class TsAutofocusModule {}
