// NOTE: A method must be used to dynamically format values for the UI
// tslint:disable: template-no-call-expression
import { FocusKeyManager } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { untilComponentDestroyed } from '@terminus/ngx-tools';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import {
  merge,
  Observable,
  Subscription,
} from 'rxjs';
import { startWith } from 'rxjs/operators';

import {
  TsChipComponent,
  TsChipEvent,
  TsChipSelectionChange,
} from './chip.component';


// Increasing integer for generating unique ids for chip-collection components.
// @internal
let nextUniqueId = 0;

/**
 * Possible orientations for {@link TsChipCollectionComponent}
 */
export type TsChipCollectionOrientation
  = 'horizontal'
  | 'vertical'
;

/**
 * Change event object that is emitted when the chip collection value has changed.
 */
export class TsChipCollectionChange {
  constructor(
    // Chip collection that emitted the event
    public source: TsChipCollectionComponent,
    // Value of the chip collection when the event was emitted
    public value: string[],
  ) { }
}


/**
 * Component that is used to group {@link TsChipComponent} instances
 *
 * @example
 * <ts-chip-collection
 *              [allowMultipleSelections]="true"
 *              aria-orientation="vertical"
 *              [isDisabled]="false"
 *              [isReadonly]="false"
 *              [isRemovable]="true"
 *              [isSelectable]="false"
 *              [orientation]="horizontal"
 *              [tabIndex]="1"
 *              [value]="myValue"
 *              (collectionChange)="collectionChange($event)"
 *              (removed)="chipRemoved($event)"
 *              (tabUpdateFocus)="tabFocusUpdated()"
 * ></ts-chip-collection>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/chip</example-url>
 */
