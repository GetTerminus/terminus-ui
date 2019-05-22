import { KEYS } from '@terminus/ngx-tools/keycodes';
import {
  createKeyboardEvent,
  createMouseEvent,
} from '@terminus/ngx-tools/testing';

import { isKeyboardEvent } from './is-keyboard-event';


describe(`isKeyboardEvent`, function() {

  test(`should return true for a keyboard event`, function() {
    const event = createKeyboardEvent('keyup', KEYS.ENTER);
    expect(isKeyboardEvent(event)).toEqual(true);
  });


  test(`should return false when not a keyboard event`, function() {
    const event = createMouseEvent('mouseup');
    expect(isKeyboardEvent(event)).toEqual(false);
  });

});
