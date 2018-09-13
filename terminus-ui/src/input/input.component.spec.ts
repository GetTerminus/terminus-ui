// tslint:disable: no-non-null-assertion no-use-before-declare component-class-suffix
import {
  Component,
  ElementRef,
  Provider,
  Type,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  createKeyboardEvent,
  TsDocumentServiceMock,
  typeInElement,
} from '@terminus/ngx-tools/testing';
import { TsDocumentService } from '@terminus/ngx-tools';
import { A } from '@terminus/ngx-tools/keycodes';
import { By } from '@angular/platform-browser';
import { Subject, Observable } from 'rxjs';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TsInputModule } from './input.module';
import {
  TsInputAutocompleteTypes,
  TsInputComponent,
  TsInputTypes,
  TsMaskShortcutOptions,
} from './input.component';




describe(`TsInputComponent`, () => {

  test(`should exist`, () => {
    const fixture = createComponent(SimpleFormControl);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.c-input__text'))).toBeTruthy();
  });


  describe(`get shouldLabelFloat()`, () => {
    let fixture: ComponentFixture<SimpleFormControl>;

    beforeEach(() => {
      fixture = createComponent(SimpleFormControl);
      fixture.detectChanges();
    });


    test(`should float the label when focused`, () => {
      const inputElement = getInputElement(fixture);
      inputElement.focus();
      fixture.detectChanges();
      const wrapper = fixture.debugElement.query(By.css('.c-input')).nativeElement;

      expect(wrapper.classList).toContain('mat-form-field-should-float');
    });


    test(`should float the label when the input has value and is not focused`, () => {
      const inputElement = getInputElement(fixture);
      typeInElement('foo', inputElement);
      fixture.detectChanges();
      const wrapper = fixture.debugElement.query(By.css('.c-input')).nativeElement;

      expect(wrapper.classList).toContain('mat-form-field-should-float');
    });


  });


  describe(`get empty()`, () => {

    test(`should return false if no input element exists`, () => {
      const fixture = createComponent(SimpleFormControl);
      fixture.detectChanges();
      fixture.componentInstance.inputComponent['inputElement'] = undefined as any;

      expect(fixture.componentInstance.inputComponent.empty).toEqual(false);
    });

  });


  describe(`isRequired`, () => {

    test(`should do something`, () => {
      const fixture = createComponent(SimpleFormControl);
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComponent.isRequired).toEqual(false);

      fixture.componentInstance.inputComponent.isRequired = true;
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComponent.isRequired).toEqual(true);
    });

  });


  describe(`input attributes`, () => {

    /**
     * NOTE: Because Jest doesnt' have a true DOM, we can only check for attributes set with the format `[attr.foo]="true"`. Since
     * `required` is not set this way, there is no way to check for the actual attribute.
     *
     * Leaving the tests here in case we later can find a way around it.
     */

    /*
     *test(`should set required if the form control is required`, () => {
     *  const fixture = createComponent(AttrRequired);
     *  fixture.detectChanges();
     *  const inputElement = fixture.debugElement.query(By.css('.c-input__text')).nativeElement as HTMLInputElement;
     *  expect(getDomAttribute(inputElement, 'required')).toEqual('required');
     *});
     */


    /*
     *test(`should set required if the required flag is set`, () => {
     *  const fixture = createComponent(AttrRequired);
     *  fixture.componentInstance.required = true;
     *  fixture.detectChanges();
     *  const inputElement = fixture.debugElement.query(By.css('.c-input__text')).nativeElement as HTMLInputElement;
     *  expect(getDomAttribute(inputElement, 'required')).toEqual('required');
     *});
     */


    /**
     * Instead of checking attributes as we should, we will just check the setter/getter. (see above comment)
     */
    describe(`readOnly`, () => {

      test(`should toggle the class flag`, () => {
        const fixture = createComponent(AttrReadonly);
        fixture.detectChanges();

        expect(fixture.componentInstance.inputComponent.readOnly).toEqual(false);

        fixture.componentInstance.readOnly = true;
        fixture.detectChanges();

        expect(fixture.componentInstance.inputComponent.readOnly).toEqual(true);
      });

    });


    /**
     * Instead of checking attributes as we should, we will just check the setter/getter. (see above comment)
     */
    describe(`spellcheck`, () => {

      test(`should toggle the class flag`, () => {
        const fixture = createComponent(AttrSpellcheck);
        fixture.detectChanges();

        expect(fixture.componentInstance.inputComponent.spellcheck).toEqual(false);

        fixture.componentInstance.spellcheck = true;
        fixture.detectChanges();

        expect(fixture.componentInstance.inputComponent.spellcheck).toEqual(true);
      });

    });


    test(`should set autocapitalize if set`, () => {
      const fixture = createComponent(AttrAutocapitalize);
      fixture.detectChanges();
      let inputElement = fixture.debugElement.query(By.css('.c-input__text')).nativeElement as HTMLInputElement;
      expect(getDomAttribute(inputElement, 'autocapitalize')).toEqual('off');

      fixture.componentInstance.autocapitalize = true;
      fixture.detectChanges();

      inputElement = fixture.debugElement.query(By.css('.c-input__text')).nativeElement as HTMLInputElement;
      expect(getDomAttribute(inputElement, 'autocapitalize')).toEqual('on');
    });


    test(`should set autocomplete if set`, () => {
      const fixture = createComponent(AttrAutocomplete);
      fixture.detectChanges();
      let inputElement = getInputElement(fixture);
      expect(getDomAttribute(inputElement, 'autocomplete')).toEqual('on');

      fixture.componentInstance.autocomplete = 'name';
      fixture.detectChanges();

      inputElement = fixture.debugElement.query(By.css('.c-input__text')).nativeElement as HTMLInputElement;
      expect(getDomAttribute(inputElement, 'autocomplete')).toEqual('name');

      fixture.componentInstance.autocomplete = undefined as any;
      fixture.detectChanges();

      inputElement = getInputElement(fixture);
      expect(getDomAttribute(inputElement, 'autocomplete')).toEqual('on');
    });


    test(`should set id if set and fallback to default UID`, () => {
      const fixture = createComponent(AttrId);
      fixture.detectChanges();
      let inputElement = getInputElement(fixture);
      expect(getDomAttribute(inputElement, 'id')).toEqual(expect.stringContaining('ts-input-'));

      fixture.componentInstance.id = 'foo';
      fixture.detectChanges();

      inputElement = getInputElement(fixture);
      expect(getDomAttribute(inputElement, 'id')).toEqual('foo');
    });


    test(`should set the disabled flag when appropriate`, () => {
      const fixture = createComponent(AttrDisabled);
      fixture.detectChanges();
      let inputElement = getInputElement(fixture);
      expect(getDomAttribute(inputElement, 'attr')).toBeFalsy();

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      inputElement = getInputElement(fixture);
      expect(getDomAttribute(inputElement, 'disabled')).toEqual('');
    });


    test(`should set autofocus`, () => {
      const fixture = createComponent(AttrAutofocus);
      fixture.detectChanges();
      let inputElement = getInputElement(fixture);
      expect(getDomAttribute(inputElement, 'autofocus')).toBeFalsy();

      fixture.componentInstance.focused = true;
      fixture.detectChanges();


      inputElement = getInputElement(fixture);
      expect(getDomAttribute(inputElement, 'autofocus')).toEqual('');
    });

  });


  describe(`formControl`, () => {

    test(`should fall back to a default form control`, () => {
      const fixture = createComponent(MissingFormControl);
      fixture.detectChanges();
      expect(fixture.componentInstance.inputComponent.formControl instanceof FormControl).toBeTruthy();
    });

  });


  describe(`hideRequiredMarker`, () => {

    test(`should hide the required attr`, () => {
      const fixture = createComponent(AttrRequiredHidden);
      fixture.detectChanges();
      let marker = fixture.debugElement.query(By.css('.mat-form-field-required-marker'));
      expect(marker).toBeTruthy();

      fixture.componentInstance.hideRequiredMarker = true;
      fixture.detectChanges();

      marker = fixture.debugElement.query(By.css('.mat-form-field-required-marker'));
      expect(marker).toBeFalsy();
    });

  });


  describe(`hint`, () => {

    test(`should show/hide the container and output the text`, () => {
      const fixture = createComponent(Hint);
      fixture.detectChanges();
      let hint = fixture.debugElement.query(By.css('.mat-form-field-hint-wrapper'));
      expect(hint).toBeFalsy();

      fixture.componentInstance.hint = 'foo';
      fixture.detectChanges();

      hint = fixture.debugElement.query(By.css('.mat-form-field-hint-wrapper'));
      expect(hint).toBeTruthy();

      const contents = fixture.debugElement.query(By.css('.c-input__hint'));
      expect(contents.nativeElement.textContent).toEqual('foo');
    });

  });


  describe(`isClearable`, () => {

    test(`should show the clearable button when valid`, () => {
      const fixture = createComponent(Clearable);
      fixture.detectChanges();
      let container = fixture.debugElement.query(By.css('.mat-form-field-suffix'));
      expect(container).toBeFalsy();

      fixture.componentInstance.clearable = true;
      fixture.detectChanges();

      container = fixture.debugElement.query(By.css('.mat-form-field-suffix'));
      expect(container).toBeTruthy();

      const inputElement = getInputElement(fixture);
      sendInput('foo', inputElement, fixture);
      fixture.detectChanges();
      const clearButton = fixture.debugElement.query(By.css('.c-input__clear')).nativeElement;
      expect(clearButton).toBeTruthy();
    });

  });


  describe(`label`, () => {
    let fixture: ComponentFixture<Label>;

    beforeEach(() => {
      fixture = createComponent(Label);
      fixture.detectChanges();
      const bounding1 = { left: 50 };
      const bounding2 = { left: 100 };
      fixture.componentInstance.inputComponent['containerElement'].nativeElement.getBoundingClientRect =
        jest.fn(() => bounding1);
      fixture.componentInstance.inputComponent['labelElement'].nativeElement.children[0].getBoundingClientRect =
        jest.fn(() => bounding2);
    });


    test(`should set the label and update the outline gap`, () => {
      const outlineStart = fixture.debugElement.query(By.css('.mat-form-field-outline-start')).nativeElement;
      const outlineGap = fixture.debugElement.query(By.css('.mat-form-field-outline-gap')).nativeElement;

      expect(getDomAttribute(outlineStart, 'style')).toEqual('width: 45px;');
      expect(getDomAttribute(outlineGap, 'style')).toEqual('width: 10px;');

      fixture.componentInstance.label = 'foo';
      fixture.detectChanges();

      const label2: HTMLSpanElement = fixture.debugElement.query(By.css('.c-input__label-text')).nativeElement;
      expect(label2.innerHTML.trim()).toEqual('foo');
    });

  });


  describe(`mask`, () => {

    describe(`set mask()`, () => {

      test(`should set the correct mask`, () => {
        const fixture = createComponent(Mask);
        fixture.componentInstance.mask = 'percentage';
        fixture.detectChanges();
        const inputElement = getInputElement(fixture);
        typeInElement('1234', inputElement);

        expect(inputElement.value).toEqual('1,234%');
      });


      test(`should return undefined if no mask was passed in`, () => {
        const fixture = createComponent(Mask);
        fixture.detectChanges();

        expect(fixture.componentInstance.inputComponent.mask).toEqual(undefined);

        const inputElement = getInputElement(fixture);
        typeInElement('1234', inputElement);

        expect(inputElement.value).toEqual('1234');
      });


      test(`should log a warning if an unaccepted mask is passed in`, () => {
        const fixture = createComponent(Mask);
        fixture.detectChanges();
        window.console.warn = jest.fn();
        fixture.componentInstance.mask = 'foo' as any;
        fixture.detectChanges();

        expect(window.console.warn).toHaveBeenCalled();
        expect(fixture.componentInstance.inputComponent.mask).toEqual('default');
      });


      test(`should clear any existing value if switching to a date mask`, () => {
        const fixture = createComponent(Mask);
        fixture.detectChanges();
        fixture.componentInstance.mask = 'percentage';
        fixture.detectChanges();
        const inputElement = getInputElement(fixture);
        typeInElement('1234', inputElement);

        expect(inputElement.value).toEqual('1,234%');
        expect(fixture.componentInstance.formControl.value).toEqual('1234');

        fixture.componentInstance.mask = 'date';
        fixture.detectChanges();

        expect(inputElement.value).toEqual('');
        expect(fixture.componentInstance.formControl.value).toEqual('');
      });

    });


    describe(`maskSanitizeValue`, () => {

      test(`should disable the sanitation of the model value`, () => {
        const fixture = createComponent(MaskSanitize);
        fixture.detectChanges();
        fixture.componentInstance.mask = 'currency';
        fixture.componentInstance.maskSanitizeValue = false;
        fixture.detectChanges();
        const inputElement = getInputElement(fixture);
        typeInElement('$12.34', inputElement);

        expect(inputElement.value).toEqual('$12.34');
        expect(fixture.componentInstance.formControl.value).toEqual('$12.34');
      });


      test(`should enable the sanitation of the model value`, () => {
        const fixture = createComponent(MaskSanitize);
        fixture.detectChanges();
        fixture.componentInstance.mask = 'percentage';
        fixture.detectChanges();
        const inputElement = getInputElement(fixture);
        typeInElement('12.34%', inputElement);

        expect(inputElement.value).toEqual('12.34%');
        expect(fixture.componentInstance.formControl.value).toEqual('12.34');
      });

    });


    describe(`maskAllowDecimal`, () => {

      test(`should allow the use of decimals within a number-based mask`, () => {
        const fixture = createComponent(MaskDecimal);
        fixture.detectChanges();
        fixture.componentInstance.mask = 'percentage';
        fixture.detectChanges();
        const inputElement = getInputElement(fixture);
        typeInElement('12.34', inputElement);

        expect(inputElement.value).toEqual('12.34%');
        expect(fixture.componentInstance.formControl.value).toEqual('12.34');
      });


      test(`should disallow the use of decimals within a number-based mask`, () => {
        const fixture = createComponent(MaskDecimal);
        fixture.detectChanges();
        fixture.componentInstance.mask = 'percentage';
        fixture.componentInstance.maskAllowDecimal = false;
        fixture.detectChanges();
        const inputElement = getInputElement(fixture);
        typeInElement('12.34', inputElement);

        expect(inputElement.value).toEqual('1,234%');
        expect(fixture.componentInstance.formControl.value).toEqual('1234');
      });

    });


    describe(`maskDateFormat`, () => {

      test(`should format a masked date according to the default date mask`, () => {
        const fixture = createComponent(MaskDateFormat);
        fixture.detectChanges();

        const inputElement = getInputElement(fixture);
        typeInElement('11111111', inputElement);
        fixture.detectChanges();

        expect(inputElement.value).toEqual('11-11-1111');
        const controlValue = fixture.componentInstance.formControl.value;
        expect(controlValue).toEqual(expect.any(Date));
        expect(controlValue.toISOString()).toEqual(expect.stringContaining('1111-11-11'));
        expect.assertions(3);
      });

    });

  });


  describe(`set type()`, () => {

    test(`should log a warning if an unaccepted input type is passed in and default to 'text'`, () => {
      window.console.warn = jest.fn();

      const fixture = createComponent(InputType);
      fixture.detectChanges();
      fixture.componentInstance.type = 'email';
      fixture.detectChanges();
      const inputElement = getInputElement(fixture);

      expect(window.console.warn).toHaveBeenCalled();
      expect(getDomAttribute(inputElement, 'type')).toEqual('text');
    });


    test(`should update autocomplete for 'email' type if no mask exists and reset to default when switching away`, () => {
      const fixture = createComponent(InputType);
      fixture.detectChanges();
      fixture.componentInstance.mask = undefined;
      fixture.componentInstance.type = 'email';
      fixture.detectChanges();
      const inputElement = getInputElement(fixture);

      expect(getDomAttribute(inputElement, 'autocomplete')).toEqual('email');

      fixture.componentInstance.type = 'url';
      fixture.detectChanges();

      expect(getDomAttribute(inputElement, 'autocomplete')).toEqual('on');
    });

  });


  describe(`validateOnChange`, () => {

    test(`should set the validate on change flag`, () => {
      const fixture = createComponent(ValidateOnChange);
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComponent.validateOnChange).toEqual(false);

      fixture.componentInstance.validateOnChange = false;
      fixture.detectChanges();


      expect(fixture.componentInstance.inputComponent.validateOnChange).toEqual(false);
    });

  });


  describe(`AutofillMonitor`, () => {

    test(`should monitor the input for autofill and cleanup after ngOnDestroy`, () => {
      const fixture = createComponent(Autofill);
      fixture.detectChanges();
      fixture.componentInstance.inputComponent['autofillMonitor'].stopMonitoring = jest.fn();

      expect(fixture.componentInstance.inputComponent.autofilled).toEqual(false);
      fixture.componentInstance.inputComponent['autofillMonitor']['fireMockFillEvent']();

      expect(fixture.componentInstance.inputComponent.autofilled).toEqual(true);

      fixture.componentInstance.inputComponent.ngOnDestroy();
      expect(fixture.componentInstance.inputComponent['autofillMonitor'].stopMonitoring).toHaveBeenCalled();
    });

  });


  describe(`ngOnChanges`, () => {

    test(`should re-initialize the mask for valid changes`, () => {
      const fixture = createComponent(OnChanges);
      fixture.detectChanges();
      const inputComponent = fixture.componentInstance.inputComponent;
      inputComponent['setUpMask'] = jest.fn();
      inputComponent['updateMaskModelHack'] = jest.fn();
      inputComponent['setValue'] = jest.fn();
      inputComponent['textMaskInputElement'].update = jest.fn();

      fixture.componentInstance.mask = 'percentage';
      fixture.detectChanges();
      expect(inputComponent['setUpMask']).toHaveBeenCalledTimes(1);
      expect(inputComponent['updateMaskModelHack']).toHaveBeenCalledTimes(1);
      expect(inputComponent['setValue']).toHaveBeenCalledTimes(1);

      fixture.componentInstance.maskSanitizeValue = false;
      fixture.detectChanges();
      expect(inputComponent['setUpMask']).toHaveBeenCalledTimes(2);
      expect(inputComponent['updateMaskModelHack']).toHaveBeenCalledTimes(2);
      expect(inputComponent['setValue']).toHaveBeenCalledTimes(2);

      fixture.componentInstance.maskAllowDecimal = false;
      fixture.detectChanges();
      expect(inputComponent['setUpMask']).toHaveBeenCalledTimes(3);
      expect(inputComponent['updateMaskModelHack']).toHaveBeenCalledTimes(3);
      expect(inputComponent['setValue']).toHaveBeenCalledTimes(3);

      expect(inputComponent['textMaskInputElement'].update).toHaveBeenCalledWith('');
      expect.assertions(10);
    });


    test(`should update the label outline gap when the label changes`, () => {
      const fixture = createComponent(OnChanges);
      fixture.detectChanges();
      const inputComponent = fixture.componentInstance.inputComponent;
      inputComponent['updateOutlineGap'] = jest.fn();
      fixture.componentInstance.label = 'my new label';
      fixture.detectChanges();

      expect(inputComponent['updateOutlineGap']).toHaveBeenCalled();
    });

  });


  describe(`fixIOSCaretBug`, () => {

    test(`should set the selectionRange on keyup`, () => {
      const fixture = createComponent(OnChanges);
      fixture.detectChanges();
      const inputElement = getInputElement(fixture);
      const keyboardEvent: KeyboardEvent = createKeyboardEvent('keyup', A, inputElement);
      inputElement.setSelectionRange = jest.fn();
      fixture.componentInstance.inputComponent['platform'].IOS = true;
      fixture.componentInstance.inputComponent.ngAfterContentInit();
      inputElement.dispatchEvent(keyboardEvent);

      expect(inputElement.setSelectionRange).toHaveBeenCalledTimes(2);
    });

  });


  describe(`onBlur`, () => {

    test(`should call the onTouchedCallback`, () => {
      const fixture = createComponent(SimpleFormControl);
      fixture.detectChanges();
      fixture.componentInstance.inputComponent['onTouchedCallback'] = jest.fn();
      fixture.componentInstance.inputComponent.onBlur();

      expect(fixture.componentInstance.inputComponent['onTouchedCallback']).toHaveBeenCalled();
    });

  });


  describe(`reset()`, () => {

    test(`should reset the input`, () => {
      const fixture = createComponent(Clearable);
      fixture.componentInstance.clearable = true;
      fixture.detectChanges();
      fixture.componentInstance.inputComponent['changeDetectorRef'].markForCheck = jest.fn();

      const resetButton = fixture.debugElement.query(By.css('.c-input__clear')).nativeElement as HTMLButtonElement;
      const component = fixture.componentInstance.inputComponent;
      const inputElement = getInputElement(fixture);
      sendInput('11111111', inputElement, fixture);

      resetButton.click();

      expect(component.value).toEqual('');
      expect(fixture.componentInstance.cleared).toHaveBeenCalledWith(true);
      expect(fixture.componentInstance.formControl.untouched).toEqual(true);
      expect(component['changeDetectorRef'].markForCheck).toHaveBeenCalled();
      expect.assertions(4);
    });

  });


  describe(`focusChanged()`, () => {

    test(`should trigger the onTouchedCallback if the focus is false`, () => {
      const fixture = createComponent(SimpleFormControl);
      fixture.detectChanges();
      fixture.componentInstance.inputComponent['onTouchedCallback'] = jest.fn();
      const inputElement = getInputElement(fixture);
      inputElement.focus();
      inputElement.blur();

      expect(fixture.componentInstance.inputComponent['onTouchedCallback']).toHaveBeenCalledTimes(1);
    });

  });


  describe(`writeValue`, () => {

    test(`should normalize undefined values to an empty string`, () => {
      const fixture = createComponent(SimpleFormControl);
      fixture.detectChanges();
      const component = fixture.componentInstance.inputComponent;

      component.writeValue('foo');
      expect(component.value).toEqual('foo');

      component.writeValue(undefined as any);
      expect(component.value).toEqual('');

      component.writeValue('bar');
      expect(component.value).toEqual('bar');

      component.writeValue(null as any);
      expect(component.value).toEqual('');

      expect.assertions(4);
    });


    test(`should convert a date object to a string`, () => {
      const fixture = createComponent(SimpleFormControl);
      fixture.detectChanges();
      const component = fixture.componentInstance.inputComponent;
      component['renderer'].setProperty = jest.fn();
      const date = new Date(2018, 3, 3);
      const isoDate = date.toISOString();
      component.writeValue(date);
      fixture.detectChanges();

      expect(component.value.toISOString()).toEqual(isoDate);
      expect(component['renderer'].setProperty).toHaveBeenCalledWith(expect.any(ElementRef), 'value', isoDate);
    });

  });


  describe(`determinePostalMask`, () => {

    test(`should create the correct mask based on the value length`, () => {
      const fixture = createComponent(PostalMask);
      fixture.detectChanges();
      const inputElement = getInputElement(fixture);
      typeInElement('12345', inputElement);

      expect(inputElement.value).toEqual('12345');

      typeInElement('123456789', inputElement);

      expect(inputElement.value).toEqual('12345-6789');
    });

  });


  describe(`updateOutlineGap()`, () => {

    test(`should set the sizes to 0 if no label element is found`, () => {
      const fixture = createComponent(SimpleFormControl);
      fixture.detectChanges();
      const component = fixture.componentInstance.inputComponent;
      component.outlineGapStart = 8;
      component.outlineGapWidth = 9;
      component['labelElement'] = undefined as any;

      component['updateOutlineGap']();

      expect(component.outlineGapStart).toEqual(0);
      expect(component.outlineGapWidth).toEqual(0);
    });


    test(`should return undefined if the label element doesn't exist in the dom`, () => {
      const fixture = createComponent(SimpleFormControl);
      fixture.detectChanges();
      fixture.componentInstance.inputComponent['changeDetectorRef'].detectChanges = jest.fn();
      (fixture.componentInstance.inputComponent['documentService'] as any).shouldContain = false;

      expect(fixture.componentInstance.inputComponent['updateOutlineGap']()).toEqual(undefined);
      expect(fixture.componentInstance.inputComponent['changeDetectorRef'].detectChanges).not.toHaveBeenCalled();
    });

  });


  describe(`updateMaskModelHack()`, () => {

    test(`should dispatch a fake event to trigger the model update`, () => {
      jest.useFakeTimers();
      const fixture = createComponent(SimpleFormControl);
      fixture.detectChanges();
      const inputElement = getInputElement(fixture);
      inputElement.dispatchEvent = jest.fn();

      fixture.componentInstance.inputComponent['updateMaskModelHack']();
      jest.advanceTimersByTime(10);

      expect(inputElement.dispatchEvent).toHaveBeenCalledWith(expect.any(Event));
      jest.runAllTimers();
    });

  });


  describe(`trimLastCharacter`, () => {

    test(`should return the value if no mask is set`, () => {
      const fixture = createComponent(SimpleFormControl);
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComponent['trimLastCharacter']('foo')).toEqual('foo');
    });


    test(`should correctly trim a number mask`, () => {
      const fixture = createComponent(MaskDecimal);
      fixture.componentInstance.mask = 'number';
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComponent['trimLastCharacter']('12.345')).toEqual('12.34');
    });

  });


  describe(`cleanValue()`, () => {

    test(`should use a regex returned by function if needed`, () => {
      const fixture = createComponent(SimpleFormControl);
      fixture.detectChanges();
      const regexFunction = () => /[^0-9.]/g;

      expect(fixture.componentInstance.inputComponent['cleanValue']('12.34%', regexFunction)).toEqual('12.34');
    });


    test(`should return the original value if the passed function doesn't return a regex`, () => {
      const fixture = createComponent(SimpleFormControl);
      fixture.detectChanges();
      const regexFunction = () => undefined;

      expect(fixture.componentInstance.inputComponent['cleanValue']('12.34%', regexFunction)).toEqual('12.34%');
    });

  });


  describe(`startingView`, () => {

    test(`should allow the starting calendar view to be changed`, () => {
      const fixture = createComponent(StartingView);
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComponent.startingView).toEqual('month');

      fixture.componentInstance.startingView = 'year';
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComponent.startingView).toEqual('year');

      fixture.componentInstance.startingView = undefined;
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComponent.startingView).toEqual('month');

      expect.assertions(3);
    });

  });


  describe(`tabIndex`, () => {

    test(`should set the tabindex on the input`, () => {
      const fixture = createComponent(TabIndex);
      fixture.detectChanges();
      const input = fixture.componentInstance.inputComponent['inputElement'];

      expect(getDomAttribute(input.nativeElement, 'tabindex')).toEqual('4');
    });

  });


  describe(`openTo`, () => {

    test(`should allow a Date or undefined`, () => {
      const fixture = createComponent(OpenTo);
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComponent.openTo).toEqual(new Date(2018, 1, 1));

      fixture.componentInstance.openTo = undefined;
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComponent.openTo).toBeUndefined();
      expect.assertions(2);
    });

  });


  describe(`minDate`, () => {

    test(`should set a minimum date with a string date, Date object, or undefined`, () => {
      const fixture = createComponent(MinMaxDate);
      fixture.detectChanges();
      const comp = fixture.componentInstance.inputComponent;
      const date1 = new Date(2018, 1, 1);
      const date2 = new Date(2018, 1, 1);
      const date3 = '01-01-2017';
      const date4 = '01-01-2017';

      // Default
      expect(comp.minDate).toEqual(undefined);
      expect(comp.maxDate).toEqual(undefined);

      // Date object
      fixture.componentInstance.maxDate = date1;
      fixture.componentInstance.minDate = date2;
      fixture.detectChanges();

      expect(comp.maxDate).toEqual(date1);
      expect(comp.minDate).toEqual(date2);

      // Date string
      fixture.componentInstance.maxDate = date3;
      fixture.componentInstance.minDate = date4;
      fixture.detectChanges();

      expect(comp.minDate).toEqual(new Date(date3));
      expect(comp.maxDate).toEqual(new Date(date4));

      expect.assertions(6);
    });

  });


  describe(`dateFilter`, () => {

    test(`should set a filter for valid days of the week`, () => {
      const fixture = createComponent(DateFilter);
      const comp = fixture.componentInstance.inputComponent;
      const func = (d: Date) => d.getDay() === 6;
      fixture.detectChanges();

      expect(comp.dateFilter).toBeUndefined();

      fixture.componentInstance.dateFilter = func;
      fixture.detectChanges();

      expect(comp.dateFilter).toEqual(expect.any(Function));
      expect(comp.dateFilter(new Date(2018, 1, 1))).toEqual(false);

      expect.assertions(3);
    });

  });


  describe(`set value`, () => {

    test(`should emit the change if the date value has changed`, () => {
      const fixture = createComponent(DateFilter);
      const comp = fixture.componentInstance.inputComponent;
      comp['innerValue'] = new Date(2018, 1, 1);
      comp._valueChange.emit = jest.fn();
      fixture.detectChanges();

      comp.value = new Date(2018, 1, 2);
      fixture.detectChanges();

      expect(comp._valueChange.emit).toHaveBeenCalledWith(new Date(2018, 1, 2));
    });

  });


  describe(`onInput`, () => {

    test(`should emit the change if the date value has changed`, () => {
      const fixture = createComponent(DateFilter);
      const comp = fixture.componentInstance.inputComponent;
      comp._valueChange.emit = jest.fn();
      comp.selected.emit = jest.fn();
      fixture.detectChanges();
      const inputElement = getInputElement(fixture);
      typeInElement('01-01-2018', inputElement);

      expect(comp._valueChange.emit).toHaveBeenCalledWith(new Date('01-01-2018'));
      expect(comp.selected.emit).toHaveBeenCalledWith(new Date('01-01-2018'));
    });

  });

});




