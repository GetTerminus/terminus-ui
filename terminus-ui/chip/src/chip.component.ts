import { FocusableOption } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TsDocumentService } from '@terminus/ngx-tools/browser';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import { isUndefined } from '@terminus/ngx-tools/type-guards';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';


// Unique ID for each instance
// @internal
let nextUniqueId = 0;


/**
 * Represents an event fired on an individual {@link TsChipComponent}
 */
export class TsChipEvent {
  constructor(
    public chip: TsChipComponent,
  ) {}
}

/**
 * Represents an event fired when clicking an individual {@link TsChipComponent}
 */
export class TsChipClickEvent {
  constructor(
    public chip: TsChipComponent,
    event: MouseEvent,
  ) {}
}

/**
 * Event object emitted by {@link TsChipComponent} when selected or deselected
 */
export class TsChipSelectionChange {
  constructor(
    // Reference to the chip that emitted the event
    public source: TsChipComponent,
    // Whether the chip that emitted the event is selected
    public selected: boolean,
  ) { }
}


/**
 * A presentational component to render a chip
 *
 * @example
 * <ts-chip
 *              id="my-id"
 *              [isDisabled]="false"
 *              [isRemovable]="true"
 *              [isSelectable]="false"
 *              theme="primary"
 *              [selected]="true"
 *              (clicked)="chipClicked($event)"
 *              (destroyed)="destroyed($event)"
 *              (blurred)="chipBlurred($event)"
 *              (remove)="removeChip($event)"
 *              (selectionChange)="selectionChange($event)"
 * ></ts-chip>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/chip</example-url>
 */
