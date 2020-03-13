import { Type } from '@angular/core';
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
  createComponent as createComponentInner,
  createKeyboardEvent,
  dispatchEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  typeInElement,
} from '@terminus/ngx-tools/testing';
import { TsOptionModule } from '@terminus/ui/option';
import * as testComponents from '@terminus/ui/select/testing';
// eslint-disable-next-line no-duplicate-imports
import {
  createKeydownEvent,
  getAllOptionInstances,
  getFilterInputElement,
  getOptgroupElement,
  getOptionElement,
  getOptionInstance,
  getSelectElement,
  getSelectInstance,
  getSelectTriggerElement,
  openSelect,
} from '@terminus/ui/select/testing';

import { TsSelectModule } from './select.module';

/**
 * Create test component
 *
 * @param component
 */
function createComponent<T>(component: Type<T>): ComponentFixture<T> {
  const moduleImports = [
    FormsModule,
    ReactiveFormsModule,
    TsSelectModule,
    TsOptionModule,
    NoopAnimationsModule,
  ];

  return createComponentInner(component, undefined, moduleImports);
}

describe(`TsSelectComponent`, function() {
  test(`should exist`, function() {
    const fixture = createComponent(testComponents.Basic);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.ts-select'))).toBeTruthy();
  });

  /**
   * STANDARD SELECT MODE
   */
  describe(`standard select mode`, function() {
    test(`should select an option via the arrow key when in single select mode unless option is disabled`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      const event = createKeydownEvent(KEYS.DOWN_ARROW);
      trigger.dispatchEvent(event);

      const options = getAllOptionInstances(fixture);
      const option = options[0];
      const selected = getSelectInstance(fixture).selectionModel.selected;

      expect(selected.length).toEqual(1);
      expect(selected[0].viewValue).toEqual(option.viewValue);

      trigger.dispatchEvent(event);

      expect(selected.length).toEqual(1);
      expect(selected[0].viewValue).toEqual(option.viewValue);
      expect.assertions(4);
    });

    test(`should allow a value seeded by a FormControl`, done => {
      const fixture = createComponent(testComponents.SeededFormControl);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const selected = getSelectInstance(fixture).selectionModel.selected;

        expect(selected.length).toEqual(1);
        expect(selected[0].viewValue).toEqual('Florida');
        done();
      });
    });

    test(`should allow a value seeded by an ngModel`, async(() => {
      const fixture = createComponent(testComponents.SeededNgModel);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const selected = getSelectInstance(fixture).selectionModel.selected;

        expect(selected.length).toEqual(1);
        expect(selected[0].viewValue).toEqual('Florida');
      });
    }));

    test(`should fallback to a passed in value if no ngControl is used`, async(() => {
      const fixture = createComponent(testComponents.SeededFallbackValue);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const selected = getSelectInstance(fixture).selectionModel.selected;

        expect(selected.length).toEqual(1);
        expect(selected[0].viewValue).toEqual('Florida');
      });
    }));

    test(`should emit events for selections and changes`, () => {
      const fixture = createComponent<testComponents.SelectionChangeEventEmitters>(testComponents.SelectionChangeEventEmitters);
      fixture.detectChanges();
      fixture.componentInstance.selected = jest.fn();
      fixture.componentInstance.change = jest.fn();
      const trigger = getSelectTriggerElement(fixture);
      const event = createKeydownEvent(KEYS.DOWN_ARROW);
      trigger.dispatchEvent(event);

      // NOTE: Ideally we would verify what was passed through the emitter but doing so causes a memory error with Jest.
      expect(fixture.componentInstance.selected).toHaveBeenCalled();
      expect(fixture.componentInstance.change).toHaveBeenCalled();
    });

    test(`should support custom option template`, () => {
      const fixture = createComponent(testComponents.CustomOptionTemplate);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();

      const option = getOptionElement(fixture, 0, 1);

      expect(option.innerHTML).toEqual(expect.stringContaining('bar'));
    });

    test(`should support a custom trigger`, done => {
      const fixture = createComponent(testComponents.CustomOptionTemplate);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const trigger = getSelectTriggerElement(fixture);

        expect(trigger.innerHTML).toEqual(expect.stringContaining('My custom'));
        done();
      });
    });

    test(`should support custom 'blank' option choice`, () => {
      const fixture = createComponent(testComponents.CustomBlankOption);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const options = getAllOptionInstances(fixture);
      const option = options[0];

      expect(option.viewValue).toEqual('FOO');
    });

    test(`should style disabled and selected options`, fakeAsync(function() {
      const fixture = createComponent(testComponents.SeededFormControl);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      tick(1000);
      fixture.detectChanges();

      const disabledOption = getOptionElement(fixture, 0, 1);
      const activeOption = getOptionElement(fixture, 0, 4);
      expect(disabledOption.classList.contains('ts-option--disabled')).toEqual(true);
      expect(activeOption.classList.contains('ts-selected')).toEqual(true);
    }));

    test(`should support optgroups`, () => {
      const fixture = createComponent(testComponents.Optgroups);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const group = getOptgroupElement(fixture);
      const groupDisabled = getOptgroupElement(fixture, 0, 1);
      const label = group.querySelector('label');

      // Existence
      expect(group).toBeTruthy();
      // Role
      expect(group.getAttribute('role')).toEqual('group');
      // Labeledby
      expect(group.getAttribute('aria-labelledby')).toEqual(label?.id);
      // Disabled
      expect(groupDisabled.getAttribute('aria-disabled')).toEqual('true');
    });

    describe(`delimiter`, function() {
      test(`should allow custom delimiters`, fakeAsync(function() {
        const fixture = createComponent(testComponents.CustomDelimiter);
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          const trigger = getSelectTriggerElement(fixture);
          trigger.click();
          fixture.detectChanges();
          const valueSpan = trigger.querySelector('.ts-select-value-text');

          expect(valueSpan!.textContent!.trim()).toEqual('Florida- Texas');
        });
        expect.assertions(1);
      }));

      test(`should fall back to the default delimiter if a non-string value is passed in`, () => {
        const fixture = createComponent<testComponents.CustomDelimiter>(testComponents.CustomDelimiter);
        fixture.componentInstance.delimiter = 1 as any;
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          const trigger = getSelectTriggerElement(fixture);
          trigger.click();
          fixture.detectChanges();
          const valueSpan = trigger.querySelector('.ts-select-value-text');

          expect(valueSpan!.textContent!.trim()).toEqual('Florida, Texas');
        });
        expect.assertions(1);
      });
    });

    test(`should not open when disabled`, () => {
      const fixture = createComponent<testComponents.Disabled>(testComponents.Disabled);
      fixture.detectChanges();
      fixture.componentInstance.wasOpened = jest.fn();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      expect(fixture.componentInstance.wasOpened).not.toHaveBeenCalled();
      expect(instance.panelOpen).toEqual(false);
    });

    test(`should update when options change`, async(() => {
      const fixture = createComponent<testComponents.SelectOptionChange>(testComponents.SelectOptionChange);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        let selected = getSelectInstance(fixture).selectionModel.selected.map(v => v.viewValue);
        expect(selected).toEqual(['Florida', 'Texas']);

        fixture.componentInstance.updateOptions();
        selected = getSelectInstance(fixture).selectionModel.selected.map(v => v.viewValue);
        expect(selected).toEqual(['Florida', 'Texas']);
        expect.assertions(2);
      });
    }));

    // NOTE: This method is called from outside the component so we have to test by calling it directly
    test(`should set the disabled state when called`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);
      instance['changeDetectorRef'].markForCheck = jest.fn();
      instance.stateChanges.next = jest.fn();

      instance.setDisabledState(true);

      expect(instance['changeDetectorRef'].markForCheck).toHaveBeenCalled();
      expect(instance.stateChanges.next).toHaveBeenCalled();
      expect(instance.isDisabled).toEqual(true);
    });

    test(`should support a custom tabindex`, () => {
      const fixture = createComponent(testComponents.Tabindex);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);

      expect(trigger.getAttribute('tabindex')).toEqual('4');
    });

    describe(`open()`, function() {
      test(`should do nothing if disabled`, () => {
        const fixture = createComponent(testComponents.Basic);
        const instance = getSelectInstance(fixture);
        instance.isDisabled = true;
        fixture.detectChanges();
        instance.open();
        fixture.detectChanges();

        expect(instance.panelOpen).toEqual(false);
      });

      test(`should do nothing if no options exist`, () => {
        const fixture = createComponent<testComponents.Basic>(testComponents.Basic);
        fixture.componentInstance.options.length = 0;
        const instance = getSelectInstance(fixture);
        fixture.detectChanges();
        instance.open();
        fixture.detectChanges();

        expect(instance.panelOpen).toEqual(false);
      });

      test(`should do nothing if the panel is already open`, () => {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        instance.open();
        fixture.detectChanges();

        expect(instance.panelOpen).toEqual(true);

        instance['changeDetectorRef'].markForCheck = jest.fn();
        instance.open();
        fixture.detectChanges();

        expect(instance.panelOpen).toEqual(true);
        expect(instance['changeDetectorRef'].markForCheck).not.toHaveBeenCalled();
      });

      // TODO: getComputedStyle no longer seems to work
      // test(`should set the overlay element font size to match the trigger`, async(() => {
      //   const fixture = createComponent(testComponents.Basic);
      //   const instance = getSelectInstance(fixture);
      //   fixture.detectChanges();
      //   instance.trigger.nativeElement.style.fontSize = '5px';
      //
      //   instance.open();
      //   fixture.detectChanges();
      //
      //   fixture.whenStable().then(() => {
      //     expect(instance.panelOpen).toEqual(true);
      //     expect(instance.triggerFontSize).toEqual(5);
      //     expect(getComputedStyle(instance.overlayDir.overlayRef.overlayElement)['font-size']).toEqual('5px');
      //   });
      // }));
    });

    describe(`handleOpenKeydown`, function() {
      test(`should focus the first item if HOME is used`, () => {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        const element = getSelectElement(fixture);
        const options = getAllOptionInstances(fixture);
        instance.open();
        fixture.detectChanges();

        // Move down the list so that the first item is no longer focused
        dispatchKeyboardEvent(element, 'keydown', KEYS.DOWN_ARROW);
        dispatchKeyboardEvent(element, 'keydown', KEYS.DOWN_ARROW);
        fixture.detectChanges();

        const eventHome = dispatchKeyboardEvent(element, 'keydown', KEYS.HOME);
        fixture.detectChanges();

        expect(options[0].active).toEqual(true);
        expect(eventHome.defaultPrevented).toEqual(true);
      });

      test(`should focus the last item if END is used`, () => {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        const element = getSelectElement(fixture);
        const options = getAllOptionInstances(fixture);
        instance.open();
        fixture.detectChanges();
        const event = createKeydownEvent(KEYS.DOWN_ARROW);

        // Move down the list so that the first item is no longer focused
        element.dispatchEvent(event);
        element.dispatchEvent(event);
        fixture.detectChanges();

        const eventEnd = dispatchKeyboardEvent(element, 'keydown', KEYS.END);
        fixture.detectChanges();

        expect(options[options.length - 1].active).toEqual(true);
        expect(eventEnd.defaultPrevented).toEqual(true);
      });

      test(`should close the panel if ALT + ARROW is used`, () => {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        const element = getSelectElement(fixture);

        instance.open();
        fixture.detectChanges();

        expect(instance.panelOpen).toEqual(true);

        const event = createKeyboardEvent('keydown', KEYS.DOWN_ARROW);
        Object.defineProperty(event, 'altKey', { get: () => true });
        dispatchEvent(element, event);
        fixture.detectChanges();

        expect(instance.panelOpen).toEqual(false);
        expect(event.defaultPrevented).toEqual(true);
      });

      test(`should select an item if SPACE is used`, () => {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        const element = getSelectElement(fixture);
        instance.open();
        fixture.detectChanges();
        const event = createKeydownEvent(KEYS.DOWN_ARROW);

        // Move down the list so that the first item is no longer focused
        element.dispatchEvent(event);
        element.dispatchEvent(event);
        element.dispatchEvent(event);
        fixture.detectChanges();

        const eventSpace = dispatchKeyboardEvent(element, 'keydown', KEYS.SPACE);
        fixture.detectChanges();

        expect(instance.value).toEqual('California');
        expect(eventSpace.defaultPrevented).toEqual(true);
      });

      test(`should select an item if ENTER is used`, () => {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        const element = getSelectElement(fixture);
        instance.open();
        fixture.detectChanges();
        const eventDown = createKeydownEvent(KEYS.DOWN_ARROW);

        // Move down the list so that the first item is no longer focused
        element.dispatchEvent(eventDown);
        element.dispatchEvent(eventDown);
        element.dispatchEvent(eventDown);
        fixture.detectChanges();

        const event = dispatchKeyboardEvent(element, 'keydown', KEYS.ENTER);
        fixture.detectChanges();

        expect(instance.value).toEqual('California');
        expect(event.defaultPrevented).toEqual(true);
      });
    });
  });

  describe('with ngModel using compareWith', function() {
    describe('comparing by value', function() {
      test('should have a selection', async(() => {
        const fixture = createComponent(testComponents.CustomCompareFn);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          const selections = getSelectInstance(fixture).selectionModel.selected;
          expect(selections.length).toEqual(1);
          expect(selections[0].value.value).toEqual('pizza-1');
          expect.assertions(2);
        });
      }));

      test('should update when making a new selection', async(() => {
        const fixture = createComponent<testComponents.CustomCompareFn>(testComponents.CustomCompareFn);
        fixture.detectChanges();
        const options = getAllOptionInstances(fixture);

        getOptionInstance(fixture, 0, options.length - 1).selectViaInteraction();
        fixture.detectChanges();
        const getterValue = getSelectInstance(fixture).selected;
        const selectedOption = getterValue[0] ? getterValue[0] : getterValue;

        expect(fixture.componentInstance.selectedFood.value).toEqual('tacos-2');
        expect(selectedOption.value.value).toEqual('tacos-2');
      }));
    });

    describe('comparing by reference', function() {
      test('should initialize with no selection despite having a value', async(() => {
        const fixture = createComponent<testComponents.CustomCompareFn>(testComponents.CustomCompareFn);
        fixture.detectChanges();
        fixture.componentInstance.useCompareByReference();
        fixture.detectChanges();

        expect(fixture.componentInstance.selectedFood.value).toBe('pizza-1');
        expect(getSelectInstance(fixture).selected).toBeUndefined();
      }));

      test('should log a warning when using a non-function comparator', async(() => {
        const fixture = createComponent<testComponents.CustomCompareFn>(testComponents.CustomCompareFn);
        fixture.detectChanges();
        window.console.warn = jest.fn();
        fixture.componentInstance.useNullComparator();
        fixture.detectChanges();

        expect(window.console.warn).toHaveBeenCalledWith(expect.stringContaining('TsSelectComponent: '));
      }));
    });

    test(`should defer optionSelection stream if no options exist`, async(() => {
      const fixture = createComponent<testComponents.DeferOptionSelectionStream>(testComponents.DeferOptionSelectionStream);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      expect(instance.selected).toBeFalsy();

      fixture.componentInstance.updateOptions();
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(instance.selected).toBeTruthy();
        expect.assertions(2);
      });
    }));

    describe(`trigger`, function() {
      test(`should fallback to placeholder when empty`, () => {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const trigger = getSelectTriggerElement(fixture);
        getSelectInstance(fixture).placeholder = 'foo';
        fixture.detectChanges();

        expect(trigger.textContent?.trim()).toEqual('foo');
      });
    });
  });

  /**
   * MULTIPLE MODE
   */
  describe(`multi-select`, function() {
    /*
 *    test(`should toggle all enabled items when toggle all is clicked and show a selected count`, () => {
 *      jest.useFakeTimers();
 *      const fixture = createComponent(testComponents.OptgroupsMultiple);
 *      fixture.detectChanges();
 *      const trigger = getSelectTriggerElement(fixture);
 *      dispatchMouseEvent(trigger, 'click');
 *      fixture.detectChanges();
 *      const select = getSelectInstance(fixture);
 *
 *      expect(select.selectionModel.selected.length).toEqual(0);
 *
 *      const toggle = getToggleAllElement(fixture);
 *      dispatchMouseEvent(toggle, 'click');
 *      const group1 = getOptgroupElement(fixture)!;
 *      dispatchMouseEvent(group1, 'click');
 *      jest.advanceTimersByTime(1000);
 *      fixture.detectChanges();
 *
 *      expect(select.selectionModel.selected.length).toEqual(2);
 *
 *      let count = toggle.querySelector('.ts-select-panel__count');
 *      expect((count && count.textContent) ? count.textContent.trim() : '').toEqual('2 selected');
 *
 *      dispatchMouseEvent(toggle, 'click');
 *      fixture.detectChanges();
 *      expect(select.selectionModel.selected.length).toEqual(0);
 *
 *      count = toggle.querySelector('.ts-select-panel__count');
 *      expect(count).toBeNull();
 *      expect.assertions(5);
 *      jest.runAllTimers();
 *    });
 */

    describe(`handleOpenKeydown`, function() {
      test(`should select OR deselect all items with CTRL + A`, () => {
        const fixture = createComponent(testComponents.OptgroupsMultiple);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        const element = getSelectElement(fixture);
        openSelect(fixture);

        const event = createKeyboardEvent('keydown', KEYS.A, element);
        Object.defineProperty(event, 'ctrlKey', { get: () => true });
        dispatchEvent(element, event);
        fixture.detectChanges();

        // Only two items are not disabled or within a disabled group
        expect(instance.selectionModel.selected.length).toEqual(2);
        expect(event.defaultPrevented).toEqual(true);

        dispatchEvent(element, event);
        fixture.detectChanges();

        expect(instance.selectionModel.selected.length).toEqual(0);
      });

      test(`should select the next item with SHIFT+ARROW`, function() {
        const fixture = createComponent(testComponents.NoGroupsMultiple);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        const element = getSelectElement(fixture);
        instance.open();
        fixture.detectChanges();
        const eventDown = createKeydownEvent(KEYS.DOWN_ARROW);

        // Move focus past disabled item for testing ease
        element.dispatchEvent(eventDown);
        element.dispatchEvent(eventDown);
        element.dispatchEvent(eventDown);
        fixture.detectChanges();

        const event = createKeydownEvent(KEYS.DOWN_ARROW);
        Object.defineProperty(event, 'shiftKey', { get: () => true });

        element.dispatchEvent(event);
        fixture.detectChanges();

        expect(instance.value).toEqual(['Florida']);

        const event2 = createKeyboardEvent('keydown', KEYS.UP_ARROW);
        Object.defineProperty(event2, 'shiftKey', { get: () => true });
        element.dispatchEvent(event2);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(instance.value).toEqual(['Florida', 'California']);
        });
      });
    });

    describe(`optgroup`, function() {
      test(`should toggle all child options if not disabled`, () => {
        const fixture = createComponent(testComponents.OptgroupsMultiple);
        fixture.detectChanges();
        const trigger = getSelectTriggerElement(fixture);
        dispatchMouseEvent(trigger, 'click');
        fixture.detectChanges();
        const group = getOptgroupElement(fixture);
        const select = getSelectInstance(fixture);
        const label = group.querySelector('label');

        expect(select.selectionModel.selected.length).toEqual(0);

        dispatchMouseEvent(label as Node, 'click');
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(select.selectionModel.selected.length).toEqual(2);
        });
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
      const trigger = getSelectTriggerElement(fixture);

      expect(trigger.getAttribute('id')).toEqual('foo');
    });

    test(`should fall back to the UID if no ID is passed in`, () => {
      const fixture = createComponent<testComponents.Id>(testComponents.Id);
      fixture.componentInstance.myId = undefined as any;
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);

      expect(trigger.getAttribute('id')).toEqual(expect.stringContaining('ts-select-'));
    });
  });

  describe(`label`, function() {
    test(`should support a custom label`, () => {
      const fixture = createComponent(testComponents.Label);
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('.ts-form-field__label'));

      expect(label.nativeElement.textContent.trim()).toEqual('foo bar');
    });

    test(`should trigger change detection and alert consumers when the label is changed`, () => {
      const fixture = createComponent<testComponents.Label>(testComponents.Label);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);
      instance['changeDetectorRef'].detectChanges = jest.fn();
      instance.labelChanges.next = jest.fn();

      fixture.componentInstance.myLabel = 'bing baz';
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.ts-form-field__label'));

      expect(label.nativeElement.textContent.trim()).toEqual('bing baz');
      expect(instance['changeDetectorRef'].detectChanges).toHaveBeenCalled();
      expect(instance.labelChanges.next).toHaveBeenCalled();
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
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      trigger.click();
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

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
      const instance = getSelectInstance(fixture);
      const trigger = getSelectTriggerElement(fixture);

      expect(fixture.componentInstance.myCtrl.value).toEqual('bar');

      const option = getOptionElement(fixture, 0, 1);
      option.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.myCtrl.value).toBeNull();
      expect(instance.selected).toBeFalsy();
      expect(trigger.textContent).not.toContain('Null');
    });
  });

  describe(`keyManager`, function() {
    test(`should close the panel and focus the select if the user TABs out`, () => {
      // NOTE: `dispatchKeyboardEvent` suddenly stopped working for this test during the Angular v8 upgrade
      const event = document.createEvent('KeyboardEvent');
      event.initEvent('keydown', true, false);
      Object.defineProperties(event, {
        keyCode: { get: () => KEYS.TAB.keyCode },
        key: { get: () => KEYS.TAB.code },
      });

      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);
      const element = getSelectElement(fixture);

      instance.focus = jest.fn();
      instance.open();
      fixture.detectChanges();

      expect(instance.panelOpen).toEqual(true);

      element.dispatchEvent(event);
      fixture.detectChanges();

      expect(instance.panelOpen).toEqual(false);
      expect(instance.focus).toHaveBeenCalled();
      expect.assertions(3);
    });
  });

  describe(`propogateChanges`, function() {
    test(`should use fallback value if the option has no value`, () => {
      const fixture = createComponent<testComponents.Basic>(testComponents.Basic);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);
      fixture.componentInstance.change = jest.fn();

      instance['propagateChanges']('foo');
      fixture.detectChanges();

      expect(fixture.componentInstance.change).toHaveBeenCalledWith(expect.objectContaining({ value: 'foo' }));
    });
  });

  describe(`getPanelScrollTop`, function() {
    test(`should fallback to 0 if the panel is not found`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);
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

    describe(`checkbox`, function() {
      test(`should have checkbox in front of each option item`, fakeAsync(() => {
        const fixture = createComponent(testComponents.OptgroupsMultiple);
        fixture.detectChanges();

        fixture.detectChanges();
        const opt = getOptionElement(fixture, 0, 1);
        expect(opt.querySelector('ts-checkbox')).toBeTruthy();
      }));
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

      test(`should return if isDisabled true`, () => {
        const fixture = createComponent(testComponents.Basic);
        getSelectInstance(fixture).isDisabled = true;
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 0, 1);
        const event = createKeyboardEvent('keydown', KEYS.ENTER);
        const instance = getSelectInstance(fixture);
        option.selectViaInteraction = jest.fn();
        instance.open = jest.fn();

        instance.handleKeydown(event);
        expect(option.selectViaInteraction).not.toHaveBeenCalled();
      });

      test(`should open the panel if allow multiple`, () => {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 0, 1);
        const event = createKeyboardEvent('keydown', KEYS.ENTER);
        const instance = getSelectInstance(fixture);
        option.selectViaInteraction = jest.fn();
        instance.open = jest.fn();

        instance.handleKeydown(event);
        expect(instance.open).toHaveBeenCalled();
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
  });

  describe(`optgroup`, function() {
    test(`should support a custom ID`, () => {
      const fixture = createComponent(testComponents.OptgroupIDs);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const group = getOptgroupElement(fixture);

      expect(group.getAttribute('id')).toEqual('Group A');
    });

    test(`should fall back to the UID if no valid ID is passed in`, () => {
      const fixture = createComponent(testComponents.OptgroupBadIDs);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const group = getOptgroupElement(fixture);

      expect(group.getAttribute('id')).toEqual(expect.stringContaining('ts-select-optgroup-'));
    });
  });

  describe(`trigger`, function() {
    test(`should support a custom ID`, () => {
      const fixture = createComponent(testComponents.CustomTrigger);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      expect(instance.customTrigger?.id).toEqual('foo');
    });

    test(`should fall back to the UID if no valid ID is passed in`, () => {
      const fixture = createComponent<testComponents.CustomTrigger>(testComponents.CustomTrigger);
      fixture.detectChanges();
      fixture.componentInstance.myId = undefined as any;
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      expect(instance.customTrigger?.id).toEqual(expect.stringContaining('ts-select-trigger-'));
    });
  });

  describe(`Select Panel`, function() {
    test(`should close with esc or alt+up`, () => {
      // NOTE: `dispatchKeyboardEvent` suddenly stopped working for this test during the Angular v8 upgrade
      const event = document.createEvent('KeyboardEvent');
      event.initEvent('keydown', true, false);
      Object.defineProperties(event, {
        keyCode: { get: () => KEYS.ESCAPE.keyCode },
        key: { get: () => KEYS.ESCAPE.code },
      });

      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      expect(instance.panelOpen).toEqual(true);

      trigger.dispatchEvent(event);
      fixture.detectChanges();

      expect(instance.panelOpen).toEqual(false);
    });

    test(`should close with alt+up or alt+down`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      // open
      expect(instance.panelOpen).toEqual(true);

      let event = createKeyboardEvent('keydown', KEYS.DOWN_ARROW);
      Object.defineProperty(event, 'altKey', { get: () => true });
      dispatchEvent(getSelectElement(fixture), event);
      fixture.detectChanges();

      // closed
      expect(instance.panelOpen).toEqual(false);

      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();

      // open again
      expect(instance.panelOpen).toEqual(true);

      event = createKeyboardEvent('keydown', KEYS.UP_ARROW);
      Object.defineProperty(event, 'altKey', { get: () => true });
      dispatchEvent(getSelectElement(fixture), event);
      fixture.detectChanges();

      // closed again
      expect(instance.panelOpen).toEqual(false);
      expect.assertions(4);
    });
  });

  describe('isFilterable', function() {
    test(`should filter options`, () => {
      const fixture = createComponent<testComponents.Filterable>(testComponents.Filterable);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      // open
      expect(instance.panelOpen).toEqual(true);

      const input = getFilterInputElement(fixture);
      const options = getAllOptionInstances(fixture);

      expect(options.length).toBe(fixture.componentInstance.options.length);

      typeInElement('geo', input);
      expect(fixture.componentInstance.options.length).toBe(0);

      typeInElement('', input);
      expect(fixture.componentInstance.options.length).toBe(options.length);

      typeInElement('arizona', input);
      expect(fixture.componentInstance.options.length).toBe(3);
      expect.assertions(5);
    });

    test('should allow space as part of filter and not select an option', () => {
      const fixture = createComponent<testComponents.Filterable>(testComponents.Filterable);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      expect(instance.panelOpen).toEqual(true);

      const input = getFilterInputElement(fixture);
      const options = getAllOptionInstances(fixture);

      expect(options.length).toBe(fixture.componentInstance.options.length);

      typeInElement('something', input);
      dispatchKeyboardEvent(input, 'keydown', KEYS.SPACE, input);
      expect(fixture.componentInstance.options.length).toBe(0);
      expect.assertions(3);
    });
  });

  describe(`allow refresh requests`, function() {
    test(`should show the refresh trigger and emit the event on selection`, function() {
      const fixture = createComponent<testComponents.TriggerRefresh>(testComponents.TriggerRefresh);
      fixture.detectChanges();
      openSelect(fixture);

      const refreshTrigger = fixture.debugElement.query(By.css('.ts-select-panel__refresh'));
      expect(refreshTrigger).toBeTruthy();
      expect(fixture.componentInstance.hasRequested).toEqual(false);

      refreshTrigger.nativeElement.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.hasRequested).toEqual(true);
    });
  });

  describe(`showRefineSearchMessage`, function() {
    test(`should not show the message by default`, function() {
      const fixture = createComponent(testComponents.Basic);
      const refineDom = fixture.debugElement.query(By.css('.ts-select-panel__refine'));

      expect(refineDom).toBeFalsy();
    });

    test(`should show the message with a count if defined`, function() {
      const fixture = createComponent<testComponents.TooManyResults>(testComponents.TooManyResults);
      fixture.detectChanges();
      openSelect(fixture);

      let refineDom = fixture.debugElement.query(By.css('.ts-select-panel__refine'));
      expect(refineDom.nativeElement.textContent.trim()).toEqual('Narrow your search to reveal hidden results.');

      fixture.componentInstance.total = 99;
      fixture.detectChanges();

      refineDom = fixture.debugElement.query(By.css('.ts-select-panel__refine'));
      expect(refineDom.nativeElement.textContent.trim()).toEqual('Narrow your search to reveal 99 hidden results.');
    });
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
