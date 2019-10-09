// tslint:disable: no-non-null-assertion no-use-before-declare component-class-suffix
import { AutofillMonitor } from '@angular/cdk/text-field';
import {
  ElementRef,
  Type,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TsDocumentService } from '@terminus/ngx-tools/browser';
import { TsDocumentServiceMock } from '@terminus/ngx-tools/browser/testing';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import {
  createComponent as createComponentInner, createFakeEvent,
  createKeyboardEvent,
  typeInElement,
} from '@terminus/ngx-tools/testing';
import {
  TsFormFieldComponent,
  TsFormFieldModule,
} from '@terminus/ui/form-field';
import {
  Observable,
  Subject,
} from 'rxjs';

import * as TestComponents from '@terminus/ui/input/testing';
// eslint-disable-next-line no-duplicate-imports
import {
  getInputElement,
  getInputInstance,
  sendInput,
} from '@terminus/ui/input/testing';
import { TsInputModule } from './input.module';


describe(`TsInputComponent`, function() {

  test(`should exist`, () => {
    const fixture = createComponent(TestComponents.SimpleFormControl);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.c-input__text'))).toBeTruthy();
  });


  describe(`autocomplete`, () => {

    test(`should emit valueChange if the value was updated for a datepicker`, () => {
      const fixture = createComponent(TestComponents.Autocomplete);
      const component = getInputInstance(fixture);
      fixture.detectChanges();
      component._valueChange.emit = jest.fn();
      fixture.componentInstance.updateDate();
      fixture.detectChanges();

      expect(component._valueChange.emit).toHaveBeenCalledWith(fixture.componentInstance.secondDate);
    });

  });


  describe(`input attributes`, () => {

    describe(`required`, () => {

      test(`should not be required by default`, () => {
        const fixture = createComponent(TestComponents.AttrNotRequired);
        fixture.detectChanges();
        const component = getInputInstance(fixture);
        const el = component.inputElement.nativeElement;

        expect(el.getAttribute('required')).toEqual(null);
      });


      test(`should set required if the form control is required`, () => {
        const fixture = createComponent(TestComponents.FormControlAttrRequired);
        fixture.detectChanges();
        const component = getInputInstance(fixture);
        const el = component.inputElement.nativeElement;

        expect(el.getAttribute('required')).toEqual('');
      });


      test(`should set required if the required flag is set`, () => {
        const fixture = createComponent(TestComponents.AttrInputRequired);
        fixture.componentInstance.required = true;
        fixture.detectChanges();
        const component = getInputInstance(fixture);
        const el = component.inputElement.nativeElement;

        expect(el.getAttribute('required')).toEqual('');
      });

    });


    describe(`readOnly`, () => {

      test(`should add the correct attribute`, () => {
        const fixture = createComponent(TestComponents.AttrReadonly);
        fixture.detectChanges();
        const component = getInputInstance(fixture);
        const el = component.inputElement.nativeElement;

        expect(component.readOnly).toEqual(false);
        expect(el.getAttribute('readonly')).toEqual(null);

        fixture.componentInstance.readOnly = true;
        fixture.detectChanges();

        expect(el.getAttribute('readonly')).toEqual('');
        expect(component.readOnly).toEqual(true);

        expect.assertions(4);
      });

    });


    describe(`spellcheck`, () => {

      test(`should add the correct attribute`, () => {
        const fixture = createComponent(TestComponents.AttrSpellcheck);
        fixture.detectChanges();
        const component = getInputInstance(fixture);
        const el = getInputElement(fixture);

        expect(component.spellcheck).toEqual(false);
        expect(el.getAttribute('spellcheck')).toEqual('false');

        fixture.componentInstance.spellcheck = true;
        fixture.detectChanges();

        expect(component.spellcheck).toEqual(true);
        expect(el.getAttribute('spellcheck')).toEqual('true');
      });

    });


    test(`should set autocapitalize if set`, () => {
      const fixture = createComponent(TestComponents.AttrAutocapitalize);
      fixture.detectChanges();
      const el = getInputElement(fixture);

      expect(el.getAttribute('autocapitalize')).toEqual('off');

      fixture.componentInstance.autocapitalize = true;
      fixture.detectChanges();

      expect(el.getAttribute('autocapitalize')).toEqual('on');
    });


    test(`should set autocomplete if set`, () => {
      const fixture = createComponent(TestComponents.AttrAutocomplete);
      fixture.detectChanges();
      const el = getInputElement(fixture);

      expect(el.getAttribute('autocomplete')).toEqual('on');

      fixture.componentInstance.autocomplete = 'name';
      fixture.detectChanges();

      expect(el.getAttribute('autocomplete')).toEqual('name');

      fixture.componentInstance.autocomplete = undefined as any;
      fixture.detectChanges();

      expect(el.getAttribute('autocomplete')).toEqual('on');
      expect.assertions(3);
    });


    test(`should set id if set and fallback to default UID`, () => {
      const fixture = createComponent(TestComponents.AttrId);
      fixture.detectChanges();
      const el = getInputElement(fixture);
      expect(el.getAttribute('id')).toEqual(expect.stringContaining('ts-input-'));

      fixture.componentInstance.id = 'foo';
      fixture.detectChanges();

      expect(el.getAttribute('id')).toEqual('foo');
    });


    test(`should set the disabled flag when appropriate`, () => {
      const fixture = createComponent(TestComponents.AttrDisabled);
      fixture.detectChanges();
      const el = getInputElement(fixture);
      expect(el.getAttribute('disabled')).toEqual(null);

      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      expect(el.getAttribute('disabled')).toEqual('');
    });


    test(`should set autofocus`, () => {
      const fixture = createComponent(TestComponents.AttrAutofocus);
      fixture.detectChanges();
      const el = getInputElement(fixture);
      expect(el.getAttribute('autofocus')).toEqual(null);

      fixture.componentInstance.focused = true;
      fixture.detectChanges();

      expect(el.getAttribute('autofocus')).toEqual('');
    });


    describe(`tabIndex`, () => {

      test(`should set the tabindex on the input`, () => {
        const fixture = createComponent(TestComponents.TabIndex);
        fixture.detectChanges();
        const el = getInputElement(fixture);

        expect(el.getAttribute('tabindex')).toEqual('4');
      });

    });


    describe(`theme`, () => {

      test(`should default to primary`, () => {
        const fixture = createComponent(TestComponents.SimpleFormControl);
        const input = fixture.componentInstance;
        fixture.detectChanges();

        const inputContainer = fixture.debugElement.query(By.css('.c-input__text')).nativeElement as HTMLElement;
        inputContainer.click();
        fixture.detectChanges();

        expect(input.inputComponent.theme).toEqual('primary');
      });

      test(`should set input theme to accent`, () => {
        const fixture = createComponent(TestComponents.Theme);
        const input = fixture.componentInstance;
        input.theme = 'accent';
        fixture.detectChanges();

        const inputContainer = fixture.debugElement.query(By.css('.c-input__text')).nativeElement as HTMLElement;
        inputContainer.click();
        fixture.detectChanges();

        const formFieldEl = fixture.debugElement.query(By.css(' ts-form-field')).nativeElement as HTMLElement;

        expect(input.inputComponent.theme).toEqual('accent');
        expect(formFieldEl.classList).toContain('ts-form-field--accent');
      });

      test(`should set input theme to warn`, () => {
        const fixture = createComponent(TestComponents.Theme);
        const input = fixture.componentInstance;
        input.theme = 'warn';
        fixture.detectChanges();

        const inputContainer = fixture.debugElement.query(By.css('.c-input__text')).nativeElement as HTMLElement;
        inputContainer.click();
        fixture.detectChanges();

        const formFieldEl = fixture.debugElement.query(By.css(' ts-form-field')).nativeElement as HTMLElement;

        expect(input.inputComponent.theme).toEqual('warn');
        expect(formFieldEl.classList).toContain('ts-form-field--warn');
      });

    });

  });


  describe(`mask`, () => {

    describe(`set mask()`, () => {

      test(`should set the correct mask`, () => {
        const fixture = createComponent(TestComponents.Mask);
        fixture.componentInstance.mask = 'percentage';
        fixture.detectChanges();
        const inputElement = getInputElement(fixture);
        typeInElement('1234', inputElement);

        expect(inputElement.value).toEqual('1,234%');
      });


      test(`should return undefined if no mask was passed in`, () => {
        const fixture = createComponent(TestComponents.Mask);
        fixture.detectChanges();

        expect(fixture.componentInstance.inputComponent.mask).toEqual(undefined);

        const inputElement = getInputElement(fixture);
        typeInElement('1234', inputElement);

        expect(inputElement.value).toEqual('1234');
      });


      test(`should log a warning if an unaccepted mask is passed in`, () => {
        const fixture = createComponent(TestComponents.Mask);
        fixture.detectChanges();
        window.console.warn = jest.fn();
        fixture.componentInstance.mask = 'foo' as any;
        fixture.detectChanges();

        expect(window.console.warn).toHaveBeenCalledWith(expect.stringContaining('TsInputComponent: '));
        expect(fixture.componentInstance.inputComponent.mask).toEqual('default');
      });

    });


    describe(`maskSanitizeValue`, () => {

      test(`should disable the sanitation of the model value`, () => {
        const fixture = createComponent(TestComponents.MaskSanitize);
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
        const fixture = createComponent(TestComponents.MaskSanitize);
        fixture.detectChanges();
        fixture.componentInstance.mask = 'percentage';
        fixture.detectChanges();
        const inputElement = getInputElement(fixture);

        typeInElement('1%', inputElement);
        expect(inputElement.value).toEqual('1%');
        expect(fixture.componentInstance.formControl.value).toEqual('1');

        typeInElement('12%', inputElement);
        expect(inputElement.value).toEqual('12%');
        expect(fixture.componentInstance.formControl.value).toEqual('12');

        typeInElement('12.3%', inputElement);
        expect(inputElement.value).toEqual('12.3%');
        expect(fixture.componentInstance.formControl.value).toEqual('12.3');
      });

    });


    describe(`maskAllowDecimal`, () => {

      test(`should allow the use of decimals within a number-based mask`, () => {
        const fixture = createComponent(TestComponents.MaskDecimal);
        fixture.detectChanges();
        fixture.componentInstance.mask = 'percentage';
        fixture.detectChanges();
        const inputElement = getInputElement(fixture);
        typeInElement('12.34', inputElement);

        expect(inputElement.value).toEqual('12.34%');
        expect(fixture.componentInstance.formControl.value).toEqual('12.34');
      });


      test(`should disallow the use of decimals within a number-based mask`, () => {
        const fixture = createComponent(TestComponents.MaskDecimal);
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

      test(`should format a masked date according to the default date mask`, function() {
        jest.useFakeTimers();
        const fixture = createComponent(TestComponents.MaskDateFormat);
        fixture.detectChanges();

        const inputElement = getInputElement(fixture);
        typeInElement('11111111', inputElement);
        fixture.detectChanges();

        expect(inputElement.value).toEqual('11-11-1111');
        const controlValue = fixture.componentInstance.formControl.value;

        expect(controlValue).toEqual(expect.any(Date));
        expect(controlValue.toISOString()).toEqual(expect.stringContaining('1111-11-11'));
        expect.assertions(3);
        jest.runAllTimers();
      });

    });


    describe(`determinePostalMask`, () => {

      test(`should create the correct mask based on the value length`, () => {
        const fixture = createComponent(TestComponents.PostalMask);
        fixture.detectChanges();
        const inputElement = getInputElement(fixture);
        typeInElement('12345', inputElement);

        expect(inputElement.value).toEqual('12345');

        typeInElement('123456789', inputElement);

        expect(inputElement.value).toEqual('12345-6789');
      });

    });

  });


  describe(`formControl`, () => {

    test(`should fall back to a default form control`, () => {
      const fixture = createComponent(TestComponents.MissingFormControl);
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComponent.formControl instanceof FormControl).toBeTruthy();
    });

  });


  describe(`datepicker`, () => {

    describe(`startingView`, () => {

      test(`should allow the starting calendar view to be changed`, () => {
        const fixture = createComponent(TestComponents.StartingView);
        fixture.detectChanges();

        expect(fixture.componentInstance.inputComponent.startingView).toEqual('month');

        fixture.componentInstance.startingView = 'year';
        fixture.detectChanges();

        expect(fixture.componentInstance.inputComponent.startingView).toEqual('year');

        fixture.componentInstance.startingView = undefined as any;
        fixture.detectChanges();

        expect(fixture.componentInstance.inputComponent.startingView).toEqual('month');

        expect.assertions(3);
      });

    });


    describe(`openTo`, () => {

      test(`should allow a Date or undefined`, () => {
        const fixture = createComponent(TestComponents.OpenTo);
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
        const fixture = createComponent(TestComponents.MinMaxDate);
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
        const fixture = createComponent(TestComponents.DateFilter);
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

  });


  describe(`hideRequiredMarker`, () => {

    test(`should hide the required attr`, () => {
      const fixture = createComponent(TestComponents.AttrRequiredHidden);
      fixture.detectChanges();
      let marker = fixture.debugElement.query(By.css('.ts-form-field-required-marker'));
      expect(marker).toBeTruthy();

      fixture.componentInstance.hideRequiredMarker = true;
      fixture.detectChanges();

      marker = fixture.debugElement.query(By.css('.ts-form-field-required-marker'));
      expect(marker).toBeFalsy();
    });

  });


  describe(`set type()`, () => {

    test(`should log a warning if an unaccepted input type is passed in while using a mask and default to 'text'`, () => {
      window.console.warn = jest.fn();

      const fixture = createComponent(TestComponents.InputType);
      fixture.detectChanges();
      fixture.componentInstance.type = 'email';
      fixture.detectChanges();
      const inputElement = getInputElement(fixture);

      expect(window.console.warn).toHaveBeenCalled();
      expect(inputElement.getAttribute('type')).toEqual('text');
    });


    test(`should update autocomplete for 'email' type if no mask exists and reset to default when switching away`, () => {
      const fixture = createComponent(TestComponents.InputType);
      fixture.detectChanges();
      fixture.componentInstance.mask = undefined;
      fixture.componentInstance.type = 'email';
      fixture.detectChanges();
      const inputElement = getInputElement(fixture);

      expect(inputElement.getAttribute('autocomplete')).toEqual('email');

      fixture.componentInstance.type = 'url';
      fixture.detectChanges();

      expect(inputElement.getAttribute('autocomplete')).toEqual('on');
    });

  });


  describe(`isClearable`, () => {

    test(`should show the clearable button when valid`, () => {
      const fixture = createComponent(TestComponents.Clearable);
      fixture.componentInstance.cleared = jest.fn;

      fixture.detectChanges();
      let container = fixture.debugElement.query(By.css('.ts-form-field__suffix'));
      expect(container).toBeFalsy();

      fixture.componentInstance.clearable = true;
      fixture.detectChanges();

      container = fixture.debugElement.query(By.css('.ts-form-field__suffix'));
      expect(container).toBeTruthy();

      const inputElement = getInputElement(fixture);
      sendInput(fixture, 'foo');
      fixture.detectChanges();
      const clearButton = fixture.debugElement.query(By.css('.c-input__clear')).nativeElement;
      expect(clearButton).toBeTruthy();
    });

  });


  describe(`hasExternalFormField`, () => {

    test(`should not include form field HTML if set to true`, () => {
      const fixture = createComponent(TestComponents.NoExternalFormField);
      fixture.detectChanges();
      let container = fixture.debugElement.query(By.css('.ts-form-field__wrapper'));
      expect(container).toBeFalsy();

      fixture.componentInstance.hasFormField = false;
      fixture.detectChanges();

      container = fixture.debugElement.query(By.css('.ts-form-field__wrapper'));
      expect(container).toBeTruthy();
    });

  });


  describe(`hint`, () => {

    test(`should show/hide the container and output the text`, () => {
      const fixture = createComponent(TestComponents.Hint);
      fixture.detectChanges();
      let hintElement = fixture.debugElement.query(By.css('.ts-form-field__hint-wrapper'));
      expect(hintElement).toBeFalsy();

      fixture.componentInstance.hint = 'foo';
      fixture.detectChanges();

      hintElement = fixture.debugElement.query(By.css('.ts-form-field__hint-wrapper'));
      expect(hintElement).toBeTruthy();

      const contents = fixture.debugElement.query(By.css('.c-input__hint'));
      expect(contents.nativeElement.textContent).toEqual('foo');
    });

  });


  describe(`label`, () => {

    test(`should set the label and update the outline gap`, () => {
      jest.useFakeTimers();
      const fixture = createComponent(TestComponents.Label);
      fixture.detectChanges();
      jest.advanceTimersByTime(200);
      const outlineStartEl: HTMLDivElement = fixture.debugElement.query(By.css('.js-outline-start')).nativeElement;
      const outlineGapEl: HTMLDivElement = fixture.debugElement.query(By.css('.js-outline-gap')).nativeElement;
      const labelContent: HTMLSpanElement = fixture.debugElement.query(By.css('.c-input__label-text')).nativeElement;
      const bounding1 = { left: 50 };
      const bounding2 = { left: 100 };
      const formFieldInstance: TsFormFieldComponent = fixture.debugElement.query(By.css('.ts-form-field')).componentInstance;
      formFieldInstance.containerElement.nativeElement.getBoundingClientRect = jest.fn(() => bounding1);
      formFieldInstance.labelElement.nativeElement.children[0].getBoundingClientRect = jest.fn(() => bounding2);
      Object.defineProperty(formFieldInstance.labelElement.nativeElement.children[0], 'offsetWidth', {
        get() {
          return 40;
        },
      });

      formFieldInstance.updateOutlineGap();
      fixture.detectChanges();

      expect(outlineStartEl.getAttribute('style')).toEqual('width: 45px;');
      expect(outlineGapEl.getAttribute('style')).toEqual('width: 40px;');

      expect(labelContent.innerHTML.trim()).toEqual('test label');
      jest.runAllTimers();
    });

  });


  describe(`initialization`, () => {

    describe(`AutofillMonitor`, () => {

      test(`should monitor the input for autofill and cleanup after ngOnDestroy`, fakeAsync(() => {
        const fixture = createComponent<TestComponents.Autofill>(TestComponents.Autofill);
        fixture.detectChanges();
        const instance = getInputInstance(fixture);
        instance.autofillMonitor.stopMonitoring = jest.fn();

        expect(instance.autofilled).toEqual(false);
        instance.autofillMonitor.fireMockFillEvent();
        fixture.detectChanges();
        tick(1000);
        fixture.detectChanges();

        expect(instance.autofilled).toEqual(true);

        instance.ngOnDestroy();
        expect(instance.autofillMonitor.stopMonitoring).toHaveBeenCalled();
      }));

    });


    describe(`fixIOSCaretBug`, () => {

      test(`should set the selectionRange on keyup`, () => {
        const fixture = createComponent(TestComponents.OnChanges);
        fixture.detectChanges();
        const inputElement = getInputElement(fixture);
        const keyboardEvent: KeyboardEvent = createKeyboardEvent('keyup', KEYS.A, inputElement);
        inputElement.setSelectionRange = jest.fn();
        fixture.componentInstance.inputComponent.platform.IOS = true;
        fixture.componentInstance.inputComponent.ngAfterContentInit();
        inputElement.dispatchEvent(keyboardEvent);

        expect(inputElement.setSelectionRange).toHaveBeenCalledTimes(2);
      });

    });


    describe(`ngOnChanges`, () => {

      test(`should re-initialize the mask for valid changes`, () => {
        const fixture = createComponent(TestComponents.OnChanges);
        fixture.detectChanges();
        const inputComponent = fixture.componentInstance.inputComponent;
        inputComponent.setUpMask = jest.fn();
        inputComponent.updateMaskModelHack = jest.fn();
        inputComponent.setValue = jest.fn();
        inputComponent.textMaskInputElement.update = jest.fn();

        fixture.componentInstance.mask = 'percentage';
        fixture.detectChanges();
        expect(inputComponent.setUpMask).toHaveBeenCalledTimes(2);
        expect(inputComponent.updateMaskModelHack).toHaveBeenCalledTimes(1);

        fixture.componentInstance.maskSanitizeValue = false;
        fixture.detectChanges();
        expect(inputComponent.setUpMask).toHaveBeenCalledTimes(3);
        expect(inputComponent.updateMaskModelHack).toHaveBeenCalledTimes(2);
        expect(inputComponent.setValue).toHaveBeenCalledTimes(1);

        fixture.componentInstance.maskAllowDecimal = false;
        fixture.detectChanges();
        expect(inputComponent.setUpMask).toHaveBeenCalledTimes(4);
        expect(inputComponent.updateMaskModelHack).toHaveBeenCalledTimes(3);

        expect(inputComponent.textMaskInputElement.update).toHaveBeenCalledWith('');
        expect.assertions(8);
      });


      test(`should update the label outline gap when the label changes`, () => {
        const fixture = createComponent(TestComponents.OnChanges);
        fixture.detectChanges();
        const formFieldInstance: TsFormFieldComponent = fixture.debugElement.query(By.css('.ts-form-field')).componentInstance;
        formFieldInstance.updateOutlineGap = jest.fn();
        fixture.componentInstance.label = 'my new label';
        fixture.detectChanges();

        expect(formFieldInstance.updateOutlineGap).toHaveBeenCalled();
      });

    });

  });


  describe(`container click`, () => {

    test(`should focus the input`, () => {
      const fixture = createComponent(TestComponents.SimpleFormControl);
      fixture.detectChanges();
      const input = getInputElement(fixture);

      expect(document.activeElement).not.toBe(input);

      const container = fixture.debugElement.query(By.css('.ts-form-field__container'));
      container.nativeElement.click();
      fixture.detectChanges();

      expect(document.activeElement).toBe(input);
    });

  });


  describe(`onBlur`, () => {

    test(`should trigger the onTouched callback and emit an event`, () => {
      const fixture = createComponent(TestComponents.OnChanges);
      fixture.detectChanges();
      const component = fixture.componentInstance.inputComponent;
      component.onTouchedCallback = jest.fn();
      component.inputBlur.emit = jest.fn();

      component.onBlur();

      expect(component.onTouchedCallback).toHaveBeenCalled();
      expect(component.inputBlur.emit).toHaveBeenCalledWith('foo');
    });

  });


  describe(`onDateChanged`, () => {
    test(`should trigger selected.emit with the date passed in`, () => {
      const date = new Date();
      const fixture = createComponent(TestComponents.DateFilter);
      const component = fixture.componentInstance.inputComponent;
      (component as any).textualDateValue = '01-02-2019';
      component.selected.emit = jest.fn();
      component.onDateChanged(date);
      expect(component.selected.emit).toHaveBeenCalledWith(date);
    });

    test(`should trigger selected.emit with the text value date`, () => {
      const date = new Date('01-02-2019');
      const fixture = createComponent(TestComponents.DateFilter);
      const component = fixture.componentInstance.inputComponent;
      (component as any).textualDateValue = '01-02-2019';
      component.selected.emit = jest.fn();
      component.onDateChanged(undefined as any);
      expect(component.selected.emit).toHaveBeenCalledWith(date);
    });
  });


  describe(`reset()`, () => {

    test(`should reset the input`, () => {
      const fixture = createComponent(TestComponents.Clearable);
      fixture.componentInstance.clearable = true;
      fixture.componentInstance.cleared = jest.fn();
      fixture.detectChanges();
      fixture.componentInstance.inputComponent.changeDetectorRef.markForCheck = jest.fn();

      const resetButton = fixture.debugElement.query(By.css('.c-input__clear')).nativeElement as HTMLButtonElement;
      const component = fixture.componentInstance.inputComponent;
      const inputElement = getInputElement(fixture);
      sendInput(fixture, '11111111');

      resetButton.click();

      expect(component.value).toEqual('');
      expect(fixture.componentInstance.cleared).toHaveBeenCalledWith(true);
      expect(fixture.componentInstance.formControl.untouched).toEqual(true);
      expect(component.changeDetectorRef.markForCheck).toHaveBeenCalled();
      expect.assertions(4);
    });

  });


  describe(`writeValue`, () => {

    test(`should convert a date object to a string`, () => {
      const fixture = createComponent(TestComponents.SimpleFormControl);
      fixture.detectChanges();
      const component = fixture.componentInstance.inputComponent;
      component.renderer.setProperty = jest.fn();
      const date = new Date(2018, 3, 3);
      const isoDate = date.toISOString();
      component.writeValue(date);
      fixture.detectChanges();

      expect(component.value.toISOString()).toEqual(isoDate);
      expect(component.renderer.setProperty).toHaveBeenCalledWith(expect.any(ElementRef), 'value', isoDate);
    });

  });


  describe(`onInput`, () => {

    test(`should emit the change if the date value has changed`, () => {
      const fixture = createComponent(TestComponents.DateFilter);
      const component = fixture.componentInstance.inputComponent;
      component._valueChange.emit = jest.fn();
      component.selected.emit = jest.fn();
      fixture.detectChanges();
      const inputElement = getInputElement(fixture);
      typeInElement('01-01-2018', inputElement);

      expect(component._valueChange.emit).toHaveBeenCalledWith(new Date('01-01-2018'));
    });

    test('should return if target is not set', () => {
      const fixture = createComponent(TestComponents.DateFilter);
      const component = fixture.componentInstance.inputComponent;
      component._valueChange.emit = jest.fn();
      component.selected.emit = jest.fn();
      component.onInput(null as any);

      expect(component._valueChange.emit).not.toHaveBeenCalled();
      expect(component.selected.emit).not.toHaveBeenCalled();
    });

    describe(`updateInnerValue`, () => {
      test(`should not call detectChange if component is destroyed when no toggling input`, () => {
        const fixture = createComponent(TestComponents.SimpleFormControl);
        const comp = fixture.componentInstance.inputComponent;
        comp.changeDetectorRef.detectChanges = jest.fn();
        fixture.detectChanges();
        fixture.destroy();
        comp.updateInnerValue('abc');
        setTimeout(() => expect(comp.changeDetectorRef.detectChanges).not.toHaveBeenCalled());
      });

      test(`should not call detectChange if component is destroyed with toggling`, () => {
        const fixture = createComponent(TestComponents.ToggleInputComponent);
        fixture.detectChanges();
        const comp = fixture.componentInstance.inputComponent;
        fixture.detectChanges();
        comp.changeDetectorRef.detectChanges = jest.fn();
        fixture.detectChanges();
        fixture.componentInstance.show = false;
        fixture.detectChanges();
        fixture.destroy();
        expect(comp.changeDetectorRef.detectChanges).not.toHaveBeenCalled();
      });

    });

  });


  describe(`cleanValue()`, () => {

    test(`should use a regex returned by function if needed`, () => {
      const fixture = createComponent(TestComponents.SimpleFormControl);
      fixture.detectChanges();
      const regexFunction = () => /[^0-9.]/g;

      expect(fixture.componentInstance.inputComponent.cleanValue('12.34%', regexFunction)).toEqual('12.34');
    });


    test(`should return the original value if the passed function doesn't return a regex`, () => {
      const fixture = createComponent(TestComponents.SimpleFormControl);
      fixture.detectChanges();
      const regexFunction = () => undefined;

      expect(fixture.componentInstance.inputComponent.cleanValue('12.34%', regexFunction)).toEqual('12.34%');
    });

  });


  describe(`trimLastCharacter`, () => {

    test(`should return the value if no mask is set`, () => {
      const fixture = createComponent(TestComponents.SimpleFormControl);
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComponent.trimLastCharacter('foo')).toEqual('foo');
    });


    test(`should correctly trim a number mask`, () => {
      const fixture = createComponent(TestComponents.MaskDecimal);
      fixture.componentInstance.mask = 'number';
      fixture.detectChanges();

      expect(fixture.componentInstance.inputComponent.trimLastCharacter('12.345')).toEqual('12.34');
    });

  });


  describe(`textarea`, () => {

    test(`should enable a textarea instead of a standard input`, () => {
      const fixture = createComponent(TestComponents.Textarea);
      fixture.detectChanges();
      const element = getInputElement(fixture);

      expect(element.tagName).toEqual('TEXTAREA');
    });


    test(`should allow a dynamic number of rows`, () => {
      const fixture = createComponent(TestComponents.Textarea);
      fixture.detectChanges();
      const element = getInputElement(fixture);

      expect(element.getAttribute('rows')).toEqual('4');

      fixture.componentInstance.rows = 7;
      fixture.detectChanges();
      expect(element.getAttribute('rows')).toEqual('7');
    });

  });

  describe(`inputPaste`, () => {
    test(`should emit a ClipboardEvent when the input receives a paste event`, () => {
      const pasteEvent = createFakeEvent('paste') as ClipboardEvent;
      (pasteEvent.clipboardData as any) = { getData: jest.fn().mockReturnValue('asdf') };
      const fixture = createComponent(TestComponents.SimpleFormControl);
      const component = fixture.componentInstance.inputComponent;
      jest.spyOn(component.inputPaste, 'emit');

      fixture.detectChanges();

      const inputContainer = fixture.debugElement.query(By.css('.c-input__text')).nativeElement as HTMLElement;
      inputContainer.dispatchEvent(pasteEvent);
      fixture.detectChanges();

      expect(component.inputPaste.emit).toHaveBeenCalledWith(pasteEvent);
    });
  });

});




/**
 * HELPERS
 */


function createComponent<T>(component: Type<T>): ComponentFixture<T> {

  return createComponentInner<T>(
    component,
    [
      {
        provide: TsDocumentService,
        useClass: MyDocumentService,
      },
      {
        provide: AutofillMonitor,
        useClass: AutofillMonitorMock,
      },
    ],
    [
      FormsModule,
      ReactiveFormsModule,
      TsFormFieldModule,
      TsInputModule,
      NoopAnimationsModule,
    ],
  );
}


/**
 * PROVIDERS
 */

class MyDocumentService extends TsDocumentServiceMock {
  public shouldContain = true;
  public document: any = {
    documentElement: { contains: jest.fn(() => !!this.shouldContain) },
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
  public result = new Subject<AutofillEvent>();
  public el!: Element;

  public monitor(el: Element): Observable<any> {
    this.el = el;
    return this.result;
  }

  public fireMockFillEvent() {
    this.result.next({
      target: this.el,
      isAutofilled: true,
    });
  }

  public stopMonitoring(element: Element) {
    this.result.complete();
  }
}
