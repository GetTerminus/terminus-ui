// NOTE: A method must be used to dynamically format values for the UI
// tslint:disable: template-no-call-expression
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { untilComponentDestroyed } from '@terminus/ngx-tools';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import {
  merge,
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import {
  startWith,
  takeUntil,
} from 'rxjs/operators';
import {
  TsChipComponent,
  TsChipEvent,
  TsChipSelectionChange,
} from './chip.component';


// Increasing integer for generating unique ids for chip-collection components.
let nextUniqueId = 0;

/**
 * Change event object that is emitted when the chip collection value has changed.
 */
export class TsChipCollectionChange {
  constructor(
    // Chip collection that emitted the event.
    public source: TsChipCollectionComponent,
    // Value of the chip collection when the event was emitted.
    // tslint:disable-next-line no-any
    public value: string[],
  ) { }
}


/**
 * Component that is used to group instances of {@link TsChipComponent}s
 *
 * @example
 * <ts-chip-collection
 *              [allowMultipleSelections]="true"
 *              [isDisabled]="false"
 *              [isReadonly]="false"
 *              [isRemovable]="true"
 *              [isSelectable]="false"
 *              [orientation]="horizontal"
 *              (collectionChange)="collectionChange($event)"
 * ></ts-chip-collection>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/chip</example-url>
 */
@Component({
  selector: 'ts-chip-collection',
  templateUrl: `./chip-collection.component.html`,
  exportAs: 'tsChipCollection',
  host: {
    '[attr.tabindex]': 'isDisabled ? null : _tabIndex',
    '[attr.aria-describedby]': 'ariaDescribedby || null',
    '[attr.aria-disabled]': 'isDisabled',
    '[attr.aria-multiselectable]': 'allowMultipleSelections',
    '[attr.aria-orientation]': 'ariaOrientation',
    '[attr.aria-readonly]': 'isReadonly',
    '[attr.aria-required]': 'false',
    '[attr.aria-selectable]': 'isSelectable',
    '[attr.role]': 'role',
    '[class.ts-chip-collection-disabled]': 'isDisabled',
    '[class.ts-chip-collection-selectable]': 'isSelectable',
    'class': 'ts-chip-collection',
    '(focus)': 'focus()',
    '(blur)': 'blur()',
    '(keydown)': 'keydown($event)',
    '[id]': 'id',
  },
  styleUrls: ['./chip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TsChipCollectionComponent implements AfterViewInit, OnInit, OnDestroy {

  /**
   * Subject that emits when the component has been destroyed.
   */
  private destroyed = new Subject<void>();

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
   */
  public ariaDescribedby!: string;

  /**
   * User defined tab index.
   * When it is not null, use user defined tab index. Otherwise use _tabIndex
   */
  public _userTabIndex: number | null = null;

  /**
   * When a chip is destroyed, we store the index of the destroyed chip until the chips
   * query list notifies about the update. This is necessary because we cannot determine an
   * appropriate chip that should receive focus until the array of chips updated completely.
   */
  public lastDestroyedChipIndex: number | null = null;

  /**
   * The FocusKeyManager which handles focus.
   */
  public keyManager!: FocusKeyManager<TsChipComponent>;

  /**
   * Function when touched
   */
  public onTouched = () => { };

  /**
   * Function when changed
   */
  public onChange: (value: string[]) => void = () => { };

  /**
   * Manage selections
   */
  public selectionModel!: SelectionModel<TsChipComponent>;

  /**
   * Combined stream of all of the child chips' selection change events.
   */
  public get chipSelectionChanges(): Observable<TsChipSelectionChange> {
    return merge(...this.chips.map(chip => chip.selectionChange));
  }

  /**
   * Combined stream of all of the child chips' focus change events.
   */
  public get chipFocusChanges(): Observable<TsChipEvent> {
    return merge(...this.chips.map(chip => chip.onFocus));
  }

  /**
   * Combined stream of all of the child chips' blur change events.
   */
  public get chipBlurChanges(): Observable<TsChipEvent> {
    return merge(...this.chips.map(chip => chip.onBlur));
  }

  /**
   * Combined stream of all of the child chips' remove change events.
   */
  public get chipRemoveChanges(): Observable<TsChipEvent> {
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
  public _role: string | null = null;

  /**
   * The chip components contained within this chip collection.
   */
  @ViewChildren(TsChipComponent) public chips!: QueryList<TsChipComponent>;

  /**
   * A list of chip values as input.
   */
  @Input()
  public chipsInput: ReadonlyArray<string> = [];

  @Input()
  public displayFormatter = v => v as string

  /**
   * Whether the user should be allowed to select multiple chips.
   */
  @Input()
  public set allowMultipleSelections(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
    this.syncChipsState();
  }
  public get allowMultipleSelections(): boolean {
    return this._multiple;
  }
  private _multiple = false;

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
  protected _value = [''];

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
  protected _id: string = this.uid;

  /**
   * Get and set disable state
   */
  @Input()
  public set isDisabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.syncChipsState();
  }
  public get isDisabled(): boolean {
    return this._disabled;
  }
  protected _disabled = false;

  /**
   * Get and set readonly state
   */
  @Input()
  public set isReadonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
  }
  public get isReadonly(): boolean {
    return this._readonly;
  }
  protected _readonly = false;

  /**
   * Whether or not this chip collection is selectable. When a chip collection is not selectable,
   * all the chips are not selectable.
   */
  @Input()
  public set isSelectable(value: boolean) {
    this._selectable = coerceBooleanProperty(value);
    if (this.chips) {
      this.chips.forEach(chip => {
        chip.chipCollectionSelectable = this._selectable;
      });
    }
  }
  public get isSelectable(): boolean {
    return this._selectable;
  }
  protected _selectable = true;

  /**
   * Orientation of the chip - either horizontal or vertical. Default to horizontal.
   */

  @Input()
  public orientation: 'horizontal' | 'vertical' = 'horizontal';

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
  public _tabIndex = 0;

  /**
   * Orientation of the chip collection.
   */
  @Input('aria-orientation')
  public ariaOrientation: 'horizontal' | 'vertical' = 'horizontal';

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
  public readonly tabUpdateFocus = new EventEmitter();

  constructor(protected elementRef: ElementRef<HTMLElement>,
              private changeDetectorRef: ChangeDetectorRef,
              public zone: NgZone,
              @Optional() private dir: Directionality,) {
    zone.runOutsideAngular(() => {
      this._role = this.empty ? null : 'listbox';
    });
  }

  public ngOnInit() {
    this.selectionModel = new SelectionModel<TsChipComponent>(this.allowMultipleSelections, undefined, false);
  }

  public ngAfterViewInit() {
    this.keyManager = new FocusKeyManager<TsChipComponent>(this.chips)
      .withWrap()
      .withVerticalOrientation()
      .withHorizontalOrientation(this.dir ? this.dir.value : 'ltr');

    this.keyManager.tabOut.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.tabUpdateFocus.emit();
    });

    // When the collection changes, re-subscribe
    this.chips.changes.pipe(startWith(null), untilComponentDestroyed(this)).subscribe(() => {
      if (this.isDisabled || this.isReadonly) {
        // Since this happens after the content has been
        // checked, we need to defer it to the next tick.
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

  // Needed for untilComponentDestroyed
  public ngOnDestroy() { }

  /**
   * When blurred, mark the field as touched when focus moved outside the chip collection.
   */
  public blur() {
    if (!this.focused) {
      this.keyManager.setActiveItem(-1);
    }
  }

  /**
   * When remove called, emit removed event emitter
   *
   * @param event
   */
  public remove(event) {
    this.removed.emit(event);
  }

  /**
   * Focuses the first non-disabled chip in this chip collection, or the associated input when there
   * are no eligible chips.
   */
  public focus(): void {
    if (this.isDisabled) {
      return;
    }

    if (this.chips.length > 0) {
      this.keyManager.setFirstItemActive();
    }
  }

  /**
   * Utility to for whether input field is empty
   *
   * @param element - An HTMLElement
   * @return boolean
   */
  private isInputEmpty(element: HTMLElement): boolean {
    if (element && element.nodeName.toLowerCase() === 'input') {
      const input = element as HTMLInputElement;
      return !input.value;
    }

    return false;
  }

  /**
   * Pass events to the keyboard manager.
   *
   * @param event - They KeyboarEvent
   */
  public keydown(event: KeyboardEvent): void {
    event.stopPropagation();
    const target = event.target as HTMLElement;
    const keyCode = event.code;

    // If they are on an empty input and hit backspace, focus the last chip
    if (keyCode === KEYS.BACKSPACE.code && this.isInputEmpty(target)) {
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

  public clickSelect(clickEvent) {
    const shiftKey = clickEvent.event.shiftKey;
    if (this.allowMultipleSelections && shiftKey) {
      // Disable text highlight when shift click
      document.onselectstart = function() {
        return false;
      };
      clickEvent.chip.toggleSelected();
      clickEvent.event.preventDefault();
    }
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
   * Check the tab index as you should not be allowed to focus an empty list.
   */
  protected updateTabIndex(): void {
    // If we have 0 chips, we should not allow keyboard focus
    this.tabIndex = this._userTabIndex || (this.chips.length === 0 ? -1 : 0);
  }

  /**
   * If the amount of chips changed, we need to update the key manager state and focus the next closest chip.
   */
  protected updateFocusForDestroyedChips(): void {
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
    this.chipRemoveSubscription = this.chipRemoveChanges.subscribe(event => {
      const chip = event.chip;
      const chipIndex = this.chips.toArray().indexOf(event.chip);

      // In case the chip that will be removed is currently focused, we temporarily store
      // the index in order to be able to determine an appropriate sibling chip that will
      // receive focus.
      if (this.isValidIndex(chipIndex) && chip.hasFocus) {
        this.lastDestroyedChipIndex = chipIndex;
      }
    });
  }

  /**
   * Syncs the collection's state with the individual chips.
   */
  private syncChipsState() {
    if (this.chips) {
      this.chips.forEach(chip => {
        chip.isDisabled = this.isDisabled;
        chip.chipCollectionMultiple = this.allowMultipleSelections;
        chip.isRemovable = !this.isReadonly && !this.isDisabled;
      });
    }
  }

  /**
   * Function for tracking for-loops changes
   *
   * @param index - The item index
   * @return The index
   */
  public trackByFn(index): number {
    return index;
  }
}
