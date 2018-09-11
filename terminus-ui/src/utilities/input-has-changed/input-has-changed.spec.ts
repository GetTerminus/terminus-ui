import {
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

import { inputHasChanged } from './input-has-changed';


describe(`inputHasChanged`, () => {
  const changed = {
    item1: new SimpleChange(undefined, true, true),
    item2: new SimpleChange('foo', 'foo', false),
  } as SimpleChanges;


  test(`should return undefined if the changes object or key are missing`, () => {
    expect(inputHasChanged(null as any, 'foo')).toEqual(undefined);
    expect(inputHasChanged(null as any, 'foo')).toEqual(undefined);
  });


  test(`should return true if the value has changed`, () => {
    expect(inputHasChanged(changed, 'item1')).toEqual(true);
    expect(inputHasChanged(changed, 'item2')).toEqual(false);
  });

});
