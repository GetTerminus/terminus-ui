import { NgModule } from '@angular/core';

import { TsReactiveFormBaseComponent } from './reactive-form-base/reactive-form-base.component';

export * from './cva-provider-factory/cva-provider-factory';
export * from './error/ui-error';
export * from './merge/merge';
export * from './reactive-form-base/reactive-form-base.component';
export * from './strip-control-characters/strip-control-characters';
export * from './types/style-theme.types';
export * from './version/version';


/**
 * NOTE: The Angular compiler requires all exported components to be part of a module. That is the purpose of this module.
 */
@NgModule({
  declarations: [
    TsReactiveFormBaseComponent,
  ],
  exports: [
    TsReactiveFormBaseComponent,
  ],
})
export class TsUtilitiesModule {}