/**
 * HELPERS
 */

function getInputElement(fixture: ComponentFixture<any>): HTMLInputElement {
  return fixture.debugElement.query(By.css('.c-input__text')).nativeElement as HTMLInputElement;
}


function sendInput(text: string, el: HTMLInputElement, fixture: ComponentFixture<any>): Promise<any> {
  el.value = text;
  const event = document.createEvent('KeyboardEvent');
  event.initEvent('input', true, false);
  el.dispatchEvent(event);
  fixture.detectChanges();
  return fixture.whenStable();
}

function getDomAttribute(el: HTMLElement, attr: string): string | undefined {
  const item = (el.attributes as NamedNodeMap).getNamedItem(attr);
  return item ? item.value : undefined;
}

function createComponent<T>(component: Type<T>, providers: Provider[] = [], imports: any[] = []): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      TsInputModule,
      NoopAnimationsModule,
      ...imports,
    ],
    declarations: [component],
    providers: [
      {
        provide: TsDocumentService,
        useClass: MyDocumentService,
      },
      {
        provide: AutofillMonitor,
        useClass: AutofillMonitorMock,
      },
      ...providers,
    ],
  }).compileComponents();

  return TestBed.createComponent<T>(component);
}


/**
 * PROVIDERS
 */

class MyDocumentService extends TsDocumentServiceMock {
  shouldContain = true;
  document: any = {
    documentElement: {
      contains: jest.fn(() => this.shouldContain ? true : false),
    },
    createEvent() {
      return document.createEvent('Event');
    },
  };
}