@Component({
  selector: `ts-chip`,
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  host: {
    'class': 'ts-chip',
    '[class.ts-chip--primary]': 'theme === "primary"',
    '[class.ts-chip--accent]': 'theme === "accent"',
    '[class.ts-chip--warn]': 'theme === "warn"',
    '[attr.tabindex]': 'isDisabled ? null : -1',
    '[class.ts-chip--selected]': 'selected',
    '[class.ts-chip--disabled]': 'isDisabled',
    '[attr.disabled]': 'isDisabled || null',
    '[attr.aria-disabled]': 'isDisabled',
    '[attr.aria-selected]': 'ariaSelected',
    'role': 'option',
    '(blur)': 'handleBlur()',
    '(click)': 'handleClick($event)',
    '(focus)': 'focus()',
    '(keydown)': 'handleKeydown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsChip',
})
export class TsChipComponent implements FocusableOption, OnDestroy {
  /**
   * Define if multiple chips are allowed
   *
   * Used by the {@link TsAutocompleteComponent} consumer
   */
  public set allowMultiple(value: boolean) {
    this._allowMultiple = value;
  }
  public get allowMultiple(): boolean {
    return this._allowMultiple;
  }
  private _allowMultiple = false;

  /**
   * Define reference to the document
   */
  private document: Document;

  /**
   * Define the default component ID
   */
  protected uid = `ts-chip-${nextUniqueId++}`;

  /**
   * Emits when the chip is focused
   *
   * @internal
   */
  public readonly onFocus = new Subject<TsChipEvent>();

  /**
   * Whether the chip has focus
   *
   * @internal
   */
  public hasFocus = false;

  /**
   * Whether the chip collection is selectable
   *
   * @internal
   */
  public chipCollectionSelectable = true;

  /**
   * Whether the chip collection is in multi-selection mode.
   *
   * @internal
   */
  public chipCollectionMultiple = false;

  /**
   * The ARIA selected applied to the chip.
   *
   * @internal
   */
  public get ariaSelected(): string | null {
    // NOTE: Remove the `aria-selected` when the chip is deselected in single-selection mode, because
    // it adds noise to NVDA users where "not selected" will be read out for each chip.
    return this.isSelectable && (this.chipCollectionMultiple || this.selected)
      ? this.selected.toString() : null;
  }

  /**
   * Access to container for chip contents
   */
  @ViewChild('content', { static: true })
  private content: ElementRef<HTMLElement>;

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
  private _id: string = this.uid;

  /**
   * Define if the chip should be disabled
   */
  @Input()
  public isDisabled = false;

  /**
   * Define if the chip allows focus
   */
  @Input()
  public isFocusable = true;

  /**
   * Define if the chip is removable
   */
  @Input()
  public isRemovable = true;

  /**
   * Whether or not the chip is selectable.
   *
   * By default a chip is selectable, and it becomes non-selectable if its parent chip collection is not selectable.
   */
  @Input()
  public set isSelectable(value: boolean) {
    this._selectable = value;
  }
  public get isSelectable(): boolean {
    return this._selectable && this.chipCollectionSelectable;
  }
  private _selectable = true;

  /**
   * Define if the chip is selected
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
   * Define the value of the chip
   *
   * Falls back to the DOM content if not set.
   */
  @Input()
  public set value(value: string | undefined) {
    this._value = value;
  }
  // NOTE: Despite the return type, this getter will only ever return a string
  public get value(): string | undefined {
    if (isUndefined(this._value)) {
      return this.content.nativeElement.textContent.trim();
    }

    return this._value;
  }
  private _value;

  /**
   * Define the theme for a chip
   */
  @Input()
  public set theme(value: TsStyleThemeTypes) {
    this._theme = value || 'primary';
  }
  public get theme(): TsStyleThemeTypes {
    return this._theme;
  }
  private _theme: TsStyleThemeTypes = 'primary';

  /**
   * Emitted when the chip is clicked
   */
  @Output()
  public readonly clicked = new EventEmitter<TsChipClickEvent>();

  /**
   * Emitted when the chip is destroyed.
   */
  @Output()
  public readonly destroyed = new EventEmitter<TsChipEvent>();

  /**
   * Emitted when the chip is blurred
   */
  @Output()
  public readonly blurred = new EventEmitter<void>();

  /**
   * Emitted when the chip is to be removed
   */
  @Output()
  public readonly remove = new EventEmitter<TsChipEvent>();

  /**
   * Emitted when the chip is selected or deselected
   */
  @Output()
  public readonly selectionChange = new EventEmitter<TsChipSelectionChange>();


  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private documentService: TsDocumentService,
  ) {
    this.document = documentService.document;
  }


  /**
   * Alert consumers about destruction
   */
  public ngOnDestroy(): void {
    this.destroyed.emit({ chip: this });
  }


  /**
   * Emit the 'clicked' event
   *
   * @internal
   */
  public click(event: MouseEvent): void {
    this.clicked.emit(new TsChipClickEvent(this, event));
  }


  /**
   * Select the chip
   */
  public select(): void {
    if (!this.selected) {
      this.selected = true;
      this.dispatchSelectionChange();
    }
  }


  /**
   * Deselect the chip
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
    // istanbul ignore else
    if (!this.hasFocus && this.isFocusable) {
      this.hasFocus = true;
      this.elementRef.nativeElement.focus();
      this.onFocus.next(new TsChipEvent(this));
    }
  }


  /**
   * Allows for programmatic removal of the chip. Called by the {@link TsChipCollectionComponent} when the DELETE or BACKSPACE keys are
   * pressed.
   *
   * Informs any listeners of the removal request. Does not remove the chip from the DOM.
   */
  public removeChip(event?: MouseEvent | KeyboardEvent): void {
    // istanbul ignore else
    if (this.isRemovable) {
      this.remove.emit(new TsChipEvent(this));
    }

    // NOTE: We stop propagation here so clicking a chip does not bubble up to an autocomplete instance
    // istanbul ignore else
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
  }


  /**
   * Handles click events on the chip.
   *
   * @internal
   * @param event - click event
   */
  public handleClick(event: MouseEvent): void {
    const shiftKey = event.shiftKey;

    if (this.allowMultiple && this.isSelectable && shiftKey) {
      // NOTE: This is needed to disable text highlight when shift clicking chips
      this.document.onselectstart = () => false;
      this.toggleSelected();
    }

    this.clicked.emit(new TsChipClickEvent(this, event));

    if (this.isDisabled) {
      event.preventDefault();
    } else {
      event.stopPropagation();
    }
  }


  /**
   * Handle custom key presses.
   *
   * @internal
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
        this.removeChip(event);
        break;
      case KEYS.SPACE.code:
        // istanbul ignore else
        if (this.isSelectable) {
          this.toggleSelected();
        }
        break;
        // skip default - no default logic
    }

    // Always prevent so page navigation does not occur and to prevent space from scrolling the page since the list has focus
    event.preventDefault();
  }


  /**
   * Defer marking the chip as not focused until the next time the zone stabilizes.
   */
  public handleBlur(): void {
    this.ngZone.onStable
      .asObservable()
      .pipe(take(1))
      .subscribe(() => {
        this.ngZone.run(() => {
          this.hasFocus = false;
          this.blurred.emit();
        });
      });
  }


  /**
   * When selection change action dispatched, emit selectionChange eventEmitter.
   */
  private dispatchSelectionChange(): void {
    this.selectionChange.emit(new TsChipSelectionChange(this, this.selected));
  }
}

