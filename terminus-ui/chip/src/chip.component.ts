import { FocusableOption } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  CanColor,
  CanColorCtor,
  CanDisable,
  CanDisableCtor,
  CanDisableRippleCtor,
  mixinColor,
  mixinDisabled,
  mixinDisableRipple,
} from '@angular/material/core';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

/**
 * Unique ID for each instance
 */
let nextUniqueId = 0;


/**
 * Represents an event fired on an individual `ts-chip`.
 */
export interface TsChipEvent {
  // The chip the event was fired on.
  chip: TsChipComponent;
}

/**
 * Represetns an event fired on clicking an individual chip
 */

export interface TsChipClickEvent {
  chip: TsChipComponent;
  event: Event;
}

/**
 * Event object emitted by TsChip when selected or deselected.
 */
export class TsChipSelectionChange {
  constructor(
    /** Reference to the chip that emitted the event. */
    public source: TsChipComponent,
    /** Whether the chip that emitted the event is selected. */
    public selected: boolean,
  ) { }
}

/**
 * Boilerplate for applying mixins to TsChip.
 */
class TsChipBase {
  constructor(
    public _elementRef: ElementRef,
  ) {}
}

const TsChipMixinBase: CanColorCtor & CanDisableRippleCtor & CanDisableCtor & typeof TsChipBase =
    mixinColor(mixinDisableRipple(mixinDisabled(TsChipBase)), 'primary');


/**
 * Directive to add CSS class to chip trailing icon.
 */
@Directive({
  selector: 'ts-chip-trailing-icon, [tsChipTrailingIcon]',
  host: {
    'class': 'ts-chip-trailing-icon ts-chip__icon',
    'tabindex': '-1',
    'aria-hidden': 'true',
  },
})
export class TsChipTrailingIconDirective {}

/**
 * A presentational component to render a chip
 *
 * @example
 * <ts-chip
 *              [allowMultiple]="true"
 *              id="my-id"
 *              [isDisabled]="false"
 *              [isFocused]="true"
 *              [isRemovable]="true"
 *              [isSelectable]="false"
 *              [selected]="true"
 *              (destroyed)="destroyed($event)"
 *              (removed)="removed($event)"
 *              (selectionChange)="selectionChange($event)"
 * ></ts-chip>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/chip</example-url>
 */
