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
  createKeyboardEvent,
  createMouseEvent,
  dispatchEvent,
  dispatchMouseEvent,
  typeInElement,
} from '@terminus/ngx-tools/testing';
import { TsAutocompleteModule } from '@terminus/ui/autocomplete';
import {
  TsChipCollectionComponent,
  TsChipModule,
} from '@terminus/ui/chip';
import * as testComponents from '@terminus/ui/chip/testing';
// eslint-disable-next-line no-duplicate-imports
import {
  getAllChipDebugElements,
  getChipCollectionInstance,
  getChipElement,
  getChipInstance,
} from '@terminus/ui/chip/testing';
import { TsOptionModule } from '@terminus/ui/option';

function createComponent<T>(component: Type<T>): ComponentFixture<T> {
  const moduleImports = [
    FormsModule,
    ReactiveFormsModule,
    TsChipModule,
    TsAutocompleteModule,
    TsOptionModule,
    NoopAnimationsModule,
  ];

  return createComponentInner(component, undefined, moduleImports);
}

describe(`TsChipCollection`, function() {
  let fixture;
  let chipElements;
  let chipDebugElement;
  let chipNativeElement;
  let chipCollectionDebugElement;
  let chipCollectionElement;
  let chipCollectionInstance;
  let chipCollectionNativeElement;
  let chipInsideElement;
  let chipInstance;
  let chips;
  let manager;
  let nativeChips;
  let nativeInput;
  let testComponent;
  let BACKSPACE_EVENT: KeyboardEvent;
  let BACKSPACE_EVENT_CHIP: KeyboardEvent;

  function setupStandardCollection(component) {
    fixture = createComponent(component);
    fixture.detectChanges();
    chipCollectionElement = fixture.debugElement.query(By.directive(TsChipCollectionComponent));
    chipCollectionNativeElement = chipCollectionElement.nativeElement;

    chipCollectionInstance = getChipCollectionInstance(fixture);
    chipInstance = getChipInstance(fixture);
    chipElements = getAllChipDebugElements(fixture);
    chipDebugElement = fixture.debugElement.query(By.css('.ts-chip'));
    chipNativeElement = chipDebugElement.nativeElement;
    chipInsideElement = fixture.debugElement.query(By.css('.c-chip')).nativeElement;
    nativeChips = chipCollectionNativeElement.querySelectorAll('ts-chip');
    chips = chipCollectionInstance.chips;
    manager = chipCollectionInstance.keyManager;
    testComponent = fixture.debugElement.componentInstance;
  }

  test(`should exist`, function() {
    setupStandardCollection(testComponents.RegularChip);

    expect(chipNativeElement).toBeTruthy();
  });

  test(`should disable chip if isDisabled set`, fakeAsync(() => {
    setupStandardCollection(testComponents.DisabledChip);
    tick();
    fixture.detectChanges();

    expect(chipInstance.isDisabled).toEqual(true);
    expect(chipNativeElement.classList).toContain('ts-chip--disabled');
  }));

  test(`should disable chip if isReadonly set`, fakeAsync(() => {
    setupStandardCollection(testComponents.ReadonlyChip);
    chipCollectionInstance.isReadonly = true;
    tick();
    fixture.detectChanges();

    expect(chipInstance.isRemovable).toBeFalsy();
    expect(chipNativeElement.classList).not.toContain('c-chip--removable');
  }));

  test(`should be able to select`, fakeAsync(function() {
    setupStandardCollection(testComponents.RegularChip);

    chipInstance.select();
    const chip1 = chipElements[0].nativeElement;
    const chip2 = chipElements[1].nativeElement;
    chip2._selected = false;
    tick(1000);
    fixture.detectChanges();

    expect(chip1.classList).toContain('ts-chip--selected');
    expect(chip2.classList).not.toContain('ts-chip--selected');
  }));

  test(`should set value properly`, function() {
    fixture = createComponent(testComponents.NoValueChip);
    fixture.detectChanges();
    const instance = getChipCollectionInstance(fixture);

    expect(instance.value).toEqual([]);
    instance.value = ['banana'];
    fixture.detectChanges();
    expect(instance.value).toEqual(['banana']);
  });

  describe(`empty`, () => {

    test(`should check the number of chips if the collection exists`, () => {
      fixture = createComponent(testComponents.NoChip);
      chipCollectionInstance = getChipCollectionInstance(fixture);
      fixture.detectChanges();

      expect(chipCollectionInstance.empty).toEqual(true);
    });

  });

  test(`should be able to set isSelectable from chip collection and populate to chips`, fakeAsync(function() {
    setupStandardCollection(testComponents.RegularChip);

    chipCollectionInstance.isSelectable = true;
    const chip = chips.toArray()[0];
    fixture.detectChanges();

    chipInstance.select();
    tick(1000);
    fixture.detectChanges();

    expect(chip.chipCollectionSelectable).toBeTruthy();
  }));

  test(`should emit 'collectionChange' and 'removed' events when a chip is removed`, function() {
    setupStandardCollection(testComponents.Events);
    const buttons = fixture.nativeElement.querySelectorAll('.c-chip__remove');
    const chipRemovalButton = buttons[1];
    fixture.componentInstance.change = jest.fn();
    fixture.componentInstance.removed = jest.fn();

    expect(chipCollectionInstance.chips.length).toEqual(2);

    chipRemovalButton.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.change.mock.calls[0][0].source.chips.length).toEqual(1);
    expect(fixture.componentInstance.removed.mock.calls[0][0].chip.value).toEqual('banana');
    expect.assertions(3);
  });

  test(`should emit the tabUpdateFocus event`, fakeAsync(() => {
    setupStandardCollection(testComponents.Events);
    fixture.componentInstance.tabbed = jest.fn();
    const event = document.createEvent('KeyboardEvent');
    event.initEvent('keydown', true, false);
    Object.defineProperties(event, { code: { get: () => KEYS.TAB.code } });
    Object.defineProperties(event, { keyCode: { get: () => KEYS.TAB.keyCode } });
    const chip = chipElements[1].nativeElement;

    dispatchEvent(chip, event);
    fixture.detectChanges();

    expect(fixture.componentInstance.tabbed).toHaveBeenCalled();
  }));

  test(`should focus on nothing if blur and no focused chip`, () => {
    setupStandardCollection(testComponents.RegularChip);
    chipCollectionInstance.blur();
    fixture.detectChanges();
    expect(manager.activeItemIndex).toBe(-1);
  });

  test(`should deselect current selected chip if select another chip under allowMultipleSelections false`, () => {
    setupStandardCollection(testComponents.NotAllowMultipleSelections);
    const allChips = chips.toArray();
    allChips[0].selected = true;
    fixture.detectChanges();

    allChips[1].selected = true;
    fixture.detectChanges();
    expect(allChips[0].selected).toBeFalsy();

  });

  describe(`focus`, function() {

    test(`should return undefined if isDisabled`, function() {
      setupStandardCollection(testComponents.DisabledChip);
      expect(chipCollectionInstance.focus()).toEqual(undefined);
    });

    test(`should focus the first non-disabled chip`, function() {
      setupStandardCollection(testComponents.RegularChip);
      chipCollectionInstance.keyManager.setFirstItemActive = jest.fn();
      chipCollectionInstance.focus();
      fixture.detectChanges();

      expect(chipCollectionInstance.keyManager.setFirstItemActive).toHaveBeenCalled();
    });

    test(`should set chip focus state if focus method is triggered`, function() {
      setupStandardCollection(testComponents.RegularChip);
      chipInstance.focus();
      expect(chipInstance.hasFocus).toBeTruthy();
      expect(chipCollectionInstance.focused).toBeTruthy();
    });

    test(`should call the blur() method when a chip is blurred`, fakeAsync(() => {
      setupStandardCollection(testComponents.RegularChip);
      chipCollectionInstance.blur = jest.fn();
      chipInstance.handleBlur();
      fixture.detectChanges();
      tick();

      expect(chipCollectionInstance.blur).toHaveBeenCalled();
    }));

  });

  describe(`tabIndex`, () => {
    beforeEach(() => {
      setupStandardCollection(testComponents.Tabindex);
    });

    test(`should set tabindex if not disabled`, () => {
      expect(chipCollectionNativeElement.getAttribute('tabindex')).toEqual('4');
      fixture.componentInstance.index = -1;
      fixture.detectChanges();
      expect(chipCollectionNativeElement.getAttribute('tabindex')).toEqual('-1');
      expect(chipCollectionInstance.tabIndex).toEqual(-1);
    });

    test(`should have tabindex null if disabled`, () => {
      fixture.componentInstance.isDisabled = true;
      fixture.detectChanges();
      expect(chipCollectionNativeElement.getAttribute('tabindex')).toBeFalsy();
    });
  });

  test(`should not allow keyboard focus when there's 0 chip`, fakeAsync(() => {
    fixture = createComponent(testComponents.NoChip);
    chipCollectionInstance = getChipCollectionInstance(fixture);
    fixture.detectChanges();
    tick(1000);
    expect(chipCollectionInstance.tabIndex).toBe(-1);
  }));

  test('should not have the aria-selected attribute when is not selectable', () => {
    setupStandardCollection(testComponents.StandardChipCollection);
    testComponent = fixture.debugElement.componentInstance;
    testComponent.selectable = false;
    fixture.detectChanges();
    const chipsValid = chips.toArray().every(chip => !chip.isSelectable && !chip.elementRef.nativeElement.hasAttribute('aria-selectable'));

    expect(chipsValid).toBe(true);
  });

  describe(`ID`, function() {
    beforeEach(() => {
      setupStandardCollection(testComponents.Id);
    });

    test(`should get UID as its id`, () => {
      fixture.componentInstance.myId = undefined as any;
      fixture.detectChanges();
      expect(chipCollectionNativeElement.getAttribute('id')).toEqual(expect.stringContaining('ts-chip-collection-'));
      expect(chipCollectionInstance.id).toEqual(expect.stringContaining('ts-chip-collection-'));
    });

    test(`should set custom id`, () => {
      fixture.componentInstance.myId = 1;
      fixture.detectChanges();
      expect(chipCollectionInstance.id).toEqual(1);
    });

  });

  // TODO: Move autocomplete tests to the autocomplete spec file(s)
  describe(`used in autocomplete component`, function() {

    beforeEach(() => {
      setupStandardCollection(testComponents.Autocomplete);
      nativeInput = fixture.nativeElement.querySelector('input');
      BACKSPACE_EVENT = createKeyboardEvent('keydown', KEYS.BACKSPACE, nativeInput);
      BACKSPACE_EVENT_CHIP = createKeyboardEvent('keydown', KEYS.BACKSPACE, chipCollectionNativeElement);
    });

    test(`should focus on last item if input is empty and BACKSPACE is used`, () => {
      // Focus the input
      nativeInput.focus();
      expect(manager.activeItemIndex).toBe(-1);

      // Press the BACKSPACE key
      chipCollectionInstance.keydown(BACKSPACE_EVENT);
      fixture.detectChanges();

      // It focuses the last chip
      expect(manager.activeItemIndex).toEqual(chips.length - 1);
      chipCollectionInstance.keydown(BACKSPACE_EVENT_CHIP);
      fixture.detectChanges();
      const nodeName = document.activeElement ? document.activeElement.nodeName : '';
      // Focus still on the chip
      expect(nodeName).toEqual('TS-CHIP');
    });

    test(`should focus on input if input field is not empty and BACKSPACE is used`, () => {
      // Focus the input
      nativeInput.focus();
      // Type letter into the input field
      typeInElement('a', nativeInput);

      // Press the BACKSPACE key
      chipCollectionInstance.keydown(BACKSPACE_EVENT);

      // It focuses on the input field
      fixture.detectChanges();
      const nodeName = document.activeElement ? document.activeElement.nodeName : '';
      expect(nodeName).toBe('INPUT');
    });

  });

  describe(`keydown`, function() {

    beforeEach(() => {
      setupStandardCollection(testComponents.StandardChipCollection);
    });

    test(`should set first item active when use HOME key`, fakeAsync(function() {
      const element = getChipInstance(fixture)['elementRef'].nativeElement as HTMLElement;
      chipCollectionInstance.keyManager.setFirstItemActive = jest.fn();

      const event = document.createEvent('KeyboardEvent');
      event.initEvent('keydown', true, false);
      Object.defineProperties(event, { code: { get: () => KEYS.HOME.code } });

      fixture.detectChanges();
      element.dispatchEvent(event);
      fixture.detectChanges();

      expect(chipCollectionInstance.keyManager.setFirstItemActive).toHaveBeenCalled();
    }));

    test(`should select OR deselect all items with CTRL + A`, fakeAsync(function() {
      chipCollectionInstance.allowMultipleSelections = true;
      fixture.detectChanges();
      tick(1000);
      const element = getChipElement(fixture);

      const event = createKeyboardEvent('keydown', KEYS.A, element);
      Object.defineProperty(event, 'ctrlKey', { get: () => true });
      dispatchEvent(element, event);
      fixture.detectChanges();
      tick(3000);

      expect(chipCollectionInstance.selectionModel.selected.length).toEqual(1);
      expect(event.defaultPrevented).toEqual(true);

      dispatchEvent(element, event);
      fixture.detectChanges();

      expect(chipCollectionInstance.selectionModel.selected.length).toEqual(0);
    }));
  });

  describe(`updateFocus`, () => {

    beforeEach(() => {
      setupStandardCollection(testComponents.StandardChipCollection);
    });

    test(`should focus on last chip when END key pressed`, () => {
      const firstNativeChip = nativeChips[0] as HTMLElement;
      const array = chips.toArray();
      const lastIndex = array.length - 1;
      const firstItem = array[0];
      const END_EVENT = createKeyboardEvent('keydown', KEYS.END, firstNativeChip);

      firstItem.focus();
      chipCollectionInstance.keydown(END_EVENT);
      fixture.detectChanges();
      expect(manager.activeItemIndex).toEqual(lastIndex);
    });

    test('should focus the next chip when one is removed ', () => {
      jest.useFakeTimers();
      testComponent = fixture.debugElement.componentInstance;

      const array = chips.toArray();
      const lastIndex = array.length - 1;
      const lastItem = array[lastIndex];

      // Focus the last item
      lastItem.focus();

      // Destroy the last item
      testComponent.options.pop();
      fixture.detectChanges();
      jest.advanceTimersByTime(2000);

      // It focuses the next-to-last item
      expect(manager.activeItemIndex).toEqual(lastIndex - 1);
    });
  });

  test('should focus the chip collection if the last focused item is removed', fakeAsync(function() {
    setupStandardCollection(testComponents.OneChip);
    const chip = chipCollectionInstance.chips.toArray()[0];
    testComponent = fixture.debugElement.componentInstance;
    chip.hasFocus = true;
    fixture.detectChanges();
    chipCollectionInstance.focus = jest.fn();

    // Remove the chip
    testComponent.options = [];
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    // Focus is now on chip collection
    expect(chipCollectionInstance.focus).toHaveBeenCalled();
  }));

  describe(`shift+click`, () => {
    let mouseEvent: MouseEvent;
    let firstChip;

    beforeEach(() => {
      setupStandardCollection(testComponents.StandardChipCollection);
      firstChip = chipCollectionInstance.chips.toArray()[0];
      mouseEvent = createMouseEvent('click');
      Object.defineProperty(mouseEvent, 'shiftKey', { get: () => true });
    });

    test(`should select a chip if it's not selected and allowMultiple is true`, () => {
      chipCollectionInstance.allowMultipleSelections = true;
      // If chip is not selected, shift click will select the chip
      firstChip.selected = false;
      fixture.detectChanges();
      dispatchEvent(firstChip.elementRef.nativeElement, mouseEvent);
      fixture.detectChanges();
      expect(firstChip.selected).toBeTruthy();

      // If chip is selected, shift click will deselect the chip
      dispatchEvent(firstChip.elementRef.nativeElement, mouseEvent);
      fixture.detectChanges();
      expect(firstChip.selected).toBeFalsy();
    });

    test(`should not select a chip if allowMultiple being false`, fakeAsync(() => {
      chipCollectionInstance.allowMultipleSelections = false;
      firstChip.selected = false;
      fixture.detectChanges();

      dispatchEvent(chipInsideElement, mouseEvent);
      fixture.detectChanges();
      tick(3000);
      expect(firstChip.selected).toBeFalsy();
    }));
  });

});
