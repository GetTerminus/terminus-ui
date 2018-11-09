import {
  TsWindowServiceMock,
  TsDocumentServiceMock,
  ElementRefMock,
} from '@terminus/ngx-tools/testing';
import { noop } from '@terminus/ngx-tools';

import { TsCopyComponent } from './copy.component';


describe(`TsCopyComponent`, () => {
  let component: TsCopyComponent;

  beforeEach(() => {
    component = new TsCopyComponent(
      new TsDocumentServiceMock(),
      new TsWindowServiceMock(),
    );
    component.content = new ElementRefMock();
  });


  it(`should exist`, () => {
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

    it(`should return the content if accessible`, () => {
      component.content.nativeElement.innerText = 'foo';

      expect(component.textContent).toEqual('foo');
    });


    it(`should return an empty string if the content is not accessible`, () => {
      component.content.nativeElement.innerText = null;

      expect(component.textContent).toEqual('');
    });

  });


  describe(`selectText()`, () => {

    it(`should return false if disabled`, () => {
      expect(component.selectText(component.content, false, true)).toEqual(false);
    });


    it(`should return if already selected`, () => {
      expect(component.selectText(component.content, true, false)).toEqual(false);
    });


    it(`should select the text within the passed in element`, () => {
      component['window'].getSelection = jest.fn().mockReturnValue({
        removeAllRanges: noop,
        addRange: noop,
      });

      component['document'].createRange = jest.fn().mockReturnValue({selectNodeContents: noop});
      component.selectText(component.content.nativeElement, false, false);

      expect(component['window'].getSelection).toHaveBeenCalled();
      expect(component['document'].createRange).toHaveBeenCalled();
      expect(component.hasSelected).toEqual(true);
    });

  });


  describe(`resetSelection()`, () => {

    it(`should set the flag to false`, () => {
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
      component['document'].createElement = jest.fn().mockReturnValue(MOCK_TEXTAREA);
    });


    it(`should set the text to the clipboard`, () => {
      component['document'].body.appendChild = jest.fn();
      component['document'].execCommand = jest.fn();
      component.copyToClipboard('foo');

      expect(component['document'].createElement).toHaveBeenCalledWith('textarea');
      expect(component['document'].body.appendChild).toHaveBeenCalled();
      expect(component['document'].execCommand).toHaveBeenCalledWith('copy');
      expect(component['document'].execCommand).toHaveBeenCalledWith('copy');
    });


    it(`should fall back to a prompt if execCommand fails`, () => {
      component['document'].execCommand = () => {
        throw new Error('fake error');
      };
      component['window'].prompt = jest.fn();

      component.copyToClipboard('foo');

      expect(component['window'].prompt).toHaveBeenCalled();
    });

  });

});
