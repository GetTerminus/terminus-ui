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
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  typeInElement,
} from '@terminus/ngx-tools/testing';
import {
  getAllChipInstances,
  getChipElement,
  getChipInstance,
  getChipRemoveButton,
} from '@terminus/ui/chip/testing';
import {
  TsOptionComponent,
  TsOptionModule,
} from '@terminus/ui/option';
import * as testComponents from '@terminus/ui/selection-list/testing';
// eslint-disable-next-line no-duplicate-imports
import {
  getAllOptionInstances,
  getOptionElement,
  getOptionInstance,
  getSelectionListElement,
  getSelectionListInput,
  getSelectionListInstance,
  getSelectionListTriggerElement,
} from '@terminus/ui/selection-list/testing';
import { getValidationMessageElement } from '@terminus/ui/validation-messages/testing';

import { TsSelectionListTriggerDirective } from './selection-list-panel/selection-list-trigger.directive';
import { TsSelectionListComponent } from './selection-list.component';
import { TsSelectionListModule } from './selection-list.module';

/**
 * Create test host component
 *
 * @param component
 */
function createComponent<T>(component: Type<T>): ComponentFixture<T> {
  const moduleImports = [
    FormsModule,
    ReactiveFormsModule,
    TsSelectionListModule,
    TsOptionModule,
    NoopAnimationsModule,
  ];
  return createComponentInner(component, undefined, moduleImports);
}

