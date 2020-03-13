import {
  ExistingProvider,
  forwardRef,
  Type,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


export const ControlValueAccessorProviderFactory = <T>(type: Type<T>): ExistingProvider => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => type),
  multi: true,
});
