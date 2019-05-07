import {
  Type,
} from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import {
  createFakeEvent,
  createKeyboardEvent,
  dispatchEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  typeInElement,
} from '@terminus/ngx-tools/testing';
import { createComponent as createComponentInner } from '@terminus/ngx-tools/testing';
import { getValidationMessageElement } from '@terminus/ui/validation-messages/testing';
import * as testComponents from '../testing/src/public-api';
import {
  getAllChipInstances,
  getAutocompleteElement,
  getAutocompleteInput,
  getAutocompleteInstance,
  getAutocompleteTriggerElement,
  getChipElement,
  getChipElementDisplayValue,
  getOptgroupElement,
  getOptionElement,
  getOptionInstance,
} from '../testing/src/public-api';
import { TsAutocompleteFormatFn, TsAutocompleteModule } from './autocomplete.module';


function createComponent<T>(component: Type<T>): ComponentFixture<T> {
  const moduleImports = [
    FormsModule,
    ReactiveFormsModule,
    TsAutocompleteModule,
    NoopAnimationsModule,
  ];

  return createComponentInner(component, undefined, moduleImports);
}


describe(`TsAutocompleteComponent`, function() {

  test(`should exist`, function() {
    const fixture = createComponent(testComponents.Autocomplete);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.ts-autocomplete'))).toBeTruthy();
  });


  /**
   * AUTOCOMPLETE
   */
  describe(`autocomplete`, function() {

    test(`should show a progress indicator`, () => {
      jest.useFakeTimers();
      const fixture = createComponent<testComponents.Autocomplete>(testComponents.Autocomplete);
      fixture.detectChanges();

      let spinner = fixture.debugElement.query(By.css('.c-autocomplete__spinner'));
      expect(spinner).toBeFalsy();

      fixture.componentInstance.showProgress = true;
      fixture.detectChanges();

      spinner = fixture.debugElement.query(By.css('.c-autocomplete__spinner'));
      expect(spinner).toBeTruthy();

      expect.assertions(2);
    });


    test(`should not open when disabled`, () => {
      const fixture = createComponent<testComponents.Autocomplete>(testComponents.Autocomplete);
      fixture.componentInstance.disabled = true;
      fixture.detectChanges();
      const trigger = getAutocompleteTriggerElement(fixture);
      const instance = getAutocompleteInstance(fixture);

      expect(instance.panelOpen).toEqual(false);

      dispatchKeyboardEvent(trigger, 'keydown', KEYS.DOWN_ARROW);

      expect(instance.panelOpen).toEqual(false);
    });


    describe(`chips`, function() {

      test(`should show selections as chips`, () => {
        const fixture = createComponent(testComponents.SeededAutocomplete);
        fixture.detectChanges();

        const chip = getChipElement(fixture);

        expect(chip).toBeTruthy();
      });


      test(`should allow chips to be removed`, () => {
        jest.useFakeTimers();
        const fixture = createComponent(testComponents.SeededAutocomplete);
        fixture.detectChanges();

        let chips = getAllChipInstances(fixture);
        expect(chips.length).toEqual(1);

        const chip = getChipElement(fixture);
        const chipRemovalButton = chip.querySelector('.mat-chip-remove');
        const instance = getAutocompleteInstance(fixture);

        // Open the panel so that overlayRef is created
        instance.autocompleteTrigger.handleFocus();
        instance.autocompleteTrigger.overlayRef.updatePosition = jest.fn();

        dispatchMouseEvent(chipRemovalButton, 'click');
        fixture.detectChanges();

        chips = getAllChipInstances(fixture);
        expect(chips.length).toEqual(0);

        const input = getAutocompleteInput(fixture);
        expect(document.activeElement).toEqual(input);
        jest.advanceTimersByTime(200);

        expect(instance.autocompleteTrigger.overlayRef.updatePosition).toHaveBeenCalled();
        jest.runAllTimers();
      });


      test(`should allow removal with the backspace key`, () => {
        jest.useFakeTimers();
        const fixture = createComponent(testComponents.SeededAutocomplete);
        fixture.detectChanges();

        let chips = getAllChipInstances(fixture);
        expect(chips.length).toEqual(1);

        const chip = getChipElement(fixture);
        // The first backspace selects the previous chip
        dispatchKeyboardEvent(chip, 'keydown', KEYS.BACKSPACE);
        jest.advanceTimersByTime(250);
        dispatchKeyboardEvent(chip, 'keydown', KEYS.BACKSPACE);
        fixture.detectChanges();

        chips = getAllChipInstances(fixture);
        expect(chips.length).toEqual(0);
      });


      test(`should show UI element based on format function passed in`, () => {
        const fixture = createComponent(testComponents.SeededAutocompleteWithFormatFn);
        fixture.detectChanges();
        const displayValue = getChipElementDisplayValue(fixture);

        expect(displayValue).toEqual('Florida');
      });


      test(`should set/get the chipFormatUIFn`, () => {
        const myFn: TsAutocompleteFormatFn = (v: any) => v.name;
        const fixture = createComponent(testComponents.SeededAutocompleteWithFormatFn);
        fixture.detectChanges();
        const component = getAutocompleteInstance(fixture);
        fixture.detectChanges();

        component.chipFormatUIFn = myFn;
        expect(component.chipFormatUIFn).toEqual(myFn);
      });


      test(`should return undefined if no value is passed in chipFormatUIFn`, () => {
        // tslint:disable: prefer-const
        let foo: any;
        const fixture = createComponent(testComponents.SeededAutocompleteWithFormatFn);
        fixture.detectChanges();
        const component = getAutocompleteInstance(fixture);
        fixture.detectChanges();
        // tslint:enable: prefer-const
        expect(component.chipFormatUIFn = foo).toEqual(undefined);
      });


      test(`should throw an error in dev mode when passed a value to chipFormatUIFn that is not a function`, () => {
        const fixture = createComponent(testComponents.SeededAutocompleteWithFormatFn);
        fixture.detectChanges();
        const component = getAutocompleteInstance(fixture);
        fixture.detectChanges();
        expect(() => { component.chipFormatUIFn = 3 as any; })
          .toThrowError(`TsSelectComponent: 'chipFormatUIFn' must be passed a 'TsSelectFormatFn'.`);
      });

    });


    describe(`debounce`, function() {

      test(`should debounce the stream`, () => {
        jest.useFakeTimers();
        const fixture = createComponent<testComponents.Debounce>(testComponents.Debounce);
        fixture.componentInstance.change = jest.fn();
        fixture.detectChanges();
        const instance = getAutocompleteInstance(fixture);

        instance.querySubject.next('ab');
        jest.advanceTimersByTime(1);
        instance.querySubject.next('abc');
        jest.advanceTimersByTime(1);
        instance.querySubject.next('abcd');
        jest.runAllTimers();

        expect(fixture.componentInstance.change).toHaveBeenCalledTimes(1);
      });


      test(`should allow a custom debounce delay`, () => {
        jest.useFakeTimers();
        const fixture = createComponent<testComponents.CustomDebounce>(testComponents.CustomDebounce);
        fixture.componentInstance.change = jest.fn();
        fixture.detectChanges();
        const instance = getAutocompleteInstance(fixture);

        instance.querySubject.next('ab');
        jest.advanceTimersByTime(1);
        instance.querySubject.next('abc');
        jest.advanceTimersByTime(1);
        instance.querySubject.next('abcd');
        jest.runAllTimers();

        expect(fixture.componentInstance.change).toHaveBeenCalledTimes(3);
      });

    });


    describe(`minimumCharacters`, function() {

      test(`should only emit query once past the minimum character count`, () => {
        jest.useFakeTimers();
        const fixture = createComponent<testComponents.CustomCharacterCount>(testComponents.CustomCharacterCount);
        fixture.componentInstance.change = jest.fn();
        fixture.detectChanges();
        const instance = getAutocompleteInstance(fixture);

        instance.querySubject.next('');
        jest.advanceTimersByTime(1);
        instance.querySubject.next('a');
        jest.advanceTimersByTime(1);
        instance.querySubject.next('ab');
        jest.advanceTimersByTime(1);
        instance.querySubject.next('abc');
        jest.runAllTimers();

        expect(fixture.componentInstance.change).toHaveBeenCalledTimes(3);
      });


      test(`should allow a custom minimum character count`, () => {
        jest.useFakeTimers();
        const fixture = createComponent<testComponents.CustomCharacterCount>(testComponents.CustomCharacterCount);
        fixture.componentInstance.customCount = 1;
        fixture.componentInstance.change = jest.fn();
        fixture.detectChanges();
        const instance = getAutocompleteInstance(fixture);

        instance.querySubject.next('');
        jest.advanceTimersByTime(1);
        instance.querySubject.next('a');
        jest.advanceTimersByTime(1);
        instance.querySubject.next('ab');
        jest.advanceTimersByTime(1);
        instance.querySubject.next('abc');
        jest.runAllTimers();

        expect(fixture.componentInstance.change).toHaveBeenCalledTimes(4);
      });

    });


    test(`should only allow unique queries`, function() {
      jest.useFakeTimers();
      const fixture = createComponent<testComponents.Debounce>(testComponents.Debounce);
      fixture.componentInstance.change = jest.fn();
      fixture.detectChanges();
      const instance = getAutocompleteInstance(fixture);

      instance.querySubject.next('ab');
      jest.advanceTimersByTime(1);
      instance.querySubject.next('ab');
      jest.advanceTimersByTime(1);
      instance.querySubject.next('ab');
      jest.runAllTimers();

      expect(fixture.componentInstance.change).toHaveBeenCalledTimes(1);
    });


    describe(`duplicate selections`, function() {

      // NOTE: Even though we are simulating a typed query, the list of states is not actually changing.
      test(`should not be allowed by default but should emit an event`, function() {
        jest.useFakeTimers();
        const fixture = createComponent<testComponents.SeededAutocomplete>(testComponents.SeededAutocomplete);
        fixture.detectChanges();
        fixture.componentInstance.duplicate = jest.fn();

        let chips = getAllChipInstances(fixture);
        expect(chips.length).toEqual(1);

        const input = getAutocompleteInput(fixture);
        typeInElement('fl', input);
        fixture.detectChanges();

        // Select Florida (it's selected by default in this test component)
        const opt = getOptionElement(fixture, 0, 4);
        opt.click();
        fixture.detectChanges();

        // Verify the selection did NOT work
        chips = getAllChipInstances(fixture);
        expect(chips.length).toEqual(1);
        expect(fixture.componentInstance.duplicate).toHaveBeenCalledWith('Florida');
        jest.runAllTimers();
        expect.assertions(3);
      });


      describe(`when allowed`, function() {

        test(`should allow a duplicate selection`, () => {
          const fixture = createComponent<testComponents.SeededAutocomplete>(testComponents.SeededAutocomplete);
          fixture.componentInstance.allowDuplicates = true;
          fixture.detectChanges();

          let chips = getAllChipInstances(fixture);
          expect(chips.length).toEqual(1);

          const input = getAutocompleteInput(fixture);
          typeInElement('fl', input);
          fixture.detectChanges();

          // Select Florida (it's selected by default in this test component)
          const opt = getOptionElement(fixture, 0, 4);
          opt.click();
          fixture.detectChanges();

          // Verify the selection DID work
          chips = getAllChipInstances(fixture);
          expect(chips.length).toEqual(2);
          expect(getAutocompleteInstance(fixture).autocompleteSelections).toEqual(['Florida', 'Florida']);

          expect.assertions(3);
        });

      });

    });


    describe(`trigger`, function() {

      describe(`in single selection mode`, function() {

        test(`should set single value`, () => {
          const fixture = createComponent<testComponents.SeededAutocomplete>(testComponents.SeededAutocomplete);
          fixture.componentInstance.allowMultiple = false;
          fixture.componentInstance.keepOpen = false;
          fixture.detectChanges();
          const instance = getAutocompleteInstance(fixture);
          const input = getAutocompleteInput(fixture);

          typeInElement('fl', input);
          fixture.detectChanges();

          const opt = getOptionElement(fixture);
          opt.click();
          fixture.detectChanges();

          expect(instance.autocompleteFormControl.value).toEqual(['Arkansas']);
        });


        test(`should set single value 2`, () => {
          const fixture = createComponent<testComponents.SeededAutocompleteWithFormatFn>(testComponents.SeededAutocompleteWithFormatFn);
          fixture.componentInstance.allowMultiple = false;
          fixture.componentInstance.keepOpen = false;
          fixture.componentInstance.myCtrl.setValue([{ name: 'Florida', population: '20.27M' }]);
          fixture.detectChanges();
          const instance = getAutocompleteInstance(fixture);
          const input = getAutocompleteInput(fixture);

          typeInElement('fl', input);
          fixture.detectChanges();

          const opt = getOptionElement(fixture);
          opt.click();
          fixture.detectChanges();

          expect(instance.autocompleteFormControl.value).toEqual(['Arkansas']);
        });

      });

    });


    test(`should reset the query when a selection is made`, function() {
      const fixture = createComponent(testComponents.AutocompleteAllowMultipleNoReopen);
      fixture.detectChanges();

      const element = getAutocompleteElement(fixture);
      const input = getAutocompleteInput(fixture);
      typeInElement('fl', input);
      fixture.detectChanges();

      expect(input.value).toEqual('fl');

      // move down to Florida and try to select it
      dispatchKeyboardEvent(element, 'keydown', KEYS.DOWN_ARROW);
      dispatchKeyboardEvent(element, 'keydown', KEYS.DOWN_ARROW);
      dispatchKeyboardEvent(element, 'keydown', KEYS.DOWN_ARROW);
      dispatchKeyboardEvent(element, 'keydown', KEYS.DOWN_ARROW);
      dispatchKeyboardEvent(element, 'keydown', KEYS.DOWN_ARROW);
      dispatchKeyboardEvent(element, 'keydown', KEYS.ENTER);
      fixture.detectChanges();

      expect(input.value).toEqual('');
    });


    // test(`should support a custom tabindex`, function () {
    //   const fixture = createComponent<testComponents.Tabindex>(testComponents.Tabindex);
    //   fixture.componentInstance.autocomplete = true;
    //   fixture.detectChanges();
    //   const input = getAutocompleteInput(fixture);

    //   expect(input.getAttribute('tabindex')).toEqual('4');
    // });


    test(`should seed the autocomplete model(s) after timeout when using ngModel`, fakeAsync(function() {
      const fixture = createComponent(testComponents.SeededNgModelAutocomplete);
      fixture.detectChanges();

      tick(1000);
      fixture.detectChanges();

      const instance = getAutocompleteInstance(fixture);
      expect(instance.autocompleteFormControl.value).toEqual(['Florida']);
      expect(instance.autocompleteSelections).toEqual(['Florida']);
    }));


    test(`should close the panel if open when getting a blur event that isn't from a selection`, function() {
      const fixture = createComponent<testComponents.Autocomplete>(testComponents.Autocomplete);
      fixture.componentInstance.disabled = true;
      fixture.detectChanges();
      const input = getAutocompleteInput(fixture);
      const instance = getAutocompleteInstance(fixture);
      const triggerInstance = instance.autocompleteTrigger;

      instance.focus();
      triggerInstance.openPanel();
      fixture.detectChanges();

      expect(triggerInstance.panelOpen).toEqual(true);

      const event = createFakeEvent('blur');

      fixture.componentInstance.states.length = 0;
      fixture.detectChanges();

      input.dispatchEvent(event);
      fixture.detectChanges();

      expect(triggerInstance.panelOpen).toEqual(false);
    });


    test(`should update the overlay position when a chip is removed`, function() {
      jest.useFakeTimers();
      const fixture = createComponent(testComponents.SeededAutocomplete);
      fixture.detectChanges();
      const instance = getAutocompleteInstance(fixture);
      const triggerInstance = instance.autocompleteTrigger;
      const chip = getChipElement(fixture);
      const chipRemovalButton = chip.querySelector('.mat-chip-remove');

      triggerInstance.openPanel();
      fixture.detectChanges();
      instance.autocompleteTrigger.overlayRef.updatePosition = jest.fn();

      dispatchMouseEvent(chipRemovalButton, 'click');
      jest.advanceTimersByTime(1000);
      fixture.detectChanges();

      expect(instance.autocompleteTrigger.overlayRef.updatePosition).toHaveBeenCalled();
      jest.runAllTimers();
    });


    describe(`required`, () => {

      test(`should set required if the form control is required`, () => {
        const fixture = createComponent(testComponents.ValidateOnChange);
        fixture.detectChanges();
        const component = getAutocompleteElement(fixture);
        const selectTrigger = getAutocompleteTriggerElement(fixture);
        dispatchMouseEvent(selectTrigger, 'click');
        dispatchMouseEvent(component, 'click');
        const validationMessage = getValidationMessageElement(fixture);

        expect(validationMessage).toBeTruthy();
      });

      test(`should set required if the form control is required for autocomplete mode`, () => {
        const fixture = createComponent(testComponents.AutocompleteRequired);
        fixture.detectChanges();
        const component = getAutocompleteInput(fixture);

        const selectTrigger = getAutocompleteTriggerElement(fixture);
        dispatchMouseEvent(selectTrigger, 'click');
        dispatchMouseEvent(component, 'click');
        const validationMessage = getValidationMessageElement(fixture);

        expect(validationMessage).toBeTruthy();
      });
    });


    describe(`panel`, function() {

      test(`should support a custom ID`, () => {
        const fixture = createComponent<testComponents.Autocomplete>(testComponents.Autocomplete);
        fixture.componentInstance.disabled = true;
        fixture.detectChanges();
        const instance = getAutocompleteInstance(fixture);
        instance.autocompleteTrigger.openPanel();
        fixture.detectChanges();
        const panel = fixture.debugElement.query(By.css('.ts-autocomplete-panel__inner')).nativeElement as HTMLElement;

        expect(instance.autocompletePanel.isOpen).toEqual(true);
        expect(panel.getAttribute('id')).toEqual(expect.stringContaining('-panel'));
      });

    });

  });


  test(`should be able to hide the required marker`, function() {
    const fixture = createComponent<testComponents.HideRequired>(testComponents.HideRequired);
    fixture.detectChanges();
    let marker = fixture.debugElement.query(By.css('.ts-form-field-required-marker'));
    expect(marker).toBeTruthy();

    fixture.componentInstance.hideRequired = true;
    fixture.detectChanges();

    marker = fixture.debugElement.query(By.css('.ts-form-field-required-marker'));
    expect(marker).toBeFalsy();
  });


  test(`should support a custom hint`, function() {
    const fixture = createComponent(testComponents.Hint);
    fixture.detectChanges();
    const hintElement = fixture.debugElement.query(By.css('.ts-form-field__hint-wrapper'));
    const contents = fixture.debugElement.query(By.css('.c-input__hint'));

    expect(hintElement).toBeTruthy();
    expect(contents.nativeElement.textContent).toEqual('foo');
  });


  describe(`ID`, function() {

    test(`should support a custom ID`, () => {
      const fixture = createComponent(testComponents.Id);
      fixture.detectChanges();
      const trigger = getAutocompleteTriggerElement(fixture);

      expect(trigger.getAttribute('id')).toEqual('foo');
    });


    test(`should fall back to the UID if no ID is passed in`, () => {
      const fixture = createComponent<testComponents.Id>(testComponents.Id);
      fixture.componentInstance.myId = undefined as any;
      fixture.detectChanges();
      const trigger = getAutocompleteTriggerElement(fixture);

      expect(trigger.getAttribute('id')).toEqual(expect.stringContaining('ts-autocomplete-'));
    });

  });


  test(`should show error immediately if validating on change`, function() {
    const fixture = createComponent(testComponents.ValidateOnChange);
    fixture.detectChanges();
    const messageContainer = fixture.debugElement.query(By.css('.c-validation-message'));

    expect(messageContainer.nativeElement.textContent.trim()).toEqual('Required');
  });


  describe(`toggle()`, function() {

    test(`should close the panel if it is open`, () => {
      const fixture = createComponent(testComponents.Autocomplete);
      fixture.detectChanges();
      const trigger = getAutocompleteTriggerElement(fixture);
      trigger.click();
      fixture.detectChanges();
      const instance = getAutocompleteInstance(fixture);

      expect(instance.panelOpen).toEqual(true);

      instance.toggle();
      fixture.detectChanges();

      expect(instance.panelOpen).toEqual(false);
    });

  });


  describe(`onSelect`, function() {

    test(`should reset selection values when a null value is selected`, () => {
      const fixture = createComponent<testComponents.NullSelection>(testComponents.NullSelection);
      fixture.detectChanges();
      const instance = getAutocompleteInstance(fixture);
      const trigger = getAutocompleteTriggerElement(fixture);

      expect(fixture.componentInstance.myCtrl.value).toEqual('bar');

      const option = getOptionElement(fixture, 0, 1);
      option.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.myCtrl.value).toBeNull();
      expect(trigger.textContent).not.toContain('Null');
    });

  });


  describe(`keyManager`, function() {

    test(`should close the panel and focus the select if the user TABs out`, () => {
      const fixture = createComponent(testComponents.Autocomplete);
      fixture.detectChanges();
      const instance = getAutocompleteInstance(fixture);
      const element = getAutocompleteElement(fixture);

      instance.focus = jest.fn();
      instance.open();
      fixture.detectChanges();

      expect(instance.panelOpen).toEqual(true);

      dispatchKeyboardEvent(element, 'keydown', KEYS.TAB);
      fixture.detectChanges();

      expect(instance.panelOpen).toEqual(false);
      expect(instance.focus).toHaveBeenCalled();
      expect.assertions(3);
    });

  });


  describe(`propogateChanges`, function() {

    test(`should use fallback value if the option has no value`, () => {
      const fixture = createComponent<testComponents.Autocomplete>(testComponents.Autocomplete);
      fixture.detectChanges();
      const instance = getAutocompleteInstance(fixture);
      fixture.componentInstance.change = jest.fn();

      instance['propagateChanges']('foo');
      fixture.detectChanges();

      expect(fixture.componentInstance.change).toHaveBeenCalledWith(expect.objectContaining({ value: 'foo' }));
    });

  });


  describe(`getPanelScrollTop`, function() {

    test(`should fallback to 0 if the panel is not found`, () => {
      const fixture = createComponent(testComponents.Autocomplete);
      fixture.detectChanges();
      const instance = getAutocompleteInstance(fixture);
      instance.panel = undefined as any;

      expect(instance['getPanelScrollTop']()).toEqual(0);
    });

  });


  describe(`option`, function() {

    test(`should throw error if template is used but no option is passed in`, () => {
      const create = () => {
        const fixture = createComponent(testComponents.OptionError);
        fixture.detectChanges();
      };

      expect(create).toThrowError(`TsOptionComponent: The full 'option' object must be passed in when using a custom template.`);
    });


    describe(`Id`, function() {

      test(`should support custom IDs`, () => {
        const fixture = createComponent(testComponents.OptionId);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 0, 1);

        expect(option.id).toEqual('Alabama');
      });


      test(`should fall back to UID`, () => {
        const fixture = createComponent(testComponents.OptionId);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 0, 1);

        option.id = undefined as any;
        fixture.detectChanges();

        expect(option.id).toEqual(expect.stringContaining('ts-select-option-'));
      });

    });


    describe(`getLabel`, function() {

      test(`should return the viewValue`, () => {
        const fixture = createComponent(testComponents.OptionId);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 0, 1);

        expect(option.getLabel()).toEqual('Alabama');
      });

    });


    describe(`handleKeydown`, function() {

      test(`should select via interaction when SPACE is used`, () => {
        const fixture = createComponent(testComponents.OptionId);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 0, 1);
        const event = createKeyboardEvent('keydown', KEYS.SPACE);
        option.selectViaInteraction = jest.fn();

        option.handleKeydown(event);

        expect(option.selectViaInteraction).toHaveBeenCalled();
        expect(event.defaultPrevented).toEqual(true);
      });


      test(`should select via interaction when ENTER is used`, () => {
        const fixture = createComponent(testComponents.OptionId);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 0, 1);
        const event = createKeyboardEvent('keydown', KEYS.ENTER);
        option.selectViaInteraction = jest.fn();

        option.handleKeydown(event);

        expect(option.selectViaInteraction).toHaveBeenCalled();
        expect(event.defaultPrevented).toEqual(true);
      });

    });


    describe(`option`, function() {

      test(`should retrieve the option object`, () => {
        const fixture = createComponent(testComponents.OptionId);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 0, 1);

        expect(option.option).toEqual(expect.objectContaining({ name: 'Alabama' }));
      });

    });


    describe(`deselect`, function() {

      test(`should emit event not from user interaction`, () => {
        const fixture = createComponent<testComponents.OptionId>(testComponents.OptionId);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 0, 2);
        option.select();
        fixture.detectChanges();
        option.emitSelectionChangeEvent = jest.fn();

        option.deselect();
        fixture.detectChanges();

        expect(option.emitSelectionChangeEvent.mock.calls.length).toEqual(1);
        // Verify it was not called with the boolean
        expect(option.emitSelectionChangeEvent.mock.calls[0]).toEqual([]);
      });

    });

  });


  describe(`optgroup`, function() {

    test(`should support a custom ID`, () => {
      const fixture = createComponent(testComponents.OptgroupIDs);
      fixture.detectChanges();
      const trigger = getAutocompleteTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const group = getOptgroupElement(fixture);

      expect(group.getAttribute('id')).toEqual('Group A');
    });


    test(`should fall back to the UID if no valid ID is passed in`, () => {
      const fixture = createComponent(testComponents.OptgroupBadIDs);
      fixture.detectChanges();
      const trigger = getAutocompleteTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const group = getOptgroupElement(fixture);

      expect(group.getAttribute('id')).toEqual(expect.stringContaining('ts-select-optgroup-'));
    });

  });


  // describe(`trigger`, function() {

  //   test(`should support a custom ID`, () => {
  //     const fixture = createComponent(testComponents.CustomTrigger);
  //     fixture.detectChanges();
  //     const instance = getAutocompleteInstance(fixture);

  //     expect(instance.customTrigger.id).toEqual('foo');
  //   });


  //   test(`should fall back to the UID if no valid ID is passed in`, () => {
  //     const fixture = createComponent<testComponents.CustomTrigger>(testComponents.CustomTrigger);
  //     fixture.detectChanges();
  //     fixture.componentInstance.myId = undefined as any;
  //     fixture.detectChanges();
  //     const instance = getAutocompleteInstance(fixture);

  //     expect(instance.customTrigger.id).toEqual(expect.stringContaining('ts-select-trigger-'));
  //   });

  // });


});