describe(`TsSelectionListComponent`, function() {
  test(`should exist`, function() {
    const fixture = createComponent(testComponents.Basic);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.ts-selection-list'))).toBeTruthy();
  });

  test(`should show a progress indicator`, () => {
    jest.useFakeTimers();
    const fixture = createComponent(testComponents.Basic);
    fixture.detectChanges();

    let spinner = fixture.debugElement.query(By.css('.c-selection-list__spinner'));
    expect(spinner).toBeFalsy();

    fixture.componentInstance.showProgress = true;
    fixture.detectChanges();

    spinner = fixture.debugElement.query(By.css('.c-selection-list__spinner'));
    expect(spinner).toBeTruthy();

    expect.assertions(2);
  });

  test(`should set the disabled state when called`, () => {
    const fixture = createComponent(testComponents.Basic);
    fixture.detectChanges();
    const instance = getSelectionListInstance(fixture);
    const selectionList = fixture.debugElement.query(By.css('.ts-selection-list')).nativeElement;
    instance['changeDetectorRef'].markForCheck = jest.fn();
    instance.stateChanges.next = jest.fn();

    instance.setDisabledState(true);
    fixture.detectChanges();

    expect(instance['changeDetectorRef'].markForCheck).toHaveBeenCalled();
    expect(instance.stateChanges.next).toHaveBeenCalled();
    expect(instance.isDisabled).toEqual(true);
    expect(selectionList.classList).toContain('ts-selection-list--disabled');
  });

  test(`should not open when disabled`, () => {
    const fixture = createComponent(testComponents.Disabled);
    fixture.detectChanges();
    const trigger = getSelectionListTriggerElement(fixture);
    dispatchMouseEvent(trigger, 'click');
    fixture.detectChanges();
    const instance = getSelectionListInstance(fixture);

    expect(instance.panelOpen).toEqual(false);
  });

  describe(`chips`, function() {
    test(`should show selections as chips`, () => {
      const fixture = createComponent(testComponents.Seeded);
      fixture.detectChanges();
      const chip = getChipElement(fixture);

      expect(chip).toBeTruthy();
    });

    test(`should allow chips to be removed`, fakeAsync(() => {
      const fixture = createComponent(testComponents.Seeded);
      fixture.detectChanges();

      let chips = getAllChipInstances(fixture);
      expect(chips.length).toEqual(1);

      // const chip = getChipElement(fixture);
      const chipRemovalButton = getChipRemoveButton(chips[0]);
      const instance = getSelectionListInstance(fixture);
      // Open the panel so that overlayRef is created
      instance.trigger.handleFocus();
      instance.trigger.overlayRef!.updatePosition = jest.fn();

      dispatchMouseEvent(chipRemovalButton, 'click');
      fixture.detectChanges();

      chips = getAllChipInstances(fixture);
      expect(chips.length).toEqual(0);

      const input = getSelectionListInput(fixture);
      expect(document.activeElement).toEqual(input);
      tick(1000);

      expect(instance.trigger.overlayRef!.updatePosition).toHaveBeenCalled();
    }));

    test(`should allow removal with the backspace key`, () => {
      // NOTE: The CDK relies on `keyCode` being set which our helper doesn't currently do.
      const event = document.createEvent('KeyboardEvent');
      event.initEvent('keydown', true, false);
      Object.defineProperties(event, {
        keyCode: { get: () => KEYS.BACKSPACE.keyCode },
        key: { get: () => KEYS.BACKSPACE.code },
        code: { get: () => KEYS.BACKSPACE.code },
      });
      const fixture = createComponent(testComponents.Seeded);
      fixture.detectChanges();

      let chips = getAllChipInstances(fixture);
      expect(chips.length).toEqual(1);

      const chip = getChipElement(fixture);
      // The first backspace selects the previous chip
      chip.dispatchEvent(event);
      fixture.detectChanges();

      chip.dispatchEvent(event);
      fixture.detectChanges();

      chips = getAllChipInstances(fixture);
      expect(chips.length).toEqual(0);
    });
  });

  describe(`debounce`, function() {
    test(`should debounce the stream`, () => {
      jest.useFakeTimers();
      const fixture = createComponent(testComponents.Debounce);
      fixture.componentInstance.change = jest.fn();
      fixture.detectChanges();
      const instance = getSelectionListInstance(fixture);

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
      const fixture = createComponent(testComponents.CustomDebounce);
      fixture.componentInstance.change = jest.fn();
      fixture.detectChanges();
      const instance = getSelectionListInstance(fixture);

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
      const fixture = createComponent(testComponents.CustomCharacterCount);
      fixture.componentInstance.change = jest.fn();
      fixture.detectChanges();
      const instance = getSelectionListInstance(fixture);

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
      const fixture = createComponent(testComponents.CustomCharacterCount);
      fixture.componentInstance.customCount = 1;
      fixture.componentInstance.change = jest.fn();
      fixture.detectChanges();
      const instance = getSelectionListInstance(fixture);

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
    const fixture = createComponent(testComponents.Debounce);
    fixture.componentInstance.change = jest.fn();
    fixture.detectChanges();
    const instance = getSelectionListInstance(fixture);

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
      const fixture = createComponent(testComponents.Seeded);
      fixture.componentInstance.duplicate = jest.fn();
      fixture.detectChanges();
      const component = fixture.componentInstance;
      component.duplicate = jest.fn();

      let chips = getAllChipInstances(fixture);
      expect(chips.length).toEqual(1);

      const input = getSelectionListInput(fixture);
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
      // TODO: Why are these ignores needed?
      // @ts-ignore
      expect(fixture.componentInstance.duplicate.mock.calls[0][0].source).toBeInstanceOf(TsSelectionListComponent);
      // @ts-ignore
      expect(fixture.componentInstance.duplicate.mock.calls[0][0].value).toEqual(expect.objectContaining({ name: 'Florida' }));
      expect.assertions(4);
    }));

    describe(`when allowed`, function() {
      test(`should allow a duplicate selection`, fakeAsync(() => {
        const fixture = createComponent(testComponents.Seeded);
        fixture.componentInstance.allowDuplicates = true;
        fixture.detectChanges();

        let chips = getAllChipInstances(fixture);
        expect(chips.length).toEqual(1);

        const input = getSelectionListInput(fixture);
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
        const instance = getSelectionListInstance(fixture);
        expect(instance.selectionListFormControl.value).toEqual([states[4], states[4]]);
        expect.assertions(3);
      }));
    });
  });

  describe(`trigger`, function() {
    describe(`in single selection mode`, function() {
      test(`should set single value`, fakeAsync(() => {
        const fixture = createComponent(testComponents.Seeded);
        fixture.componentInstance.allowMultiple = false;
        fixture.componentInstance.keepOpen = false;
        tick(1000);
        fixture.detectChanges();
        const instance = getSelectionListInstance(fixture);
        const input = getSelectionListInput(fixture);

        const states = fixture.componentInstance.states;
        typeInElement(states[4].name.substring(0, 2), input);
        tick(1000);
        fixture.detectChanges();

        const opt = getOptionElement(fixture);
        opt.click();
        tick(1000);
        fixture.detectChanges();

        expect(instance.selectionListFormControl.value).toEqual([states[0]]);
      }));

      test.todo(`should set a value using the displayFormatter if it exists`);
    });

    test(`should reset the query when a selection is made`, fakeAsync(function() {
      const fixture = createComponent(testComponents.AllowMultipleNoReopen);
      fixture.detectChanges();

      const input = getSelectionListInput(fixture);
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

    test(`should throw an error if a form control is set who's value isn't an array`, () => {
      const fixture = createComponent(testComponents.SeededNonArray);
      expect(() => fixture.detectChanges()).toThrowError(`TsSelectionListComponent: Form control values must be an array of values`);
    });

    describe(`ngModel`, () => {
      test(`should seed the model after timeout when using ngModel`, fakeAsync(function() {
        const fixture = createComponent(testComponents.SeededNgModel);
        fixture.detectChanges();

        const states = fixture.componentInstance.states;

        tick(1000);
        fixture.detectChanges();

        const instance = getSelectionListInstance(fixture);
        expect(instance.selectionListFormControl.value).toEqual([states[4]]);
      }));
    });

    test(`should allow a value seeded by a FormControl`, fakeAsync(function() {
      const fixture = createComponent(testComponents.AllowMultipleNoReopen);
      fixture.detectChanges();

      const states = fixture.componentInstance.states;
      const input = getSelectionListInput(fixture);
      const name = states[4].name.substring(0, 2);
      typeInElement(name, input);
      tick(1000);
      fixture.detectChanges();
      const opt = getOptionElement(fixture, 0, 2);
      opt.click();
      tick(1000);
      fixture.detectChanges();
      expect(getSelectionListInstance(fixture).selectionListFormControl.value).toEqual([states[2]]);
    }));

    test(`should close the panel if open when getting a blur event that isn't from a selection`, function() {
      const fixture = createComponent(testComponents.Basic);
      fixture.componentInstance.disabled = true;
      fixture.detectChanges();
      const input = getSelectionListInput(fixture);
      const instance = getSelectionListInstance(fixture);
      const triggerInstance = instance.trigger;

      // Focus the input
      instance.focusInput();
      // Make sure the panel is open
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

    test(`should close the panel when focusing on another instance`, () => {
      const fixture = createComponent(testComponents.Multiple);
      fixture.detectChanges();
      const input2 = getSelectionListInput(fixture, 1);
      const instance = getSelectionListInstance(fixture);
      const triggerInstance = instance.trigger;

      instance.focusInput();
      triggerInstance.openPanel();
      fixture.detectChanges();
      expect(triggerInstance.panelOpen).toEqual(true);

      input2.click();
      fixture.detectChanges();
      expect(instance.panelOpen).toEqual(false);
    });

    test(`should update the overlay position when a chip is removed`, fakeAsync(() => {
      const fixture = createComponent(testComponents.Seeded);
      fixture.detectChanges();
      const instance = getSelectionListInstance(fixture);
      const triggerInstance = instance.trigger;
      const chip = getChipInstance(fixture);
      const chipRemovalButton = getChipRemoveButton(chip);

      triggerInstance.openPanel();
      fixture.detectChanges();
      instance.trigger.overlayRef!.updatePosition = jest.fn();

      dispatchMouseEvent(chipRemovalButton, 'click');
      tick(1000);
      fixture.detectChanges();

      expect(instance.trigger.overlayRef!.updatePosition).toHaveBeenCalled();
    }));

    describe(`required`, () => {
      test(`should set required if the form control is required`, () => {
        const fixture = createComponent(testComponents.ValidateOnChange);
        fixture.detectChanges();
        const component = getSelectionListElement(fixture);
        const selectTrigger = getSelectionListTriggerElement(fixture);
        dispatchMouseEvent(selectTrigger, 'click');
        dispatchMouseEvent(component, 'click');
        const validationMessage = getValidationMessageElement(fixture);

        expect(validationMessage).toBeTruthy();
      });

      test(`should set required if the form control is required`, () => {
        const fixture = createComponent(testComponents.Required);
        fixture.detectChanges();
        const component = getSelectionListInput(fixture);

        const selectTrigger = getSelectionListTriggerElement(fixture);
        dispatchMouseEvent(selectTrigger, 'click');
        dispatchMouseEvent(component, 'click');
        const validationMessage = getValidationMessageElement(fixture);

        expect(validationMessage).toBeTruthy();
      });
    });
  });

  describe(`panel`, function() {
    test(`should support a custom ID`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.componentInstance.disabled = true;
      fixture.detectChanges();
      const instance = getSelectionListInstance(fixture);
      instance.trigger.openPanel();
      fixture.detectChanges();
      const panel = fixture.debugElement.query(By.css('.ts-selection-list-panel__inner')).nativeElement as HTMLElement;

      expect(instance.panel.isOpen).toEqual(true);
      expect(panel.getAttribute('id')).toEqual(expect.stringContaining('-panel'));
    });
  });

  test(`should be able to hide the required marker`, function() {
    const fixture = createComponent(testComponents.HideRequired);
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
      const trigger = getSelectionListTriggerElement(fixture);

      expect(trigger.getAttribute('id')).toEqual('foo');
    });

    test(`should fall back to the UID if no ID is passed in`, () => {
      const fixture = createComponent(testComponents.Id);
      fixture.componentInstance.myId = undefined as any;
      fixture.detectChanges();
      const trigger = getSelectionListTriggerElement(fixture);

      expect(trigger.getAttribute('id')).toEqual(expect.stringContaining('ts-selection-list-'));
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
        const fixture = createComponent(testComponents.OptionId);
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
        const fixture = createComponent(testComponents.AllowMultipleNoReopen);
        fixture.detectChanges();

        const input = getSelectionListInput(fixture);
        typeInElement('al', input);
        tick(1000);
        fixture.detectChanges();
        const opt = getOptionElement(fixture, 0, 1);
        fixture.detectChanges();
        expect(opt.querySelectorAll('ts-checkbox')).toHaveLength(0);
      }));
    });
  });

  describe(`when clicking the container`, () => {
    test('should focus the input', () => {
      const fixture = createComponent(testComponents.Seeded);
      const instance = getSelectionListInstance(fixture);
      instance.focusInput = jest.fn();
      instance.onContainerClick();
      expect(instance.focusInput).toHaveBeenCalled();
    });
  });

  describe(`value getter/setter`, () => {
    test('should set and retrieve the value', () => {
      const fixture = createComponent(testComponents.Seeded);
      const instance = getSelectionListInstance(fixture);
      instance.value = 'testing';
      expect(instance.value).toEqual('testing');
    });
  });

  describe(`displayFormatter`, () => {
    test(`should default to returning the value as a string`, () => {
      const fixture = createComponent(testComponents.Basic);
      const instance = getSelectionListInstance(fixture);
      instance.displayFormatter = void 0 as any;
      const myString = 'foo' as any;

      expect(instance.displayFormatter(myString)).toEqual(expect.stringContaining('foo'));
    });

    test(`should format the display value`, () => {
      const fixture = createComponent(testComponents.Formatter);
      const instance = getSelectionListInstance(fixture);
      fixture.detectChanges();
      const chipElement = getChipElement(fixture);

      expect(instance.displayFormatter).toEqual(expect.any(Function));
      expect(chipElement.textContent).toEqual(expect.stringContaining('ARKANSAS'));
    });
  });

  test.todo(`should reset optionSelections stream if no options were initially found`);

  test.todo(`should do nothing if tabOut happens but the overlay is not attached`);

  describe(`tsSelectionListTriggerDisabled`, () => {
    test.todo(`should set the disabled value`);
  });

  describe(`handleFocus`, () => {
    test.todo(`should set a flag`);
  });

  test.todo(`should correctly parse a number value`);

  describe(`handleKeydown`, () => {
    test.todo(`should prevent default when ESCAPE is clicked`);

    test.todo(`should select an item when ENTER is pressed`);

    test.todo(`should pass keydown event to the key manager`);

    test.todo(`should open the panel if an arrow key is used`);
  });

  describe(`setDisabledState`, () => {
    test(`should disable the DOM element`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const instance = getSelectionListInstance(fixture);
      const trigger = instance.trigger;

      expect(trigger.elementRef.nativeElement.disabled).toEqual(false);

      trigger.setDisabledState(true);
      expect(trigger.elementRef.nativeElement.disabled).toEqual(true);
    });
  });

  describe(`attachOverlay`, () => {
    test(`should throw an error if no panel exists`, () => {
      const fixture = createComponent(testComponents.Basic);
      const instance = getSelectionListInstance(fixture);
      fixture.detectChanges();
      instance.trigger.selectionListPanel = undefined as any;

      const actual = () => {
        instance.trigger.openPanel();
      };
      expect(actual).toThrowError(expect.objectContaining({ message: expect.stringContaining('undefined instance') }));
    });

    test(`should reset and close if ESCAPE or ALT+UP is pressed`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const instance = getSelectionListInstance(fixture);
      const triggerInstance = instance.trigger;
      const event = document.createEvent('KeyboardEvent');
      event.initEvent('keydown', true, false);
      Object.defineProperties(event, {
        keyCode: { get: () => KEYS.ESCAPE.keyCode },
        code: { get: () => KEYS.ESCAPE.code },
      });

      instance.focusInput();
      triggerInstance.openPanel();
      fixture.detectChanges();
      triggerInstance['resetActiveItem'] = jest.fn();
      triggerInstance['closeKeyEventStream'].next = jest.fn();
      const overlayElement = triggerInstance.overlayRef!.overlayElement;
      overlayElement.dispatchEvent(event);
      fixture.detectChanges();

      expect(triggerInstance['resetActiveItem']).toHaveBeenCalled();
      expect(triggerInstance['closeKeyEventStream'].next).toHaveBeenCalled();
    });

    test(`should trigger an overlayRef resize when the viewport size changes`, fakeAsync(() => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const instance = getSelectionListInstance(fixture);
      instance.focusInput();
      instance.trigger.openPanel();
      fixture.detectChanges();
      instance.trigger.overlayRef!.updateSize = jest.fn();
      dispatchFakeEvent(window, 'resize');
      tick(1337); // Number from CDK overlay specs
      fixture.detectChanges();

      expect(instance.trigger.overlayRef!.updateSize).toHaveBeenCalledWith({ width: expect.any(Number) });
    }));
  });

  test(`should be able to clear all options programmatically`, fakeAsync(() => {
    const fixture = createComponent(testComponents.Seeded);
    fixture.componentInstance.allowDuplicates = true;
    fixture.detectChanges();
    let chips = getAllChipInstances(fixture);
    expect(chips.length).toEqual(1);
    let instance = getSelectionListInstance(fixture);
    instance.selectionListFormControl.setValue([]);
    tick(1000);
    fixture.detectChanges();
    chips = getAllChipInstances(fixture);
    expect(chips.length).toEqual(0);

    const input = getSelectionListInput(fixture);
    const states = fixture.componentInstance.states;
    typeInElement(states[5].name.substring(0, 2), input);
    tick(1000);
    fixture.detectChanges();

    const opt = getOptionElement(fixture, 0, 5);
    opt.click();
    tick(1000);
    fixture.detectChanges();

    chips = getAllChipInstances(fixture);
    expect(chips.length).toEqual(1);
    instance = getSelectionListInstance(fixture);
    expect(instance.selectionListFormControl.value).toEqual([states[5]]);
  }));

  describe(`clearPreviousSelectedOption`, () => {
    let fixture: ComponentFixture<testComponents.Seeded>;
    let trigger: TsSelectionListTriggerDirective;
    let options: TsOptionComponent[];

    beforeEach(() => {
      fixture = createComponent(testComponents.Seeded);
      fixture.componentInstance.setNewStates();
      fixture.detectChanges();
      const instance = getSelectionListInstance(fixture);
      trigger = instance.trigger;
      options = trigger.selectionListPanel.options.toArray();
      options[0].selected = true;
      options[1].selected = true;
      fixture.detectChanges();
    });

    test(`should deselect all options`, () => {
      let selected = getAllOptionInstances(fixture).filter(o => o.selected);
      expect(selected.length).toEqual(2);

      trigger['clearPreviousSelectedOption'](options[2]);
      selected = getAllOptionInstances(fixture).filter(o => o.selected);

      expect(selected.length).toEqual(0);
    });

    test(`should skip a passed in option`, () => {
      let selected = getAllOptionInstances(fixture).filter(o => o.selected);
      expect(selected.length).toEqual(2);

      trigger['clearPreviousSelectedOption'](options[1]);
      selected = getAllOptionInstances(fixture).filter(o => o.selected);

      expect(selected.length).toEqual(1);
    });
  });

  describe(`getConnectedElement`, () => {
    test(`should fall back to the elementRef if getConnectedOverlayOrigin returns nothing`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const instance = getSelectionListInstance(fixture);
      const trigger = instance.trigger;
      trigger['formField'] = undefined as any;

      expect(trigger['getConnectedElement']().nativeElement.classList).toContain('ts-selection-list-trigger');
    });
  });

  describe(`select and deselect should fall back to empty arrays if the control value isn't set`, () => {
    test(`should fallback to an array when selecting`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const instance = getSelectionListInstance(fixture);
      const item = {
        source: {} as any,
        option: { value: 'apple' } as any,
      };
      instance.selectionListFormControl.setValue(null);
      const actual = () => {
        instance.selectItem(item);
      };
      expect(actual).not.toThrowError();
    });

    test(`should fallback to an array when deselecting`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const instance = getSelectionListInstance(fixture);
      const item = {
        source: {} as any,
        option: { value: 'apple' } as any,
      } as any;
      instance.selectionListFormControl.setValue(null);
      const actual = () => {
        instance.deselectItem(item);
      };
      expect(actual).not.toThrowError();
    });
  });

  test(`should emit on backdrop clicks`, fakeAsync(() => {
    const fixture = createComponent(testComponents.BackdropClick);
    fixture.detectChanges();
    fixture.componentInstance.clicked = jest.fn();
    const trigger = getSelectionListTriggerElement(fixture);
    dispatchKeyboardEvent(trigger, 'keydown', KEYS.DOWN_ARROW);
    fixture.detectChanges();

    const backdrop = document.querySelector('.cdk-overlay-backdrop')! as HTMLElement;
    backdrop.click();
    tick(1000);
    fixture.detectChanges();

    expect(fixture.componentInstance.clicked).toHaveBeenCalled();
  }));

  // Note: Simply dispatching the arrow down key on the trigger repeatedly did not work
  test.todo(`should update panel scroll position when focusing an out-of-view option`);

  test(`should focus first option when the options collection changes`, fakeAsync(() => {
    const fixture = createComponent(testComponents.Basic);
    fixture.detectChanges();
    const instance = getSelectionListInstance(fixture);

    expect(instance.panel.keyManager.activeItemIndex).toEqual(-1);

    const input = getSelectionListInput(fixture);
    const states = fixture.componentInstance.states;
    const name = states[3].name.substring(0, 2);
    typeInElement(name, input);
    tick(1000);
    fixture.detectChanges();

    expect(instance.panel.keyManager.activeItemIndex).toEqual(0);
  }));

  // TODO: Not currently supported by Jest
  // Waiting for https://github.com/jsdom/jsdom/issues/317 to land
  test.todo(`should select all existing text when the input is focused`);

  describe(`should scroll populated item into view`, () => {
    test(`should have panel open with the preset value`, fakeAsync(() => {
      const fixture = createComponent(testComponents.SeededSingleSelect);
      fixture.detectChanges();
      const instance = getSelectionListInstance(fixture);
      instance.trigger.handleFocus();
      tick(1000);
      expect(instance.panel.keyManager.activeItemIndex).toEqual(6);
    }));
  });

  describe(`noValidationOrHint`, () => {
    test(`should not have validation or hint added if set to true`, () => {
      const fixture = createComponent(testComponents.NoValidationOrHint);
      fixture.detectChanges();
      const validationBlock = fixture.debugElement.query(By.css('.ts-form-field__subscript-wrapper'));

      expect(validationBlock).toBeFalsy();
    });
  });
});
