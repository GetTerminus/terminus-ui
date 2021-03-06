import { Type } from '@angular/core';
import {
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
  createComponent as createComponentInner,
  createFakeEvent,
  createKeyboardEvent,
  dispatchEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  typeInElement,
} from '@terminus/ngx-tools/testing';
import * as testComponents from '@terminus/ui/autocomplete/testing';
// eslint-disable-next-line no-duplicate-imports
import {
  getAllChipInstances,
  getAutocompleteElement,
  getAutocompleteInput,
  getAutocompleteInstance,
  getAutocompleteTriggerElement,
  getChipElement,
  getOptionElement,
  getOptionInstance,
} from '@terminus/ui/autocomplete/testing';
import { TsOptionModule } from '@terminus/ui/option';
import { getValidationMessageElement } from '@terminus/ui/validation-messages/testing';

import { TsAutocompleteModule } from './autocomplete.module';

/**
 * Create test host component
 *
 * @param component
 */
function createComponent<T>(component: Type<T>): ComponentFixture<T> {
  const moduleImports = [
    FormsModule,
    ReactiveFormsModule,
    TsAutocompleteModule,
    TsOptionModule,
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

  test(`should set the disabled state when called`, () => {
    const fixture = createComponent(testComponents.Autocomplete);
    fixture.detectChanges();
    const instance = getAutocompleteInstance(fixture);
    const autocomplete = fixture.debugElement.query(By.css('.ts-autocomplete')).nativeElement;
    instance['changeDetectorRef'].markForCheck = jest.fn();
    instance.stateChanges.next = jest.fn();

    instance.setDisabledState(true);
    fixture.detectChanges();

    expect(instance['changeDetectorRef'].markForCheck).toHaveBeenCalled();
    expect(instance.stateChanges.next).toHaveBeenCalled();
    expect(instance.isDisabled).toEqual(true);
    expect(autocomplete.classList).toContain('ts-autocomplete--disabled');
  });

  test(`should not open when disabled`, () => {
    const fixture = createComponent<testComponents.Disabled>(testComponents.Disabled);
    fixture.detectChanges();
    fixture.componentInstance.wasOpened = jest.fn();
    const trigger = getAutocompleteTriggerElement(fixture);
    dispatchMouseEvent(trigger, 'click');
    fixture.detectChanges();
    const instance = getAutocompleteInstance(fixture);

    expect(fixture.componentInstance.wasOpened).not.toHaveBeenCalled();
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
      const chipRemovalButton = chip.querySelector('.c-chip__remove');
      const instance = getAutocompleteInstance(fixture);

      // Open the panel so that overlayRef is created
      instance.autocompleteTrigger.handleFocus();
      instance.autocompleteTrigger.overlayRef!.updatePosition = jest.fn();

      dispatchMouseEvent(chipRemovalButton as Node, 'click');
      fixture.detectChanges();

      chips = getAllChipInstances(fixture);
      expect(chips.length).toEqual(0);

      const input = getAutocompleteInput(fixture);
      expect(document.activeElement).toEqual(input);
      jest.advanceTimersByTime(200);

      expect(instance.autocompleteTrigger.overlayRef!.updatePosition).toHaveBeenCalled();
      jest.runAllTimers();
    });

    test(`should allow removal with the backspace key`, () => {
      // NOTE: `dispatchKeyboardEvent` suddenly stopped working for this test during the Angular v8 upgrade
      const event = document.createEvent('KeyboardEvent');
      event.initEvent('keydown', true, false);
      Object.defineProperties(event, {
        keyCode: { get: () => KEYS.BACKSPACE.keyCode },
        key: { get: () => KEYS.BACKSPACE.code },
      });

      const fixture = createComponent(testComponents.SeededAutocomplete);
      fixture.detectChanges();
      const nativeInput = fixture.nativeElement.querySelector('input');
      let chips = getAllChipInstances(fixture);
      expect(chips.length).toEqual(1);

      const chip = getChipElement(fixture);
      const BACKSPACE_EVENT_CHIP = createKeyboardEvent('keydown', KEYS.BACKSPACE, chip);
      // The first backspace selects the previous chip
      nativeInput.focus();
      nativeInput.dispatchEvent(event);
      fixture.detectChanges();
      dispatchEvent(chip, BACKSPACE_EVENT_CHIP);

      fixture.detectChanges();

      chips = getAllChipInstances(fixture);
      expect(chips.length).toEqual(0);
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
    test(`should not be allowed by default but should emit an event`, fakeAsync(function() {
      const fixture = createComponent<testComponents.SeededAutocomplete>(testComponents.SeededAutocomplete);
      fixture.detectChanges();
      const component = fixture.componentInstance;
      component.duplicate = jest.fn();

      let chips = getAllChipInstances(fixture);
      expect(chips.length).toEqual(1);

      const input = getAutocompleteInput(fixture);
      typeInElement(fixture.componentInstance.states[3].name.substring(0, 3), input);
      tick(1000);
      fixture.detectChanges();

      // Select Florida (it's selected by default in this test component)
      const opt = getOptionElement(fixture, 0, 4);
      opt.click();
      tick(1000);
      fixture.detectChanges();

      // Verify the selection did NOT work
      chips = getAllChipInstances(fixture);
      expect(chips.length).toEqual(1);
      expect(fixture.componentInstance.duplicate).toHaveBeenCalled();
      expect.assertions(3);
    }));

    describe(`when allowed`, function() {
      test(`should allow a duplicate selection`, fakeAsync(() => {
        const fixture = createComponent<testComponents.SeededAutocomplete>(testComponents.SeededAutocomplete);
        fixture.componentInstance.allowDuplicates = true;
        fixture.detectChanges();

        let chips = getAllChipInstances(fixture);
        expect(chips.length).toEqual(1);

        const input = getAutocompleteInput(fixture);
        const states = fixture.componentInstance.states;
        typeInElement(states[4].name.substring(0, 2), input);
        tick(1000);
        fixture.detectChanges();

        // Select Florida (it's selected by default in this test component)
        const opt = getOptionElement(fixture, 0, 4);
        opt.click();
        tick(1000);
        fixture.detectChanges();

        // Verify the selection DID work
        chips = getAllChipInstances(fixture);
        expect(chips.length).toEqual(2);
        const autocomplete = getAutocompleteInstance(fixture);
        expect(autocomplete.autocompleteFormControl.value.length).toEqual(2);
        expect(autocomplete.autocompleteFormControl.value).toEqual([states[4], states[4]]);

        expect.assertions(4);
      }));
    });
  });

  describe(`trigger`, function() {
    describe(`in single selection mode`, function() {
      test(`should set single value`, fakeAsync(() => {
        const fixture = createComponent<testComponents.SeededAutocomplete>(testComponents.SeededAutocomplete);
        fixture.componentInstance.allowMultiple = false;
        fixture.componentInstance.keepOpen = false;
        tick(1000);
        fixture.detectChanges();
        const instance = getAutocompleteInstance(fixture);
        const input = getAutocompleteInput(fixture);

        const states = fixture.componentInstance.states;
        typeInElement(states[4].name.substring(0, 2), input);
        tick(1000);
        fixture.detectChanges();

        const opt = getOptionElement(fixture);
        opt.click();
        tick(1000);
        fixture.detectChanges();

        expect(instance.autocompleteFormControl.value).toEqual([states[0]]);
      }));
    });

    test(`should reset the query when a selection is made`, fakeAsync(function() {
      const fixture = createComponent(testComponents.AutocompleteAllowMultipleNoReopen);
      fixture.detectChanges();

      const input = getAutocompleteInput(fixture);
      const states = fixture.componentInstance.states;
      const name = states[3].name.substring(0, 2);
      typeInElement(name, input);
      tick(1000);
      fixture.detectChanges();

      expect(input.value).toEqual(name);

      const opt = getOptionElement(fixture, 0, 4);
      opt.click();
      tick(1000);
      fixture.detectChanges();

      expect(input.value).toEqual('');
    }));

    test(`should complain and moan if you set a form control that isn't an array`, () => {
      const fixture = createComponent(testComponents.SeededNonArrayAutocomplete);
      expect(() => fixture.detectChanges()).toThrowError('form control values must be an array of values');
    });

    test(`should seed the autocomplete model(s) after timeout when using ngModel`, fakeAsync(function() {
      const fixture = createComponent(testComponents.SeededNgModelAutocomplete);
      fixture.detectChanges();

      const states = fixture.componentInstance.states;

      tick(1000);
      fixture.detectChanges();

      const instance = getAutocompleteInstance(fixture);
      expect(instance.autocompleteFormControl.value).toEqual([states[4]]);
    }));

    test(`should allow a value seeded by a FormControl`, fakeAsync(function() {
      const fixture = createComponent(testComponents.AutocompleteAllowMultipleNoReopen);
      fixture.detectChanges();

      const states = fixture.componentInstance.states;
      const input = getAutocompleteInput(fixture);
      const name = states[4].name.substring(0, 2);
      typeInElement(name, input);
      tick(1000);
      fixture.detectChanges();
      const opt = getOptionElement(fixture, 0, 2);
      opt.click();
      tick(1000);
      fixture.detectChanges();
      expect(getAutocompleteInstance(fixture).autocompleteFormControl.value).toEqual([states[2]]);
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
      expect(instance.panelOpen).toEqual(false);
    });

    test(`should close the panel if focus on another autocomplete instance`, () => {
      const fixture = createComponent(testComponents.MultipleAutocomplete);
      fixture.detectChanges();
      const input2 = getAutocompleteInput(fixture, 1);
      const instance = getAutocompleteInstance(fixture);
      const triggerInstance = instance.autocompleteTrigger;

      instance.focus();
      triggerInstance.openPanel();
      fixture.detectChanges();
      expect(triggerInstance.panelOpen).toEqual(true);

      input2.click();
      fixture.detectChanges();
      expect(instance.panelOpen).toEqual(false);
    });

    test(`should update the overlay position when a chip is removed`, function() {
      jest.useFakeTimers();
      const fixture = createComponent(testComponents.SeededAutocomplete);
      fixture.detectChanges();
      const instance = getAutocompleteInstance(fixture);
      const triggerInstance = instance.autocompleteTrigger;
      const chip = getChipElement(fixture);
      const chipRemovalButton = chip.querySelector('.c-chip__remove');

      triggerInstance.openPanel();
      fixture.detectChanges();
      instance.autocompleteTrigger.overlayRef!.updatePosition = jest.fn();

      dispatchMouseEvent(chipRemovalButton as Node, 'click');
      jest.advanceTimersByTime(1000);
      fixture.detectChanges();

      expect(instance.autocompleteTrigger.overlayRef!.updatePosition).toHaveBeenCalled();
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
    expect(contents.nativeElement.textContent.trim()).toEqual('foo');
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

  describe(`option`, function() {
    test(`should throw error if template is used but no option is passed in`, () => {
      const create = () => {
        const fixture = createComponent(testComponents.OptionError);
        fixture.detectChanges();
      };

      expect(create).toThrowError(`TsOptionComponent: The full 'option' object must be passed in when using a custom template.`);
    });

    describe(`id`, function() {
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

        expect(option.id).toEqual(expect.stringContaining('ts-option-'));
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
        option['emitSelectionChangeEvent'] = jest.fn();

        option.deselect();
        fixture.detectChanges();

        expect(option['emitSelectionChangeEvent'].mock.calls.length).toEqual(1);
        // Verify it was not called with the boolean
        expect(option['emitSelectionChangeEvent'].mock.calls[0]).toEqual([]);
      });
    });

    describe(`checkbox`, function() {
      test(`should not have checkbox in front of an item list`, fakeAsync(() => {
        const fixture = createComponent(testComponents.AutocompleteAllowMultipleNoReopen);
        fixture.detectChanges();

        const input = getAutocompleteInput(fixture);
        typeInElement('al', input);
        tick(1000);
        fixture.detectChanges();
        const opt = getOptionElement(fixture, 0, 1);
        fixture.detectChanges();
        expect(opt.querySelectorAll('ts-checkbox')).toHaveLength(0);
      }));
    });
  });

  test('onContainerClick', () => {
    const fixture = createComponent(testComponents.SeededAutocomplete);
    const autocomplete = getAutocompleteInstance(fixture);
    autocomplete.focus = jest.fn();
    autocomplete.onContainerClick();
    expect(autocomplete.focus).toHaveBeenCalled();
  });

  test('value getter/setter', () => {
    const fixture = createComponent(testComponents.SeededAutocomplete);
    const autocomplete = getAutocompleteInstance(fixture);
    autocomplete.value = 'testing';
    expect(autocomplete.value).toEqual('testing');
  });
});
