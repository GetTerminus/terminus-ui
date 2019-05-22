import { NgModule } from '@angular/core';

import { TsReactiveFormBaseComponent } from './reactive-form-base/reactive-form-base.component';

export * from './cva-provider-factory/cva-provider-factory';
export * from './input-has-changed/input-has-changed';
export * from './merge/merge';
export * from './reactive-form-base/reactive-form-base.component';
export * from './strip-control-characters/strip-control-characters';
export * from './type-coercion/is-abstract-control';
export * from './type-coercion/is-drag-event';
export * from './type-coercion/is-html-input-element';
export * from './type-coercion/is-keyboard-event';
export * from './type-coercion/is-mouse-event';
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
