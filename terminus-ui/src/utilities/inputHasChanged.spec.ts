import { SimpleChanges, SimpleChange } from '@angular/core';

import { inputHasChanged } from './inputHasChanged';


describe(`inputHasChanged`, () => {

  const changed = {
    item1: new SimpleChange(undefined, true, true),
    item2: new SimpleChange('foo', 'foo', false),
  } as SimpleChanges;

  test(`should return true if the value has changed`, () => {
    expect(inputHasChanged(changed, 'item1')).toEqual(true);
    expect(inputHasChanged(changed, 'item2')).toEqual(false);
  });

});
