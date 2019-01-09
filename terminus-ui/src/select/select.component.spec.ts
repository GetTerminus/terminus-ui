// tslint:disable: no-non-null-assertion
import {
  Provider,
  Type,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  createFakeEvent,
  createKeyboardEvent,
  dispatchEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  typeInElement,
} from '@terminus/ngx-tools/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import {
  A,
  BACKSPACE,
  DOWN_ARROW,
  END,
  ENTER,
  ESCAPE,
  HOME,
  SPACE,
  TAB,
  UP_ARROW,
} from '@terminus/ngx-tools/keycodes';

import * as testComponents from './testing/test-components';
import {
  getAllChipInstances,
  getAllOptionInstances,
  getAutocompleteInput,
  getChipElement,
  getFilterInputElement,
  getOptgroupElement,
  getOptionElement,
  getOptionInstance,
  getSelectElement,
  getSelectInstance,
  getSelectTriggerElement,
  getToggleAllElement,
} from './testing/test-helpers';
import { TsSelectOptionComponent } from './option/option.component';
import { TsSelectModule } from './select.module';




describe(`TsSelectComponent`, () => {

  test(`should exist`, () => {
    const fixture = createComponent(testComponents.Basic);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.ts-select'))).toBeTruthy();
  });


  /**
   * STANDARD SELECT MODE
   */
  describe(`standard select mode`, () => {

    test(`should select an option via the arrow key when in single select mode unless option is disabled`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW);

      const options = getAllOptionInstances(fixture);
      const option = options[0];
      const selected = getSelectInstance(fixture).selectionModel.selected;

      expect(selected.length).toEqual(1);
      expect(selected[0].viewValue).toEqual(option.viewValue);

      dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW);

      expect(selected.length).toEqual(1);
      expect(selected[0].viewValue).toEqual(option.viewValue);
      expect.assertions(4);
    });


    test(`should allow a value seeded by a FormControl`, (done) => {
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
      const fixture = createComponent(testComponents.SelectionChangeEventEmitters);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);

      dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW);

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

      const option = getOptionElement(fixture, 1)!;

      expect(option.innerHTML).toEqual(expect.stringContaining('bar'));
    });


    test(`should support a custom trigger`, (done) => {
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


    test(`should style disabled and selected options`, () => {
      const fixture = createComponent(testComponents.SeededFormControl);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const disabledOption = getOptionElement(fixture, 1)!;
      const activeOption = getOptionElement(fixture, 4)!;

      expect(disabledOption.classList.contains('ts-select-option--disabled')).toEqual(true);
      expect(activeOption.classList.contains('ts-selected')).toEqual(true);
    });


    test(`should support optgroups`, () => {
      const fixture = createComponent(testComponents.Optgroups);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const group = getOptgroupElement(fixture)!;
      const groupDisabled = getOptgroupElement(fixture, 1)!;
      const label = group.querySelector('label')!;

      // Existence
      expect(group).toBeTruthy();
      // Role
      expect(group.getAttribute('role')).toEqual('group');
      // Labeledby
      expect(group.getAttribute('aria-labelledby')).toEqual(label.id);
      // Disabled
      expect(groupDisabled.getAttribute('aria-disabled')).toEqual('true');
    });


    describe(`delimiter`, () => {

      test(`should allow custom delimiters`, () => {
        const fixture = createComponent(testComponents.CustomDelimiter);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          const trigger = getSelectTriggerElement(fixture);
          const valueSpan = trigger.querySelector('.ts-select-value-text')!;

          expect(valueSpan.textContent).toEqual('Florida- Texas');
        });
      });


      test(`should fall back to the default delimiter if a non-string value is passed in`, () => {
        const fixture = createComponent(testComponents.CustomDelimiter);
        fixture.componentInstance.delimiter = 1 as any;
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          const trigger = getSelectTriggerElement(fixture);
          const valueSpan = trigger.querySelector('.ts-select-value-text')!;

          expect(valueSpan.textContent).toEqual('Florida, Texas');
        });
      });

    });


    test(`should not open when disabled`, () => {
      const fixture = createComponent(testComponents.Disabled);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      expect(fixture.componentInstance.wasOpened).not.toHaveBeenCalled();
      expect(instance.panelOpen).toEqual(false);
    });


    test(`should update when options change`, async(() => {
      const fixture = createComponent(testComponents.SelectOptionChange);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        let selected = getSelectInstance(fixture).selectionModel.selected.map((v) => {
          return v.viewValue;
        });
        expect(selected).toEqual(['Florida', 'Texas']);

        fixture.componentInstance.updateOptions();
        selected = getSelectInstance(fixture).selectionModel.selected.map((v) => {
          return v.viewValue;
        });
        expect(selected).toEqual(['Florida', 'Texas']);
        expect.assertions(2);
      });
    }));


    /**
     * NOTE: This method is called from outside the component so we have to test by calling it directly
     */
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


    describe(`open()`, () => {

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
        const fixture = createComponent(testComponents.Basic);
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


      test(`should set the overlay element font size to match the trigger`, async(() => {
        const fixture = createComponent(testComponents.Basic);
        const instance = getSelectInstance(fixture);
        fixture.detectChanges();
        instance.trigger.nativeElement.style.fontSize = '5px';

        instance.open();
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(instance.panelOpen).toEqual(true);
          expect(instance.triggerFontSize).toEqual(5);
          expect(getComputedStyle(instance.overlayDir.overlayRef.overlayElement)['font-size']).toEqual('5px');
        });
      }));

    });


    describe(`handleOpenKeydown`, () => {

      test(`should focus the first item if HOME is used`, () => {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        const element = getSelectElement(fixture);
        const options = getAllOptionInstances(fixture);
        instance.open();
        fixture.detectChanges();

        // Move down the list so that the first item is no longer focused
        dispatchKeyboardEvent(element, 'keydown', DOWN_ARROW);
        dispatchKeyboardEvent(element, 'keydown', DOWN_ARROW);
        fixture.detectChanges();

        const event = dispatchKeyboardEvent(element, 'keydown', HOME);
        fixture.detectChanges();

        expect(options[0].active).toEqual(true);
        expect(event.defaultPrevented).toEqual(true);
      });


      test(`should focus the last item if END is used`, () => {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        const element = getSelectElement(fixture);
        const options = getAllOptionInstances(fixture);
        instance.open();
        fixture.detectChanges();

        // Move down the list so that the first item is no longer focused
        dispatchKeyboardEvent(element, 'keydown', DOWN_ARROW);
        dispatchKeyboardEvent(element, 'keydown', DOWN_ARROW);
        fixture.detectChanges();

        const event = dispatchKeyboardEvent(element, 'keydown', END);
        fixture.detectChanges();

        expect(options[options.length - 1].active).toEqual(true);
        expect(event.defaultPrevented).toEqual(true);
      });


      test(`should close the panel if ALT + ARROW is used`, () => {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        const element = getSelectElement(fixture);

        instance.open();
        fixture.detectChanges();

        expect(instance.panelOpen).toEqual(true);

        const event = createKeyboardEvent('keydown', DOWN_ARROW);
        Object.defineProperty(event, 'altKey', {get: () => true});
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

        // Move down the list so that the first item is no longer focused
        dispatchKeyboardEvent(element, 'keydown', DOWN_ARROW);
        dispatchKeyboardEvent(element, 'keydown', DOWN_ARROW);
        dispatchKeyboardEvent(element, 'keydown', DOWN_ARROW);
        fixture.detectChanges();

        const event = dispatchKeyboardEvent(element, 'keydown', SPACE);
        fixture.detectChanges();

        expect(instance.value).toEqual('California');
        expect(event.defaultPrevented).toEqual(true);
      });


      test(`should select an item if ENTER is used`, () => {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        const element = getSelectElement(fixture);
        instance.open();
        fixture.detectChanges();

        // Move down the list so that the first item is no longer focused
        dispatchKeyboardEvent(element, 'keydown', DOWN_ARROW);
        dispatchKeyboardEvent(element, 'keydown', DOWN_ARROW);
        dispatchKeyboardEvent(element, 'keydown', DOWN_ARROW);
        fixture.detectChanges();

        const event = dispatchKeyboardEvent(element, 'keydown', ENTER);
        fixture.detectChanges();

        expect(instance.value).toEqual('California');
        expect(event.defaultPrevented).toEqual(true);
      });

    });

  });


  describe('with ngModel using compareWith', () => {

    describe('comparing by value', () => {

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
        const fixture = createComponent(testComponents.CustomCompareFn);
        fixture.detectChanges();
        const options = getAllOptionInstances(fixture);

        getOptionInstance(fixture, options.length - 1).selectViaInteraction();
        fixture.detectChanges();
        const selectedOption = getSelectInstance(fixture).selected as TsSelectOptionComponent;

        expect(fixture.componentInstance.selectedFood.value).toEqual('tacos-2');
        expect(selectedOption.value.value).toEqual('tacos-2');
      }));

    });


    describe('comparing by reference', () => {

      test('should initialize with no selection despite having a value', async(() => {
        const fixture = createComponent(testComponents.CustomCompareFn);
        fixture.detectChanges();
        fixture.componentInstance.useCompareByReference();
        fixture.detectChanges();

        expect(fixture.componentInstance.selectedFood.value).toBe('pizza-1');
        expect(getSelectInstance(fixture).selected).toBeUndefined();
      }));


      test('should log a warning when using a non-function comparator', async(() => {
        const fixture = createComponent(testComponents.CustomCompareFn);
        fixture.detectChanges();
        window.console.warn = jest.fn();
        fixture.componentInstance.useNullComparator();
        fixture.detectChanges();

        expect(window.console.warn).toHaveBeenCalledWith(expect.stringContaining('TsSelectComponent: '));
      }));

    });


    test(`should defer optionSelection stream if no options exist`, async(() => {
      const fixture = createComponent(testComponents.DeferOptionSelectionStream);
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


    describe(`trigger`, () => {

      test(`should fallback to placeholder when empty`, () => {
        const fixture = createComponent(testComponents.Basic);
        fixture.detectChanges();
        const trigger = getSelectTriggerElement(fixture);
        getSelectInstance(fixture).placeholder = 'foo';
        fixture.detectChanges();

        expect(trigger.textContent!.trim()).toEqual('foo');
      });

    });

  });


  /**
   * MULTIPLE MODE
   */
  describe(`multi-select`, () => {

    test(`should toggle all enabled items when toggle all is clicked and show a selected count`, () => {
      const fixture = createComponent(testComponents.OptgroupsMultiple);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const select = getSelectInstance(fixture);

      expect(select.selectionModel.selected.length).toEqual(0);

      const toggle = getToggleAllElement(fixture);
      dispatchMouseEvent(toggle, 'click');

      expect(select.selectionModel.selected.length).toEqual(2);

      let count = toggle.querySelector('.ts-select-panel__count');
      expect((count && count.textContent) ? count.textContent.trim() : '').toEqual('2 selected');

      dispatchMouseEvent(toggle, 'click');
      fixture.detectChanges();
      expect(select.selectionModel.selected.length).toEqual(0);

      count = toggle.querySelector('.ts-select-panel__count');
      expect(count).toBeNull();
      expect.assertions(5);
    });


    describe(`handleOpenKeydown`, () => {

      test(`should select OR deselect all items with CTRL + A`, () => {
        const fixture = createComponent(testComponents.OptgroupsMultiple);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        const element = getSelectElement(fixture);
        instance.open();
        fixture.detectChanges();

        const event = createKeyboardEvent('keydown', A, element);
        Object.defineProperty(event, 'ctrlKey', {get: () => true});
        dispatchEvent(element, event);
        fixture.detectChanges();

        // Only two items are not disabled or within a disabled group
        expect(instance.selectionModel.selected.length).toEqual(2);
        expect(event.defaultPrevented).toEqual(true);

        dispatchEvent(element, event);
        fixture.detectChanges();

        expect(instance.selectionModel.selected.length).toEqual(0);
      });


      test(`should select the next item with SHIFT+ARROW`, () => {
        const fixture = createComponent(testComponents.NoGroupsMultiple);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        const element = getSelectElement(fixture);
        instance.open();
        fixture.detectChanges();

        // Move focus past disabled item for testing ease
        dispatchKeyboardEvent(element, 'keydown', DOWN_ARROW);
        dispatchKeyboardEvent(element, 'keydown', DOWN_ARROW);
        dispatchKeyboardEvent(element, 'keydown', DOWN_ARROW);
        fixture.detectChanges();

        const event = createKeyboardEvent('keydown', DOWN_ARROW);
        Object.defineProperty(event, 'shiftKey', {get: () => true});

        dispatchEvent(element, event);
        fixture.detectChanges();

        expect(instance.value).toEqual(['Florida']);
      });

    });


    describe(`optgroup`, () => {

      test(`should toggle all child options if not disabled`, () => {
        const fixture = createComponent(testComponents.OptgroupsMultiple);
        fixture.detectChanges();
        const trigger = getSelectTriggerElement(fixture);
        dispatchMouseEvent(trigger, 'click');
        fixture.detectChanges();
        const group = getOptgroupElement(fixture)!;
        const select = getSelectInstance(fixture);
        const label = group.querySelector('label')!;

        expect(select.selectionModel.selected.length).toBeFalsy();

        dispatchMouseEvent(label, 'click');

        expect(select.selectionModel.selected.length).toEqual(2);
      });

    });

  });


  /**
   * AUTOCOMPLETE
   */
  describe(`autocomplete`, () => {

    test(`should show a progress indicator`, () => {
      jest.useFakeTimers();
      const fixture = createComponent(testComponents.Autocomplete);
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
      const fixture = createComponent(testComponents.Autocomplete);
      fixture.componentInstance.disabled = true;
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      const instance = getSelectInstance(fixture);

      expect(instance.panelOpen).toEqual(false);

      dispatchKeyboardEvent(trigger, 'keydown', DOWN_ARROW);

      expect(instance.panelOpen).toEqual(false);
    });


    describe(`chips`, () => {

      test(`should show selections as chips`, () => {
        const fixture = createComponent(testComponents.SeededAutocomplete);
        fixture.detectChanges();

        const chip = getChipElement(fixture, 0);

        expect(chip).toBeTruthy();
      });


      test(`should allow chips to be removed`, () => {
        const fixture = createComponent(testComponents.SeededAutocomplete);
        fixture.detectChanges();

        let chips = getAllChipInstances(fixture)!;
        expect(chips.length).toEqual(1);

        const chip = getChipElement(fixture)!;
        const chipRemovalButton = chip.querySelector('.mat-chip-remove')!;
        const instance = getSelectInstance(fixture);

        // Open the panel so that overlayRef is created
        instance.autocompleteTrigger.handleFocus();
        instance.autocompleteTrigger.overlayRef.updatePosition = jest.fn();

        dispatchMouseEvent(chipRemovalButton, 'click');
        fixture.detectChanges();

        chips = getAllChipInstances(fixture)!;
        expect(chips.length).toEqual(0);

        const input = getAutocompleteInput(fixture);
        expect(document.activeElement).toEqual(input);

        expect(instance.autocompleteTrigger.overlayRef.updatePosition).toHaveBeenCalled();
      });


      test(`should allow removal with the backspace key`, () => {
        jest.useFakeTimers();
        const fixture = createComponent(testComponents.SeededAutocomplete);
        fixture.detectChanges();

        let chips = getAllChipInstances(fixture)!;
        expect(chips.length).toEqual(1);

        const chip = getChipElement(fixture)!;
        // The first backspace selects the previous chip
        dispatchKeyboardEvent(chip, 'keydown', BACKSPACE);
        jest.advanceTimersByTime(250);
        dispatchKeyboardEvent(chip, 'keydown', BACKSPACE);
        fixture.detectChanges();

        chips = getAllChipInstances(fixture)!;
        expect(chips.length).toEqual(0);
      });

    });


    describe(`debounce`, () => {

      test(`should debounce the stream`, () => {
        jest.useFakeTimers();
        const fixture = createComponent(testComponents.Debounce);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);

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
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);

        instance.querySubject.next('ab');
        jest.advanceTimersByTime(1);
        instance.querySubject.next('abc');
        jest.advanceTimersByTime(1);
        instance.querySubject.next('abcd');
        jest.runAllTimers();

        expect(fixture.componentInstance.change).toHaveBeenCalledTimes(3);
      });

    });


    describe(`minimumCharacters`, () => {

      test(`should only emit query once past the minimum character count`, () => {
        jest.useFakeTimers();
        const fixture = createComponent(testComponents.CustomCharacterCount);
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);

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
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);

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


    test(`should only allow unique queries`, () => {
      jest.useFakeTimers();
      const fixture = createComponent(testComponents.Debounce);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      instance.querySubject.next('ab');
      jest.advanceTimersByTime(1);
      instance.querySubject.next('ab');
      jest.advanceTimersByTime(1);
      instance.querySubject.next('ab');
      jest.runAllTimers();

      expect(fixture.componentInstance.change).toHaveBeenCalledTimes(1);
    });


    describe(`duplicate selections`, () => {

      /**
       * NOTE: Even though we are simulating a typed query, the list of states is not changing.
       */
      test(`should not be allowed by default but should emit an event`, () => {
        const fixture = createComponent(testComponents.SeededAutocomplete);
        fixture.detectChanges();

        let chips = getAllChipInstances(fixture)!;
        expect(chips.length).toEqual(1);

        const input = getAutocompleteInput(fixture)!;
        typeInElement('fl', input!);
        fixture.detectChanges();

        // move down to Florida and try to select it
        dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
        dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
        dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
        dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
        dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
        dispatchKeyboardEvent(input, 'keydown', ENTER);
        fixture.detectChanges();

        // Verify the selection did NOT work
        chips = getAllChipInstances(fixture)!;
        expect(chips.length).toEqual(1);
        expect(fixture.componentInstance.duplicate).toHaveBeenCalledWith('Florida');

        expect.assertions(3);
      });


      describe(`when allowed`, () => {

        test(`should allow a duplicate selection`, () => {
          const fixture = createComponent(testComponents.SeededAutocomplete);
          fixture.componentInstance.allowDuplicates = true;
          fixture.detectChanges();

          let chips = getAllChipInstances(fixture)!;
          expect(chips.length).toEqual(1);

          const input = getAutocompleteInput(fixture)!;
          typeInElement('fl', input!);
          fixture.detectChanges();

          // move down to Florida and try to select it
          dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
          dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
          dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
          dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
          dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
          dispatchKeyboardEvent(input, 'keydown', ENTER);
          fixture.detectChanges();

          // Verify the selection DID work
          chips = getAllChipInstances(fixture)!;
          expect(chips.length).toEqual(2);
          expect(getSelectInstance(fixture).autocompleteSelections).toEqual(['Florida', 'Florida']);

          expect.assertions(3);
        });

      });

    });


    describe(`trigger`, () => {

      describe(`in single selection mode`, () => {

        test(`should set single value`, () => {
          const fixture = createComponent(testComponents.SeededAutocomplete);
          fixture.componentInstance.allowMultiple = false;
          fixture.componentInstance.keepOpen = false;
          fixture.detectChanges();
          const instance = getSelectInstance(fixture);
          const input = getAutocompleteInput(fixture)!;

          typeInElement('fl', input);
          fixture.detectChanges();

          dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
          dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
          dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
          dispatchKeyboardEvent(input, 'keydown', ENTER);
          fixture.detectChanges();

          expect(instance.autocompleteFormControl.value).toEqual(['Arkansas']);
        });

      });

    });


    test(`should reset the query when a selection is made`, () => {
      const fixture = createComponent(testComponents.AutocompleteAllowMultipleNoReopen);
      fixture.detectChanges();

      const input = getAutocompleteInput(fixture)!;
      typeInElement('fl', input);
      fixture.detectChanges();

      expect(input.value).toEqual('fl');

      // move down to Florida and try to select it
      dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
      dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
      dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
      dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
      dispatchKeyboardEvent(input, 'keydown', DOWN_ARROW);
      dispatchKeyboardEvent(input, 'keydown', ENTER);
      fixture.detectChanges();

      expect(input.value).toEqual('');
    });


    test(`should support a custom tabindex`, () => {
      const fixture = createComponent(testComponents.Tabindex);
      fixture.componentInstance.autocomplete = true;
      fixture.detectChanges();
      const input = getAutocompleteInput(fixture);

      expect(input.getAttribute('tabindex')).toEqual('4');
    });


    test(`should seed the autocomplete model(s) after timeout when using ngModel`, fakeAsync(() => {
      const fixture = createComponent(testComponents.SeededNgModelAutocomplete);
      fixture.detectChanges();

      tick(1000);
      fixture.detectChanges();

      const instance = getSelectInstance(fixture);
      expect(instance.autocompleteFormControl.value).toEqual(['Florida']);
      expect(instance.autocompleteSelections).toEqual(['Florida']);
    }));


    test(`should close the panel if open when getting a blur event that isn't from a selection`, () => {
      const fixture = createComponent(testComponents.Autocomplete);
      fixture.componentInstance.disabled = true;
      fixture.detectChanges();
      const input = getAutocompleteInput(fixture);
      const instance = getSelectInstance(fixture);
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


    test(`should update the overlay position when a chip is removed`, () => {
      jest.useFakeTimers();
      const fixture = createComponent(testComponents.SeededAutocomplete);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);
      const triggerInstance = instance.autocompleteTrigger;
      const chip = getChipElement(fixture)!;
      const chipRemovalButton = chip.querySelector('.mat-chip-remove')!;

      triggerInstance.openPanel();
      fixture.detectChanges();
      instance.autocompleteTrigger.overlayRef.updatePosition = jest.fn();

      dispatchMouseEvent(chipRemovalButton, 'click');
      jest.advanceTimersByTime(1000);
      fixture.detectChanges();

      expect(instance.autocompleteTrigger.overlayRef.updatePosition).toHaveBeenCalled();
      jest.runAllTimers();
    });


    describe(`panel`, () => {

      test(`should support a custom ID`, () => {
        const fixture = createComponent(testComponents.Autocomplete);
        fixture.componentInstance.disabled = true;
        fixture.detectChanges();
        const instance = getSelectInstance(fixture);
        instance.autocompleteTrigger.openPanel();
        fixture.detectChanges();
        const panel = fixture.debugElement.query(By.css('.ts-autocomplete-panel__inner')).nativeElement as HTMLElement;

        expect(instance.autocompletePanel.isOpen).toEqual(true);
        expect(panel.getAttribute('id')).toEqual(expect.stringContaining('-panel'));
      });

    });

  });


  test(`should be able to hide the required marker`, () => {
    const fixture = createComponent(testComponents.HideRequired);
    fixture.detectChanges();
    let marker = fixture.debugElement.query(By.css('.ts-form-field-required-marker'));
    expect(marker).toBeTruthy();

    fixture.componentInstance.hideRequired = true;
    fixture.detectChanges();

    marker = fixture.debugElement.query(By.css('.ts-form-field-required-marker'));
    expect(marker).toBeFalsy();
  });


  test(`should support a custom hint`, () => {
    const fixture = createComponent(testComponents.Hint);
    fixture.detectChanges();
    const hintElement = fixture.debugElement.query(By.css('.ts-form-field__hint-wrapper'));
    const contents = fixture.debugElement.query(By.css('.c-input__hint'));

    expect(hintElement).toBeTruthy();
    expect(contents.nativeElement.textContent).toEqual('foo');
  });

  describe(`ID`, () => {

    test(`should support a custom ID`, () => {
      const fixture = createComponent(testComponents.Id);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);

      expect(trigger.getAttribute('id')).toEqual('foo');
    });


    test(`should fall back to the UID if no ID is passed in`, () => {
      const fixture = createComponent(testComponents.Id);
      fixture.componentInstance.myId = undefined;
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);

      expect(trigger.getAttribute('id')).toEqual(expect.stringContaining('ts-select-'));
    });

  });


  describe(`label`, () => {

    test(`should support a custom label`, () => {
      const fixture = createComponent(testComponents.Label);
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('.ts-form-field__label'));

      expect(label.nativeElement.textContent.trim()).toEqual('foo bar');
    });


    test(`should trigger change detection and alert consumers when the label is changed`, () => {
      const fixture = createComponent(testComponents.Label);
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


  test(`should show error immediately if validating on change`, () => {
    const fixture = createComponent(testComponents.ValidateOnChange);
    fixture.detectChanges();
    const messageContainer = fixture.debugElement.query(By.css('.c-validation-message'));

    expect(messageContainer.nativeElement.textContent.trim()).toEqual('Required');
  });


  describe(`toggle()`, () => {

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


  describe(`onSelect`, () => {

    test(`should reset selection values when a null value is selected`, () => {
      const fixture = createComponent(testComponents.NullSelection);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);
      const trigger = getSelectTriggerElement(fixture);

      expect(fixture.componentInstance.myCtrl.value).toEqual('bar');

      const option = getOptionElement(fixture, 1);
      option.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.myCtrl.value).toBeNull();
      expect(instance.selected).toBeFalsy();
      expect(trigger.textContent).not.toContain('Null');
    });

  });


  describe(`keyManager`, () => {

    test(`should close the panel and focus the select if the user TABs out`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);
      const element = getSelectElement(fixture);

      instance.focus = jest.fn();
      instance.open();
      fixture.detectChanges();

      expect(instance.panelOpen).toEqual(true);

      dispatchKeyboardEvent(element, 'keydown', TAB);
      fixture.detectChanges();

      expect(instance.panelOpen).toEqual(false);
      expect(instance.focus).toHaveBeenCalled();
      expect.assertions(3);
    });

  });


  describe(`propogateChanges`, () => {

    test(`should use fallback value if the option has no value`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      instance['propagateChanges']('foo');
      fixture.detectChanges();

      expect(fixture.componentInstance.change).toHaveBeenCalledWith(expect.objectContaining({value: 'foo'}));
    });

  });


  describe(`getPanelScrollTop`, () => {

    test(`should fallback to 0 if the panel is not found`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);
      instance.panel = undefined as any;

      expect(instance['getPanelScrollTop']()).toEqual(0);
    });

  });


  describe(`option`, () => {

    test(`should throw error if template is used but no option is passed in`, () => {
      const create = () => {
        const fixture = createComponent(testComponents.OptionError);
        fixture.detectChanges();
      };

      expect(create).toThrowError(`TsSelectOptionComponent: The full 'option' object must be passed in when using a custom template.`);
    });


    describe(`Id`, () => {

      test(`should support custom IDs`, () => {
        const fixture = createComponent(testComponents.OptionId);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 1);

        expect(option.id).toEqual('Alabama');
      });


      test(`should fall back to UID`, () => {
        const fixture = createComponent(testComponents.OptionId);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 1);

        option.id = undefined as any;
        fixture.detectChanges();

        expect(option.id).toEqual(expect.stringContaining('ts-select-option-'));
      });

    });


    describe(`getLabel`, () => {

      test(`should return the viewValue`, () => {
        const fixture = createComponent(testComponents.OptionId);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 1);

        expect(option.getLabel()).toEqual('Alabama');
      });

    });


    describe(`handleKeydown`, () => {

      test(`should select via interaction when SPACE is used`, () => {
        const fixture = createComponent(testComponents.OptionId);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 1);
        const event = createKeyboardEvent('keydown', SPACE);
        option.selectViaInteraction = jest.fn();

        option.handleKeydown(event);

        expect(option.selectViaInteraction).toHaveBeenCalled();
        expect(event.defaultPrevented).toEqual(true);
      });


      test(`should select via interaction when ENTER is used`, () => {
        const fixture = createComponent(testComponents.OptionId);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 1);
        const event = createKeyboardEvent('keydown', ENTER);
        option.selectViaInteraction = jest.fn();

        option.handleKeydown(event);

        expect(option.selectViaInteraction).toHaveBeenCalled();
        expect(event.defaultPrevented).toEqual(true);
      });

    });


    describe(`option`, () => {

      test(`should retrieve the option object`, () => {
        const fixture = createComponent(testComponents.OptionId);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 1);

        expect(option.option).toEqual(expect.objectContaining({name: 'Alabama'}));
      });

    });


    describe(`deselect`, () => {

      test(`should emit event not from user interaction`, () => {
        const fixture = createComponent(testComponents.OptionId);
        fixture.detectChanges();
        const option = getOptionInstance(fixture, 2);
        option.select();
        fixture.detectChanges();

        option.deselect();
        fixture.detectChanges();

        expect(fixture.componentInstance.change).toHaveBeenCalledTimes(2);
      });

    });

  });


  describe(`optgroup`, () => {

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


  describe(`trigger`, () => {

    test(`should support a custom ID`, () => {
      const fixture = createComponent(testComponents.CustomTrigger);
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      expect(instance.customTrigger.id).toEqual('foo');
    });


    test(`should fall back to the UID if no valid ID is passed in`, () => {
      const fixture = createComponent(testComponents.CustomTrigger);
      fixture.detectChanges();
      fixture.componentInstance.myId = undefined;
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      expect(instance.customTrigger.id).toEqual(expect.stringContaining('ts-select-trigger-'));
    });

  });


  describe(`Select Panel`, () => {

    test(`should close with esc or alt+up`, () => {
      const fixture = createComponent(testComponents.Basic);
      fixture.detectChanges();
      const trigger = getSelectTriggerElement(fixture);
      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();
      const instance = getSelectInstance(fixture);

      expect(instance.panelOpen).toEqual(true);

      dispatchKeyboardEvent(trigger, 'keydown', ESCAPE);
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

      let event = createKeyboardEvent('keydown', DOWN_ARROW);
      Object.defineProperty(event, 'altKey', {get: () => true});
      dispatchEvent(getSelectElement(fixture), event);
      fixture.detectChanges();

      // closed
      expect(instance.panelOpen).toEqual(false);

      dispatchMouseEvent(trigger, 'click');
      fixture.detectChanges();

      // open again
      expect(instance.panelOpen).toEqual(true);

      event = createKeyboardEvent('keydown', UP_ARROW);
      Object.defineProperty(event, 'altKey', {get: () => true});
      dispatchEvent(getSelectElement(fixture), event);
      fixture.detectChanges();

      // closed again
      expect(instance.panelOpen).toEqual(false);
      expect.assertions(4);
    });

  });


  describe('isFilterable', function() {

    test(`should filter options`, () => {
      const fixture = createComponent(testComponents.Filterable);
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

  });

});




/**
 * HELPERS
 */

// TODO: Move to ngx-tools (and all other instances of this utility)
export function createComponent<T>(component: Type<T>, providers: Provider[] = [], imports: any[] = []): ComponentFixture<T> {
  TestBed.configureTestingModule({
    imports: [
      FormsModule,
      ReactiveFormsModule,
      TsSelectModule,
      NoopAnimationsModule,
      ...imports,
    ],
    declarations: [component],
    providers: [
      ...providers,
    ],
  }).compileComponents();

  return TestBed.createComponent<T>(component);
}
