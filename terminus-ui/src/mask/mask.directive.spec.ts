import {
  ElementRefMock,
  Renderer2Mock,
} from '@terminus/ngx-tools/testing';

import { TsMaskDirective } from './mask.directive';




describe(`TsMaskDirective`, () => {
  let directive: TsMaskDirective;

  beforeEach(() => {
    directive = new TsMaskDirective(
      new Renderer2Mock(),
      new ElementRefMock(),
    );
  });


  describe(`tsMask`, () => {

    test(`should log a warning if passing in an unknown value`, () => {
      window.console.warn = jest.fn();
      directive.tsMask = 'foo' as any;

      expect(window.console.warn).toHaveBeenCalled();
    });


    test(`should not set a mask if no value was passed in`, () => {
      directive['setMaskDefinition'] = jest.fn();
      directive.tsMask = '' as any;

      expect(directive['setMaskDefinition']).not.toHaveBeenCalled();
    });

  });


  describe(`setMaskDefinition`, () => {

    test(`should set a default mask if a match wasn't found`, () => {
      directive['setMaskDefinition']('foo');
      expect(directive['currentMask'].mask).toEqual(false);
    });

  });

});