@Component({
  selector: 'ts-chip-collection',
  templateUrl: `./chip-collection.component.html`,
  styleUrls: ['./chip-collection.component.scss'],
  host: {
    'class': 'ts-chip-collection',
    '[class.ts-chip-collection--disabled]': 'isDisabled',
    '[class.ts-chip-collection--vertical]': 'orientation === "vertical"',
    '[class.ts-chip-collection--selectable]': 'isSelectable',
    '[attr.tabindex]': 'isDisabled ? null : tabIndex',
    '[attr.aria-describedby]': 'ariaDescribedby || null',
    '[attr.aria-disabled]': 'isDisabled',
    '[attr.aria-multiselectable]': 'allowMultipleSelections',
    '[attr.aria-orientation]': 'ariaOrientation',
    '[attr.aria-readonly]': 'isReadonly',
    '[attr.aria-required]': 'false',
    '[attr.aria-selectable]': 'isSelectable',
    '[attr.role]': 'role',
    '(focus)': 'focus()',
    '(blur)': 'blur()',
    '(keydown)': 'keydown($event)',
    '[id]': 'id',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'tsChipCollection',
})
export class TsChipCollectionComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  /**
   * Subscription to focus changes in the chips.
   */
  private chipFocusSubscription: Subscription | null = null;

  /**
   * Subscription to blur changes in the chips.
   */
  private chipBlurSubscription: Subscription | null = null;

  /**
   * Subscription to selection changes in chips.
   */
  private chipSelectionSubscription: Subscription | null = null;

  /**
   * Subscription to remove changes in chips.
   */
  private chipRemoveSubscription: Subscription | null = null;

  /**
   * Uid of the chip collection
   */
  protected uid = `ts-chip-collection-${nextUniqueId++}`;

  /**
   * The aria-describedby attribute on the chip collection for improved a11y.
   *
   * @internal
   */
  public ariaDescribedby!: string;

  /**
   * User defined tab index.
   *
   * When it is not null, use user defined tab index. Otherwise use _tabIndex
   *
   * @internal
   */
  public _userTabIndex: number | null = null;

  /**
   * When a chip is destroyed, we store the index of the destroyed chip until the chips
   * query list notifies about the update. This is necessary because we cannot determine an
   * appropriate chip that should receive focus until the array of chips updated completely.
   *
   * @internal
   */
  public lastDestroyedChipIndex: number | null = null;

  /**
   * The FocusKeyManager which handles focus.
   *
   * @internal
   */
  public keyManager!: FocusKeyManager<TsChipComponent>;

  /**
   * Function when touched
   *
   * @internal
   */
  public onTouched = () => { };

  /**
   * Function when changed
   *
   * @internal
   */
  public onChange: (value: string[]) => void = () => { };

  /**
   * Manage selections
   *
   * @internal
   */
  public selectionModel!: SelectionModel<TsChipComponent>;

  /**
   * Combined stream of all of the child chips' selection change events.
   *
   * @internal
   */
  public get chipSelectionChanges(): Observable<TsChipSelectionChange> {
    return merge(...this.chips.map(chip => chip.selectionChange));
  }

  /**
   * Combined stream of all of the child chips' focus change events.
   *
   * @internal
   */
  public get chipFocusChanges(): Observable<TsChipEvent> {
    return merge(...this.chips.map(chip => chip.onFocus));
  }

  /**
   * Combined stream of all of the child chips' blur change events.
   *
   * @internal
   */
  public get chipBlurChanges(): Observable<TsChipEvent> {
    return merge(...this.chips.map(chip => chip.blurred));
  }

  /**
   * Combined stream of all of the child chips' remove change events.
   *
   * @internal
   */
  public get chipDestroyChanges(): Observable<TsChipEvent> {
    return merge(...this.chips.map(chip => chip.destroyed));
  }

  /**
   * Determine whether there is at least one chip in collection.
   */
  public get empty(): boolean {
    return this.chips && this.chips.length === 0;
  }

  /**
   * Whether any chips has focus
   */
  public get focused(): boolean {
    return this.chips.some(chip => chip.hasFocus);
  }

  /**
   * The ARIA role applied to the chip list
   */
  public get role(): string | null {
    return this._role;
  }
  private _role: string | null = null;

  /**
   * The chip components contained within this chip collection.
   */
  @ContentChildren(TsChipComponent)
  public chips!: QueryList<TsChipComponent>;

  /**
   * Whether the user should be allowed to select multiple chips.
   */
  @Input()
  public set allowMultipleSelections(value: boolean) {
    this._allowMultipleSelections = value;
    this.syncChipsState();
  }
  public get allowMultipleSelections(): boolean {
    return this._allowMultipleSelections;
  }
  private _allowMultipleSelections = false;

  /**
   * Orientation of the chip collection.
   */
  @Input('aria-orientation')
  public ariaOrientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * Set and get chip collection id
   */
  @Input()
  public set id(value: string) {
    this._id = value || this.uid;
  }
  public get id(): string {
    return this._id;
  }
  private _id: string = this.uid;

  /**
   * Get and set disable state
   */
  @Input()
  public set isDisabled(value: boolean) {
    this._disabled = value;
    this.syncChipsState();
  }
  public get isDisabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  /**
   * Get and set readonly state
   */
  @Input()
  public set isReadonly(value: boolean) {
    this._readonly = value;
  }
  public get isReadonly(): boolean {
    return this._readonly;
  }
  private _readonly = false;

  /**
   * Whether or not this chip collection is selectable. When a chip collection is not selectable,
   * all the chips are not selectable.
   */
  @Input()
  public set isSelectable(value: boolean) {
    this._selectable = value;
    this.syncChipsState();
  }
  public get isSelectable(): boolean {
    return this._selectable;
  }
  private _selectable = true;

  /**
   * Orientation of the chip - either horizontal or vertical. Default to horizontal.
   */
  @Input()
  public orientation: TsChipCollectionOrientation = 'horizontal';

  /**
   * Set and get tabindex
   */
  @Input()
  public set tabIndex(value: number) {
    this._userTabIndex = value;
    this._tabIndex = value;
  }
  public get tabIndex(): number {
    return this._tabIndex;
  }
  private _tabIndex = 0;

  /**
   * Set and get chip collection value
   */
  @Input()
  public set value(value: string[]) {
    this._value = value;
  }
  public get value(): string[] {
    return this._value;
  }
  private _value = [''];

  /**
   * Event emitted when the chip collection value has been changed by the user.
   */
  @Output()
  public readonly collectionChange = new EventEmitter<TsChipCollectionChange>();

  /**
   * Emitted when a chip is to be removed.
   */
  @Output()
  public readonly removed = new EventEmitter<TsChipEvent>();

  /**
   * Emitted when tab pressed with chip focused
   */
  @Output()
  public readonly tabUpdateFocus = new EventEmitter<void>();


  constructor(
    protected elementRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef,
    public zone: NgZone,
  ) {
    zone.runOutsideAngular(() => {
      this._role = this.empty ? null : 'listbox';
    });
  }


  /**
   * Initialize the selection model
   */
  public ngOnInit(): void {
    this.selectionModel = new SelectionModel<TsChipComponent>(this.allowMultipleSelections, undefined, false);
  }


  /**
   * Initialize the key manager and listen for chip changes
   */
  public ngAfterViewInit(): void {
    this.keyManager = new FocusKeyManager<TsChipComponent>(this.chips)
      .withWrap()
      .withVerticalOrientation()
      .withHorizontalOrientation('ltr');

    this.keyManager.tabOut.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.tabUpdateFocus.emit();
    });

    // When the collection changes, re-subscribe
    this.chips.changes.pipe(startWith<void, null>(null), untilComponentDestroyed(this)).subscribe(() => {
      if (this.isDisabled || this.isReadonly) {
        // Since this happens after the content has been checked, we need to defer it to the next tick.
        Promise.resolve().then(() => {
          this.syncChipsState();
        });
      }

      this.resetChips();

      // Check to see if we need to update our tab index
      Promise.resolve().then(() => {
        this.updateTabIndex();
      });

      // Check to see if we have a destroyed chip and need to refocus
      this.updateFocusForDestroyedChips();
      this.propagateChanges();
    });
  }


  /**
   * Trigger an initial sync after the content has loaded
   */
  public ngAfterContentInit(): void {
    Promise.resolve().then(() => {
      this.syncChipsState();
    });
  }


  /**
   * Needed for untilComponentDestroyed
   */
  public ngOnDestroy() { }


  /**
   * When blurred, mark the field as touched when focus moved outside the chip collection.
   */
  public blur(): void {
    // istanbul ignore else
    if (!this.focused) {
      this.keyManager.setActiveItem(-1);
    }
  }


  /**
   * Focuses the first non-disabled chip in this chip collection, or the associated input when there are no eligible chips.
   */
  public focus(): void {
    if (this.isDisabled) {
      return;
    }

    // istanbul ignore else
    if (this.chips.length > 0) {
      this.keyManager.setFirstItemActive();
    }
  }


  /**
   * Pass events to the keyboard manager.
   *
   * @internal
   *
   * @param event - They KeyboardEvent
   */
  public keydown(event: KeyboardEvent): void {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    const keyCode = event.code;

    // If they are on an empty input and hit backspace, focus the last chip
    if (keyCode === KEYS.BACKSPACE.code && TsChipCollectionComponent.isInputEmpty(target)) {
      this.keyManager.setLastItemActive();
      event.preventDefault();
    } else if (target && target.classList.contains('ts-chip')) {
      if (keyCode === KEYS.HOME.code) {
        this.keyManager.setFirstItemActive();
        event.preventDefault();
      } else if (keyCode === KEYS.END.code) {
        this.keyManager.setLastItemActive();
        event.preventDefault();
      } if (this.allowMultipleSelections && keyCode === KEYS.A.code && event.ctrlKey) {
        // Select all with CTRL+A
        const hasDeselectedChips = this.chips.some(chip => !chip.isDisabled && !chip.selected);
        this.chips.forEach(chip => {
          // istanbul ignore else
          if (!chip.isDisabled) {
            hasDeselectedChips ? chip.select() : chip.deselect();
          }
        });
        event.preventDefault();
      } else {
        this.keyManager.onKeydown(event);
      }
    }
  }


  /**
   * Utility to for whether input field is empty
   *
   * @param element - An HTMLElement
   * @return boolean
   */
  private static isInputEmpty(element: HTMLElement): boolean {
    if (element && element.nodeName.toLowerCase() === 'input') {
      const input = element as HTMLInputElement;
      return !input.value;
    }

    return false;
  }


  /**
   * Check the tab index as you should not be allowed to focus an empty list.
   *
   * @internal
   */
  private updateTabIndex(): void {
    // If we have 0 chips, we should not allow keyboard focus
    this.tabIndex = this._userTabIndex || (this.chips.length === 0 ? -1 : 0);
  }


  /**
   * If the amount of chips changed, we need to update the key manager state and focus the next closest chip.
   */
  private updateFocusForDestroyedChips(): void {
    // Move focus to the closest chip. If no other chips remain, focus the chip-collection itself.
    if (this.lastDestroyedChipIndex !== null) {
      if (this.chips.length) {
        const newChipIndex = Math.min(this.lastDestroyedChipIndex, this.chips.length - 1);
        this.keyManager.setActiveItem(newChipIndex);
      } else {
        this.focus();
      }
    }

    this.lastDestroyedChipIndex = null;
  }


  /**
   * Emits change event to set the model value.
   */
  private propagateChanges(): void {
    let valueToEmit: string | string[] = '';
    valueToEmit = this.chips.map(chip => chip.value);
    this._value = valueToEmit;
    this.collectionChange.emit(new TsChipCollectionChange(this, valueToEmit));
    this.onChange(valueToEmit);
    this.changeDetectorRef.markForCheck();
  }


  /**
   * Utility to ensure all indexes are valid.
   *
   * @param index The index to be checked.
   * @returns True if the index is valid for our collection of chips.
   */
  private isValidIndex(index: number): boolean {
    return index >= 0 && index < this.chips.length;
  }


  /**
   * Reset all the chips subscription
   */
  private resetChips(): void {
    this.listenToChipsFocus();
    this.listenToChipsSelection();
    this.listenToChipsRemoved();
  }


  /**
   * Listens to user-generated selection events on each chip.
   */
  private listenToChipsSelection(): void {
    this.chipSelectionSubscription = this.chipSelectionChanges.subscribe(event => {
      event.source.selected
        ? this.selectionModel.select(event.source)
        : this.selectionModel.deselect(event.source);

      // For single selection chip collection, make sure the deselected value is unselected.
      if (!this.allowMultipleSelections) {
        this.chips.forEach(chip => {
          if (!this.selectionModel.isSelected(chip) && chip.selected) {
            chip.deselect();
          }
        });
      }
    });
  }


  /**
   * Listens to user-generated selection events on each chip.
   */
  private listenToChipsFocus(): void {
    this.chipFocusSubscription = this.chipFocusChanges.subscribe(event => {
      const chipIndex: number = this.chips.toArray().indexOf(event.chip);

      // istanbul ignore else
      if (this.isValidIndex(chipIndex)) {
        this.keyManager.updateActiveItem(chipIndex);
      }
    });

    this.chipBlurSubscription = this.chipBlurChanges.subscribe(() => {
      this.blur();
    });
  }


  /**
   * Listens to remove events on each chip.
   */
  private listenToChipsRemoved(): void {
    this.chipRemoveSubscription = this.chipDestroyChanges.subscribe(event => {
      const chip = event.chip;
      const chipIndex = this.chips.toArray().indexOf(event.chip);

      // In case the chip that will be removed is currently focused, we temporarily store the index in order to be able to determine an
      // appropriate sibling chip that will receive focus.
      // istanbul ignore else
      if (this.isValidIndex(chipIndex) && chip.hasFocus) {
        this.lastDestroyedChipIndex = chipIndex;
      }
      this.removed.emit(new TsChipEvent(chip));
    });
  }


  /**
   * Syncs the collection's state with the individual chips.
   */
  private syncChipsState(): void {
    // istanbul ignore else
    if (this.chips && this.chips.length) {
      this.chips.forEach(chip => {
        chip.allowMultiple = this.allowMultipleSelections;
        chip.chipCollectionMultiple = this.allowMultipleSelections;
        chip.isDisabled = this.isDisabled;
        chip.chipCollectionRemovable = !this.isReadonly && !this.isDisabled;
        chip.isSelectable = this.isSelectable;
      });
    }
  }

}
