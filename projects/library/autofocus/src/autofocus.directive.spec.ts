import {
  ChangeDetectorRefMock,
  ElementRefMock,
} from '@terminus/ngx-tools/testing';

import { TsAutofocusDirective } from './autofocus.directive';

describe(`TsAutofocusDirective`, function() {
  let directive: TsAutofocusDirective;
  const validValues = [
    true,
    '',
    'my string',
    'true',
    0,
  ];
  const invalidValues = [
    false,
    null,
    undefined,
    'false',
  ];
  const setup = () => {
    directive = new TsAutofocusDirective(
      new ElementRefMock(),
      new ChangeDetectorRefMock(),
    );
    directive['elementRef'].nativeElement = { focus: jest.fn() };
    directive['changeDetectorRef'].detectChanges = jest.fn();
    directive.tsAutofocus = '';
  };
  const teardown = () => {
    directive = null as any;
  };

  beforeEach(() => {
    setup();
  });

  afterEach(() => {
    teardown();
  });

  test(`should autofocus with valid values`, () => {
    for (const value of validValues) {
      if (!directive) {
        setup();
      }
      directive.tsAutofocus = value as any;
      directive.ngAfterViewInit();

      expect(directive['elementRef'].nativeElement.focus).toHaveBeenCalled();
      expect(directive['changeDetectorRef'].detectChanges).toHaveBeenCalled();
      teardown();
    }
  });

  test(`should NOT autofocus with invalid values`, () => {
    for (const value of invalidValues) {
      if (!directive) {
        setup();
      }
      directive.tsAutofocus = value as any;
      directive.ngAfterViewInit();

      expect(directive['elementRef'].nativeElement.focus).not.toHaveBeenCalled();
      teardown();
    }
  });

  test(`should autofocus with string`, () => {
    directive.tsAutofocus = 'my string';
    directive.ngAfterViewInit();

    expect(directive['elementRef'].nativeElement.focus).toHaveBeenCalled();
  });

  test(`should throw an error if in dev mode and the element is not focusable`, () => {
    directive['elementRef'].nativeElement.focus = undefined;

    expect(() => {
      directive.ngAfterViewInit();
    }).toThrowError(`TsAutofocusDirective must be used on an element that has a .focus() method.`);
  });

  test(`should not autofocus with falsy value`, () => {
    directive.tsAutofocus = null as any;
    directive.ngAfterViewInit();

    expect(directive['elementRef'].nativeElement.focus).not.toHaveBeenCalled();
  });
});