@Component({
  selector: `ts-chip`,
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsChip',
  host: {
    'class': 'ts-chip',
    '[attr.tabindex]': 'isDisabled ? null : -1',
    'role': 'option',
    '[class.ts-chip-selected]': 'selected',
    '[class.ts-chip-with-trailing-icon]': 'trailingIcon || removeIcon',
    '[class.ts-chip-disabled]': 'isDisabled',
    '[attr.disabled]': 'isDisabled || null',
    '[attr.aria-disabled]': 'isDisabled',
    '[attr.aria-selected]': 'ariaSelected',
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeydown($event)',
    '(focus)': 'focus()',
    '(blur)': 'blur()',
  },
})
export class TsChipComponent extends TsChipMixinBase implements
  FocusableOption,
  OnDestroy,
  CanColor,
  CanDisable {

  /**
   * Define the default component ID
   */
  protected uid = `ts-chip-${nextUniqueId++}`;

  /**
   * Emits when the chip is focused.
   */
  public readonly onFocus = new Subject<TsChipEvent>();

  /**
   * Emits when the chip is blured.
   */
  public readonly onBlur = new Subject<TsChipEvent>();


  /**
   * Whether the chip has focus.
   */
  public hasFocus = false;

  /**
   * Whether the chip collection is selectable
   */
  public chipCollectionSelectable = true;

  /**
   * Whether the chip collection is in multi-selection mode.
   */
  public chipCollectionMultiple = false;

  /**
   * The ARIA selected applied to the chip.
   */
  public get ariaSelected(): string | null {
    // NOTE: Remove the `aria-selected` when the chip is deselected in single-selection mode, because
    // it adds noise to NVDA users where "not selected" will be read out for each chip.
    return this.isSelectable && (this.chipCollectionMultiple || this.selected)
      ? this.selected.toString() : null;
  }

  /**
   * The chip's trailing icon.
   */
  @ContentChild(TsChipTrailingIconDirective, { static: false })
  public trailingIcon!: TsChipTrailingIconDirective;

  /**
   * The chip's remove toggler.
   */
  @ContentChild(forwardRef(() => TsChipRemoveDirective), { static: false })
  public removeIcon!: TsChipRemoveDirective;

  /**
   * Define if the chip should be disabled
   */
  @Input()
  public isDisabled = false;

  /**
   * Define an ID for the component
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
   * Whether the chip is selected.
   */
  @Input()
  public set selected(value: boolean) {
    const coercedValue = coerceBooleanProperty(value);

    if (coercedValue !== this._selected) {
      this._selected = coercedValue;
      this.dispatchSelectionChange();
    }
  }
  public get selected(): boolean {
    return this._selected;
  }
  protected _selected = false;

  /**
   * The value of the chip. Defaults to the content inside `<ts-chip>` tags.
   */
  @Input()
  public get value(): string {
    return this._value === undefined
      ? this.elementRef.nativeElement.textContent : this._value;
  }
  public set value(value: string) {
    this._value = value;
  }
  protected _value = '';

  /**
   * Whether or not the chip is selectable.
   * By default a chip is selectable, and it becomes non-selectable if its parent chip collection is not selectable.
   */
  @Input()
  public get isSelectable(): boolean {
    return this._selectable && this.chipCollectionSelectable;
  }
  public set isSelectable(value: boolean) {
    this._selectable = coerceBooleanProperty(value);
  }
  protected _selectable = true;

  /**
   * Determines whether or not the chip displays the remove styling and emits (removed) events.
   */
  @Input()
  public get isRemovable(): boolean {
    return this._removable;
  }
  public set isRemovable(value: boolean) {
    this._removable = coerceBooleanProperty(value);
    this.changeDetectorRef.detectChanges();
  }
  protected _removable = true;

  /**
   * Emitted when the chip is selected or deselected.
   */
  @Output()
  public readonly selectionChange = new EventEmitter<TsChipSelectionChange>();

  /**
   * Emitted when the chip is destroyed.
   */
  @Output()
  public readonly destroyed = new EventEmitter<TsChipEvent>();

  /**
   * Emitted when a chip is to be removed.
   */
  @Output()
  public readonly removed = new EventEmitter<TsChipEvent>();

  /**
   * Emitted when a chip is clicked
   */
  @Output()
  public readonly clicked = new EventEmitter<TsChipClickEvent>();

  constructor(
    public elementRef: ElementRef,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(elementRef);
  }

  public ngOnDestroy() {
    this.destroyed.emit({ chip: this });
  }

  /**
   * Click the chip.
   */
  public click(event): void {
    this.clicked.emit({
      chip: this,
      event,
    });
  }

  /**
   * Selects the chip.
   */
  public select(): void {
    if (!this.selected) {
      this.selected = true;
      this.dispatchSelectionChange();
    }
  }

  /**
   * Deselects the chip.
   */
  public deselect(): void {
    if (this.selected) {
      this.selected = false;
      this.dispatchSelectionChange();
    }
  }

  /**
   * Toggles the current selected state of this chip.
   */
  public toggleSelected(): boolean {
    this._selected = !this.selected;
    this.dispatchSelectionChange();
    return this.selected;
  }

  /**
   * Allows for programmatic focusing of the chip.
   */
  public focus(): void {
    if (!this.hasFocus) {
      this.hasFocus = true;
      this.elementRef.nativeElement.focus();
      this.onFocus.next({ chip: this });
    }
  }

  /**
   * Allows for programmatic removal of the chip. Called by the TsChipCollectionComponent when the DELETE or
   * BACKSPACE keys are pressed.
   * {@link TsChipCollectionComponent}
   *
   * Informs any listeners of the removal request. Does not remove the chip from the DOM.
   */
  public remove(): void {
    if (this.isRemovable) {
      this.removed.emit({ chip: this });
    }
  }

  /**
   * Handles click events on the chip.
   *
   * @param event - click event
   */
  public handleClick(event: Event): void {
    if (this.isDisabled) {
      event.preventDefault();
    } else {
      event.stopPropagation();
    }
  }

  /**
   * Handle custom key presses.
   *
   * @param event - keyboard event
   */
  public handleKeydown(event: KeyboardEvent): void {
    const code = event.code;
    if (this.isDisabled) {
      return;
    }

    switch (code) {
      case KEYS.DELETE.code:
      case KEYS.BACKSPACE.code:
        // If it is removable, remove the focused chip
        this.remove();
        // Always prevent so page navigation does not occur
        event.preventDefault();
        break;
      case KEYS.SPACE.code:
        // If it is selectable, toggle the focused chip
        if (this.isSelectable) {
          this.toggleSelected();
        }
        // Always prevent space from scrolling the page since the list has focus
        event.preventDefault();
        break;
      default:
        event.preventDefault();
        break;
    }
  }

  /**
   * Defer marking the chip as not focused until the next time the zone stabilizes.
   */
  public blur(): void {
    this.ngZone.onStable
      .asObservable()
      .pipe(take(1))
      .subscribe(() => {
        this.ngZone.run(() => {
          this.hasFocus = false;
        });
      });
  }

  /**
   * When selection change action dispatched, emit selectionChange eventEmitter.
   */

  private dispatchSelectionChange() {
    this.selectionChange.emit(new TsChipSelectionChange(this, this._selected));
  }
}

/**
 * Applies proper (click) support and adds styling for use with "cancel" icon
 *
 * @example:
 *
 * <ts-chip>
 *               <ts-icon tsChipRemove>cancel</ts-icon>
 * </ts-chip>
 *
 */
@Directive({
  selector: '[tsChipRemove]',
  host: {
    'class': 'ts-chip-remove ts-chip-trailing-icon',
    '(click)': 'handleClick($event)',
  },
})
export class TsChipRemoveDirective {
  constructor(protected parentChip: TsChipComponent) {}

  /**
   * Calls the parent chip's public `remove()` method if applicable.
   *
   * @param - The Event
   */
  public handleClick(event: Event): void {
    const parentChip = this.parentChip;

    if (parentChip.isRemovable && !parentChip.isDisabled) {
      parentChip.remove();
    }

    // We need to stop event propagation because otherwise the event will bubble up to the
    // form field (if chip is part of a form) and cause the `onContainerClick` method to be invoked.
    // This method would then reset the focused chip that has been focused after chip removal. Usually
    // the parent click listener of the `TsChip` would prevent propagation, but it can happen
    // that the chip is being removed before the event bubbles up.
    event.stopPropagation();
  }
}