interface AutofillEvent {
  target: Element;
  isAutofilled: boolean;
}
class AutofillMonitorMock {
  result = new Subject<AutofillEvent>();
  el!: Element;

  monitor(el: Element): Observable<any> {
    this.el = el;
    return this.result;
  }

  fireMockFillEvent() {
    this.result.next({target: this.el as Element, isAutofilled: true});
  }

  stopMonitoring(element: Element) {
    this.result.complete();
  }
}


/**
 * TEMPLATES
 */


@Component({
  template: `<ts-input [formControl]="control"></ts-input>`,
})
class SimpleFormControl {
  control: FormControl | undefined = new FormControl();

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `<ts-input></ts-input>`,
})
class MissingFormControl {
  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `<ts-input [autocapitalize]="autocapitalize"></ts-input>`,
})
class AttrAutocapitalize {
  autocapitalize: boolean = false;
}

@Component({
  template: `<ts-input [autocomplete]="autocomplete"></ts-input>`,
})
class AttrAutocomplete {
  autocomplete: TsInputAutocompleteTypes = 'on';
}

@Component({
  template: `<ts-input [isFocused]="focused"></ts-input>`,
})
class AttrAutofocus {
  focused: boolean = false;
}

@Component({
  template: `<ts-input [isDisabled]="disabled"></ts-input>`,
})
class AttrDisabled {
  disabled: boolean = false;
}

