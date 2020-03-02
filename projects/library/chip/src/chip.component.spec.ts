import {
  DebugElement,
  Type,
} from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import {
  createComponent as createComponentInner,
  createFakeEvent,
  createKeyboardEvent,
  dispatchFakeEvent,
} from '@terminus/ngx-tools/testing';
import * as testComponents from '@terminus/ui/chip/testing';
// eslint-disable-next-line no-duplicate-imports
import { TsChipTestComponent } from '@terminus/ui/chip/testing';

import {
  TsChipComponent,
  TsChipModule,
  TsChipSelectionChange,
} from './chip.module';


describe('Chips', () => {
  let fixture: ComponentFixture<TsChipTestComponent>;
  let chipDebugElement: DebugElement;
  let chipNativeElement: HTMLElement;
  let chipInstance: TsChipComponent;

  function createComponent<T>(component: Type<T>): ComponentFixture<T> {
    const moduleImports = [
      TsChipModule,
      NoopAnimationsModule,
    ];
    return createComponentInner(component, [], moduleImports);
  }

  describe('TsChip', () => {
    let testComponent;
    function setup(component: TsChipTestComponent = testComponents.SingleChip) {
      fixture = createComponent(component);
      fixture.detectChanges();

      chipDebugElement = fixture.debugElement.query(By.directive(TsChipComponent));
      chipNativeElement = chipDebugElement.nativeElement;
      chipInstance = chipDebugElement.componentInstance;
      testComponent = fixture.debugElement.componentInstance;
    }

    describe(`basic behaviors`, () => {

      test('should add the `ts-chip` class', () => {
        setup();
        expect(chipNativeElement.classList).toContain('ts-chip');
      });

      test(`should allow direct setting of isSelectable`, () => {
        setup();
        expect(chipInstance.isSelectable).toEqual(true);
        chipInstance.isSelectable = false;
        expect(chipInstance.isSelectable).toEqual(false);
      });

      test(`should allow the theme to be set`, () => {
        setup();
        expect(chipInstance.theme).toEqual('primary');
        chipInstance.theme = 'warn';
        fixture.detectChanges();
        expect(Array.from(chipNativeElement.classList)).toContain('ts-chip--warn');
      });

      test(`should fall back to the primary theme`, () => {
        setup();
        chipInstance.theme = 'warn';
        fixture.detectChanges();
        expect(chipInstance.theme).toEqual('warn');
        chipInstance.theme = 'warn';

        chipInstance.theme = undefined as any;
        fixture.detectChanges();
        expect(chipInstance.theme).toEqual('primary');
      });

      test(`should allow selection`, () => {
        setup();
        testComponent.selectionChange = jest.fn();
        expect(chipNativeElement.classList).not.toContain('ts-chip--selected');

        testComponent.selected = true;
        fixture.detectChanges();

        expect(chipNativeElement.classList).toContain('ts-chip--selected');
        expect(testComponent.selectionChange)
          .toHaveBeenCalledWith({
            source: chipInstance,
            selected: true,
          });
      });

      test(`should set id`, () => {
        setup();
        expect(chipInstance.id).toBeTruthy();

        chipInstance.id = 'foo';
        expect(chipInstance.id).toEqual('foo');

        chipInstance.id = null as any;
        expect(chipInstance.id).toEqual(expect.stringContaining('ts-chip-'));
      });

      test(`should see removal button`, () => {
        setup();
        const chipRemovalButton = fixture.debugElement.query(By.css('.c-chip__remove'));
        expect(chipRemovalButton).toBeTruthy();
      });

      test(`should allow removal`, () => {
        setup();
        testComponent.removed = jest.fn();

        chipInstance.removeChip();
        fixture.detectChanges();

        expect(testComponent.removed).toHaveBeenCalled();
      });

      test('should not dispatch `selectionChange` event when selecting a selected chip', () => {
        setup();
        chipInstance.select();

        const spy = jest.fn();
        const subscription = chipInstance.selectionChange.subscribe(spy);

        chipInstance.select();

        expect(spy).not.toHaveBeenCalled();
        subscription.unsubscribe();
      });

      test('should not dispatch `selectionChange` through setter if the value did not change', () => {
        setup();
        chipInstance.selected = false;

        const spy = jest.fn();
        const subscription = chipInstance.selectionChange.subscribe(spy);

        chipInstance.selected = false;

        expect(spy).not.toHaveBeenCalled();
        subscription.unsubscribe();
      });

      test('should  dispatch `selectionChange` event when deselecting a selected chip', () => {
        setup();
        chipInstance.select();

        const spy = jest.fn();
        const subscription = chipInstance.selectionChange.subscribe(spy);

        chipInstance.deselect();

        expect(spy).toHaveBeenCalled();
        subscription.unsubscribe();
      });

      test('should not dispatch `selectionChange` event when deselecting a non-selected chip', () => {
        setup();
        chipInstance.deselect();

        const spy = jest.fn();
        const subscription = chipInstance.selectionChange.subscribe(spy);

        chipInstance.deselect();

        expect(spy).not.toHaveBeenCalled();
        subscription.unsubscribe();
      });

      test(`should toggle selected`, () => {
        setup();
        chipInstance.select();
        expect(chipInstance.toggleSelected()).toBeFalsy();

        chipInstance.deselect();
        expect(chipInstance.toggleSelected()).toBeTruthy();
      });

      test(`should retrieve the value from the DOM if not explicitly set`, () => {
        setup(testComponents.ChipNoValue);
        const cInstance = fixture.debugElement.query(By.directive(TsChipComponent)).componentInstance;

        expect(cInstance.value).toEqual('banana');
      });
    });



    describe(`keyboard events`, () => {

      describe(`when not disabled`, () => {

        beforeEach(() => {
          setup();
          chipInstance.isDisabled = false;
          chipInstance.isRemovable = true;
        });

        test(`should selects/deselects the currently focused chip on SPACE`, () => {
          const SPACE_EVENT: KeyboardEvent = createKeyboardEvent('keydown', KEYS.SPACE);
          const CHIP_SELECTED_EVENT: TsChipSelectionChange = {
            source: chipInstance,
            selected: true,
          };

          const CHIP_DESELECTED_EVENT: TsChipSelectionChange = {
            source: chipInstance,
            selected: false,
          };

          testComponent.selectionChange = jest.fn();

          // Use the spacebar to select the chip
          chipInstance.handleKeydown(SPACE_EVENT);
          fixture.detectChanges();

          expect(chipInstance.selected).toBeTruthy();
          expect(testComponent.selectionChange).toHaveBeenCalledTimes(1);
          expect(testComponent.selectionChange).toHaveBeenCalledWith(CHIP_SELECTED_EVENT);

          // Use the spacebar to deselect the chip
          chipInstance.handleKeydown(SPACE_EVENT);
          fixture.detectChanges();

          expect(chipInstance.selected).toBeFalsy();
          expect(testComponent.selectionChange).toHaveBeenCalledTimes(2);
          expect(testComponent.selectionChange).toHaveBeenCalledWith(CHIP_DESELECTED_EVENT);
        });

        test(`should delete chip on BACKSPACE`, () => {
          const BACKSPACE_EVENT = createKeyboardEvent('keydown', KEYS.BACKSPACE);

          testComponent.removed = jest.fn();

          // Use backspace to remove the chip
          chipInstance.handleKeydown(BACKSPACE_EVENT);
          fixture.detectChanges();

          expect(testComponent.removed).toHaveBeenCalled();
        });

        test(`should delete chip on DELETE`, () => {
          const DELETE_EVENT = createKeyboardEvent('keydown', KEYS.DELETE);

          testComponent.removed = jest.fn();

          // Use delete to remove the chip
          chipInstance.handleKeydown(DELETE_EVENT);
          fixture.detectChanges();

          expect(testComponent.removed).toHaveBeenCalled();
        });

        test(`should not dispatch events on other keys`, () => {
          const A_EVENT = createKeyboardEvent('keydown', KEYS.A);
          testComponent.removed = jest.fn();
          chipInstance.toggleSelected = jest.fn();
          A_EVENT.preventDefault = jest.fn();

          chipInstance.handleKeydown(A_EVENT);
          expect(testComponent.removed).not.toHaveBeenCalled();
          expect(chipInstance.toggleSelected).not.toHaveBeenCalled();
          expect(A_EVENT.preventDefault).toHaveBeenCalled();
        });

      });

      describe(`when disabled`, () => {

        test(`should do nothing`, () => {
          setup();
          chipInstance.isDisabled = true;
          const event = createFakeEvent('delete') as KeyboardEvent;
          event.preventDefault = jest.fn();
          fixture.detectChanges();
          chipInstance.handleKeydown(event);

          expect(event.preventDefault).not.toHaveBeenCalled();
        });

      });

    });

    describe(`handle click`, () => {

      test(`should prevent default if is disabled`, () => {
        setup();
        chipInstance.isDisabled = true;
        const event = dispatchFakeEvent(chipNativeElement, 'click') as MouseEvent;
        chipInstance.handleClick(event);
        fixture.detectChanges();

        expect(event.defaultPrevented).toBe(true);
      });

      test(`should stop propagate if is not disabled`, () => {
        setup();
        chipInstance.isDisabled = false;
        const event = dispatchFakeEvent(chipNativeElement, 'click') as MouseEvent;
        event.stopPropagation = jest.fn();
        chipInstance.handleClick(event);
        fixture.detectChanges();

        expect(event.defaultPrevented).toBe(false);
        expect(event.stopPropagation).toHaveBeenCalled();
      });

    });

    describe(`tsChipBadge`, () => {

      test(`should disable interactions`, () => {
        setup(testComponents.ChipBadge);

        expect(chipInstance.isFocusable).toEqual(false);
        expect(chipInstance.isSelectable).toEqual(false);
        expect(chipInstance.isRemovable).toEqual(false);
        expect(chipNativeElement.classList).toContain('ts-chip--badge');
      });

    });

  });

});
