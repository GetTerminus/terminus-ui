import {
  TsDocumentServiceMock,
  TsWindowServiceMock,
} from '@terminus/ngx-tools/browser/testing';
import { ElementRefMock } from '@terminus/ngx-tools/testing';
import { noop } from '@terminus/ngx-tools/utilities';

import { TsCopyComponent } from './copy.component';

describe(`TsCopyComponent`, function() {
  let component: TsCopyComponent;

  beforeEach(() => {
    component = new TsCopyComponent(
      new TsDocumentServiceMock(),
      new TsWindowServiceMock(),
    );
    component.content = new ElementRefMock();
  });

  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });

  describe(`disableInitialSelection`, () => {
    test(`should set and retrieve`, () => {
      component.disableInitialSelection = true;
      expect(component.disableInitialSelection).toEqual(true);
    });
  });

  describe(`enableQuickCopy`, () => {
    test(`should set and retrieve`, () => {
      component.enableQuickCopy = true;
      expect(component.enableQuickCopy).toEqual(true);
    });
  });

  describe(`get textContent()`, () => {
    test(`should return the content if accessible`, () => {
      component.content.nativeElement.innerText = 'foo';
      expect(component.textContent).toEqual('foo');
    });

    test(`should return an empty string if the content is not accessible`, () => {
      component.content.nativeElement.innerText = null;
      expect(component.textContent).toEqual('');
    });
  });

  describe(`selectText()`, () => {
    test(`should return false if disabled`, () => {
      expect(component.selectText(component.content, false, true)).toEqual(false);
    });

    test(`should return if already selected`, () => {
      expect(component.selectText(component.content, true, false)).toEqual(false);
    });

    test(`should select the text within the passed in element`, () => {
      component['window'].getSelection = jest.fn().mockReturnValue({
        removeAllRanges: noop,
        addRange: noop,
      });

      component['document'].createRange = jest.fn().mockReturnValue({ selectNodeContents: noop });
      component.selectText(component.content.nativeElement, false, false);

      expect(component['window'].getSelection).toHaveBeenCalled();
      expect(component['document'].createRange).toHaveBeenCalled();
      expect(component.hasSelected).toEqual(true);
    });
  });

  describe(`resetSelection()`, () => {
    test(`should set the flag to false`, () => {
      component.hasSelected = true;

      expect(component.hasSelected).toEqual(true);

      component.resetSelection();
      expect(component.hasSelected).toEqual(false);
    });
  });

  describe(`copyToClipboard()`, () => {
    beforeEach(() => {
      // NOTE: I tried letting the mock return this value, but could not get the value returned for
      // some reason.
      const MOCK_TEXTAREA = {
        className: '',
        style: {},
        textContent: '',
        value: 'foo',
        focus: jest.fn(),
        remove: jest.fn(),
        setSelectionRange: jest.fn(),
      };
      // eslint-disable-next-line deprecation/deprecation
      component['document'].createElement = jest.fn().mockReturnValue(MOCK_TEXTAREA);
    });

    test(`should set the text to the clipboard`, () => {
      component['document'].body.appendChild = jest.fn();
      component['document'].execCommand = jest.fn();
      component.copyToClipboard('foo');

      // eslint-disable-next-line deprecation/deprecation
      expect(component['document'].createElement).toHaveBeenCalledWith('textarea');
      expect(component['document'].body.appendChild).toHaveBeenCalled();
      expect(component['document'].execCommand).toHaveBeenCalledWith('copy');
      expect(component['document'].execCommand).toHaveBeenCalledWith('copy');
    });

    test(`should fall back to a prompt if execCommand fails`, () => {
      component['document'].execCommand = () => {
        throw new Error('fake error');
      };
      component['window'].prompt = jest.fn();
      component.copyToClipboard('foo');

      expect(component['window'].prompt).toHaveBeenCalled();
    });
  });

  describe(`format`, () => {
    test(`should set a default format and allow custom`, () => {
      expect(component.format).toEqual('standard');
      component.format = 'minimal';
      expect(component.format).toEqual('minimal');
    });

    test(`should throw an error if consumer ues icon mode without quick copy enabled`, () => {
      component.enableQuickCopy = false;
      const actual = () => {
        component.format = 'icon';
      };
      expect(actual).toThrowError(Error);
    });
  });
});
