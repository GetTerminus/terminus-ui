import { createMouseEvent } from '@terminus/ngx-tools/testing';

import { isMouseEvent } from './is-mouse-event';


describe(`isMouseEvent`, function() {

  test(`should return true for mouse events`, function() {
    const fakeMouseEvent = createMouseEvent('click');
    expect(isMouseEvent(fakeMouseEvent)).toEqual(true);
  });


  test(`should return false for anything that is not a mouse event`, function() {
    const badValues = [
      null,
      void 0,
      1,
      0,
      'foo',
      {},
      '',
    ];

    for (const value of badValues) {
      expect(isMouseEvent(value as any)).toEqual(false);
    }
  });

});