@Component({
  template: `<ts-input [id]="id"></ts-input>`,
})
class AttrId {
  id: string | undefined = undefined;
}

@Component({
  template: `<ts-input [readOnly]="readOnly"></ts-input>`,
})
class AttrReadonly {
  readOnly: boolean | undefined = undefined;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

/*
 *@Component({
 *  template: `<ts-input [formControl]="formControl" [isRequired]="required"></ts-input>`,
 *})
 *class AttrRequired {
 *  formControl: FormControl = new FormControl(null, Validators.required);
 *  required: boolean = false;
 *}
 */

@Component({
  template: `<ts-input [formControl]="formControl" [hideRequiredMarker]="hideRequiredMarker"></ts-input>`,
})
class AttrRequiredHidden {
  formControl: FormControl = new FormControl(null, Validators.required);
  hideRequiredMarker: boolean | undefined = false;
}

@Component({
  template: `<ts-input [spellcheck]="spellcheck"></ts-input>`,
})
class AttrSpellcheck {
  spellcheck: boolean | undefined = undefined;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `<ts-input [hint]="hint"></ts-input>`,
})
class Hint {
  hint: string | undefined = undefined;
}

@Component({
  template: `
    <ts-input
      [formControl]="formControl"
      [isClearable]="clearable"
      (cleared)="cleared($event)"
    ></ts-input>
  `,
})
class Clearable {
  clearable: boolean | undefined = undefined;
  cleared = jest.fn();
  formControl = new FormControl();

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `<ts-input [label]="label"></ts-input>`,
})
class Label {
  label: string | undefined = undefined;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [mask]="mask"
      [formControl]="formControl"
    ></ts-input>
  `,
})
class Mask {
  mask: TsMaskShortcutOptions | undefined = undefined;
  formControl = new FormControl();

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [mask]="mask"
      [formControl]="formControl"
      [maskSanitizeValue]="maskSanitizeValue"
    ></ts-input>
  `,
})
class MaskSanitize {
  mask: TsMaskShortcutOptions | undefined;
  formControl = new FormControl();
  maskSanitizeValue = true;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [mask]="mask"
      [formControl]="formControl"
      [maskAllowDecimal]="maskAllowDecimal"
    ></ts-input>
  `,
})
class MaskDecimal {
  mask: TsMaskShortcutOptions | undefined;
  formControl = new FormControl();
  maskAllowDecimal = true;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [mask]="mask"
      [formControl]="formControl"
    ></ts-input>
  `,
})
class MaskDateFormat {
  mask: TsMaskShortcutOptions = 'date';
  formControl = new FormControl();

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [mask]="mask"
      [formControl]="formControl"
      [type]="type"
    ></ts-input>
  `,
})
class InputType {
  mask: TsMaskShortcutOptions | undefined = 'number';
  formControl = new FormControl();
  type: TsInputTypes | undefined;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [validateOnChange]="validateOnChange"
      [formControl]="formControl"
    ></ts-input>
  `,
})
class ValidateOnChange {
  formControl = new FormControl();
  validateOnChange = false;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [formControl]="formControl"
    ></ts-input>
  `,
})
class Autofill {
  formControl = new FormControl();

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [formControl]="formControl"
      [mask]="mask"
      [maskSanitizeValue]="maskSanitizeValue"
      [maskAllowDecimal]="maskAllowDecimal"
      [label]="label"
    ></ts-input>
  `,
})
class OnChanges {
  formControl = new FormControl();
  mask: TsMaskShortcutOptions = 'number';
  maskSanitizeValue = true;
  maskAllowDecimal = true;
  label = 'my first label';

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [formControl]="formControl"
      [mask]="mask"
    ></ts-input>
  `,
})
class PostalMask {
  formControl = new FormControl();
  mask: TsMaskShortcutOptions = 'postal';

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [tabIndex]="index"
    ></ts-input>
  `,
})
class TabIndex {
  index = 4;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      datepicker="true"
      [startingView]="startingView"
    ></ts-input>
  `,
})
class StartingView {
  startingView = 'month';

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      datepicker="true"
      [openTo]="openTo"
    ></ts-input>
  `,
})
class OpenTo {
  openTo = new Date(2018, 1, 1);

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      datepicker="true"
      [minDate]="minDate"
      [maxDate]="maxDate"
    ></ts-input>
  `,
})
class MinMaxDate {
  minDate = undefined;
  maxDate = undefined;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      datepicker="true"
      [dateFilter]="dateFilter"
    ></ts-input>
  `,
})
class DateFilter {
  dateFilter = undefined;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}
