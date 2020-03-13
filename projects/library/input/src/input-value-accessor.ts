import { InjectionToken } from '@angular/core';


/**
 * This token is used to inject the object whose value should be set into {@link TsInputComponent}. If none is
 * provided, the native `HTMLInputElement` is used. Directives like {@link TsAutocompleteTriggerDirective} can provide
 * themselves for this token, in order to make `TsInputComponent` delegate the getting and setting of the
 * value to them.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TS_INPUT_VALUE_ACCESSOR = new InjectionToken<{value: any}>('TS_INPUT_VALUE_ACCESSOR');
