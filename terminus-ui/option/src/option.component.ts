import { Highlightable } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  isDevMode,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { TsOptionDisplayDirective } from './option-display.directive';

interface TsOption {
  isDisabled?: boolean;
  children?: TsOption[];
}

/**
 * Event object emitted by {@link TsOptionComponent} when selected or deselected
 */
export class TsOptionSelectionChange {
  constructor(
    // Reference to the option that emitted the event
    public source: TsOptionComponent,
    // Whether the change in the option's value was a result of a user action
    public isUserInput = false,
  ) {}
}


/**
 * Describes a parent component that manages a list of options.
 *
 * Contains properties that the options can inherit. Used by {@link TS_OPTION_PARENT_COMPONENT}
 */
export interface TsOptionParentComponent {
  componentName: string;
  allowMultiple: boolean;
  theme: TsStyleThemeTypes;
  ngControl?: NgModel;
}


/**
 * Injection token used to provide the parent component to options. Used by {@link TsOptionComponent}
 *
 * Since TsSelectComponent imports TsOptionComponent, importing TsSelectComponent here will cause a circular dependency. Injecting via
 * an InjectionToken helps us circumvent that limitation.
 */
export const TS_OPTION_PARENT_COMPONENT = new InjectionToken<TsOptionParentComponent>('TS_OPTION_PARENT_COMPONENT');


/**
 * Describes a parent optgroup component. Used by {@link TS_OPTGROUP_PARENT_COMPONENT}
 */
export interface TsOptgroupParentComponent {
  optgroupOptions: QueryList<TsOptionComponent>;
  isDisabled: boolean;
  triggerChangeDetection: Function;
}


/**
 * Injection token used to provide the parent optgroup to options. Used by {@link TsOptgroupComponent}
 */
export const TS_OPTGROUP_PARENT_COMPONENT = new InjectionToken<TsOptgroupParentComponent>('TS_OPTGROUP_PARENT_COMPONENT');


// Unique ID for each instance
let nextUniqueId = 0;


/**
 * Single option inside of a {@link TsSelectComponent}
 *
 * #### QA CSS CLASSES
 * - `qa-option-checkbox`: The option checkbox
 * - `qa-option-text`: The option text content
 *
 * @example
 * <ts-option
 *              id="my-id"
 *              [isDisabled]="true"
 *              value="My value!"
 *              [option]="myOptionObject"
 *              (selectionChange)="selectedStateChanged($event)"
 * ></ts-option>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  host: {
    'class': 'ts-option',
    'role': 'option',
    '[class.ts-selected]': 'selected',
    '[class.ts-option--multiple]': 'allowMultiple',
    '[class.ts-option--active]': 'active',
    '[class.ts-option--disabled]': 'isDisabled',
    '[class.ts-option--template]': 'optionTemplate',
    '[attr.tabindex]': 'tabIndex',
    '[attr.aria-selected]': 'selected.toString()',
    '[attr.aria-disabled]': '!!isDisabled',
    '[attr.title]': 'title',
    '[id]': 'id',
    '(click)': 'selectViaInteraction()',
    '(keydown)': 'handleKeydown($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'tsOption',
})
export class TsOptionComponent implements Highlightable, AfterContentInit, AfterViewChecked, OnDestroy {
  /**
   * Store the most recent view value
   */
  private mostRecentViewValue = '';

  /**
   * Emits when the state of the option changes and any parents have to be notified
   */
  public readonly stateChanges = new Subject<void>();

  /**
   * Store the text for the title attribute
   */
  public title = '';

  /**
   * Define the default component ID
   */
  protected uid = `ts-option-${nextUniqueId++}`;

  /**
   * Define the active state
   */
  public active = false;

  /**
   * Whether the wrapping component is in multiple selection mode
   */
  public get allowMultiple(): boolean {
    return !!(this.parent && this.parent.allowMultiple);
  }

  /**
   * Whether or not the option is currently selected
   */
  public selected = false;

  /**
   * Whether parent component is an autocomplete component
   */
  public autocompleteComponent = false;

  /**
   * Whether parent component is an autocomplete component
   */
  public selectComponent = false;

  /**
   * Returns the correct tabindex for the option depending on the disabled state
   */
  public get tabIndex(): string {
    return this.isDisabled ? '-1' : '0';
  }

  /**
   * Gets the host DOM element
   */
  public get hostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  /**
   * The displayed value of the option.
   *
   * It is necessary to show the selected option in the {@link TsSelectComponent} trigger.
   */
  public get viewValue(): string {
    // Use the user defined content if the {@link TsOptionDisplayDirective} was used
    const content = this.displayElementRef ? this.displayElementRef.elementRef.nativeElement.textContent : this.hostElement.textContent;
    return (content || '').trim();
  }

  /**
   * Optional template passed in by the consumer
   */
  @ContentChild(TemplateRef, { static: false })
  // tslint:disable-next-line no-any
  public optionTemplate: TemplateRef<any> | undefined;

  /**
   * Access the user-defined text content
   */
  @ContentChild(TsOptionDisplayDirective, { static: false })
  public displayElementRef: TsOptionDisplayDirective | undefined;

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
   * Whether the option is disabled
   */
  @Input()
  public set isDisabled(value: boolean) {
    this._isDisabled = value;
  }
  public get isDisabled(): boolean {
    return (this.group && this.group.isDisabled) || this._isDisabled;
  }
  private _isDisabled = false;

  /**
   * The form value of the option
   */
  @Input()
  // tslint:disable-next-line no-any
  public value: any;

  /**
   * Define the option data object (needed for template support)
   */
  @Input()
  public set option(value: TsOption | undefined) {
    this._option = value;
  }
  public get option(): TsOption | undefined {
    return this._option;
  }
  private _option: TsOption | undefined;

  /**
   * Event emitted when the option is selected or deselected
   */
  @Output()
  public readonly selectionChange = new EventEmitter<TsOptionSelectionChange>();


  constructor(
    public elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    // Injecting via a provider helps us get around the circular dependency created by importing TsSelectComponent here.
    @Optional() @Inject(TS_OPTION_PARENT_COMPONENT) private parent: TsOptionParentComponent,
    @Optional() @Inject(TS_OPTGROUP_PARENT_COMPONENT) public readonly group: TsOptgroupParentComponent,
  ) {
    if (parent.componentName.includes('Autocomplete')) {
      this.autocompleteComponent = true;
    } else if (parent.componentName.includes('Select')) {
      this.selectComponent = true;
    }
  }


  /**
   * If the user is trying to use a template without passing in data, alert the dev
   */
  public ngAfterContentInit(): void {
    // If a template is passed in but no option object, alert the consumer
    if (this.optionTemplate && !this.option && isDevMode()) {
      throw Error(`TsOptionComponent: The full 'option' object must be passed in when using a custom template.`);
    }

    // Set the title once the zone is stable. This is needed to avoid an ExpressionChangedAfterChecked error
    this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
      this.title = this.viewValue;
    });
  }


  /**
   * Trigger state changes if the view value has changed
   */
  public ngAfterViewChecked(): void {
    // Since parent components could be using the option's label to display the selected values
    // (e.g. `ts-select`) and they don't have a way of knowing if the option's label has changed
    // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
    // relatively cheap, however we still limit them only to selected options in order to avoid
    // hitting the DOM too often.
    // istanbul ignore else
    if (this.selected) {
      const viewValue = this.viewValue;

      // istanbul ignore else
      if (viewValue !== this.mostRecentViewValue) {
        this.mostRecentViewValue = viewValue;
        this.stateChanges.next();
      }
    }
  }


  /**
   * Complete observables
   */
  public ngOnDestroy(): void {
    this.stateChanges.complete();
  }


  /**
   * Return the view value
   *
   * Used by `ListKeyManagerOption`
   */
  public getLabel(): string {
    return this.viewValue;
  }


  /**
   * Deselect the option
   */
  public deselect(): void {
    if (this.selected) {
      this.selected = false;
      this.changeDetectorRef.markForCheck();
      this.emitSelectionChangeEvent();
    }

    // Trigger update for the optgroup if a child changes
    // istanbul ignore else
    if (this.group && this.allowMultiple) {
      this.group.triggerChangeDetection(this.id);
    }
  }


  /**
   * Ensure the option is selected when activated from the keyboard
   */
  public handleKeydown(event: KeyboardEvent): void {
    // istanbul ignore else
    if (event.code === KEYS.ENTER.code || event.code === KEYS.SPACE.code) {
      this.selectViaInteraction();

      // Prevent the page from scrolling down and form submits.
      event.preventDefault();
    }
  }


  /**
   * Select the option
   */
  public select(): void {
    if (!this.selected) {
      this.selected = true;
      this.changeDetectorRef.markForCheck();
      this.emitSelectionChangeEvent();
    }

    // Trigger update for the optgroup if a child changes
    // istanbul ignore else
    if (this.group && this.allowMultiple) {
      this.group.triggerChangeDetection(this.id);
    }
  }


  /**
   * Selects the option while indicating the selection came from the user.
   *
   * Used to determine if the select's view -> model callback should be invoked.
   */
  public selectViaInteraction(): void {
    // istanbul ignore else
    if (!this.isDisabled) {
      this.selected = this.allowMultiple ? !this.selected : true;
      this.changeDetectorRef.markForCheck();
      this.emitSelectionChangeEvent(true);
    }
  }


  /**
   * This method sets display styles on the option to make it appear active. This is used by the ActiveDescendantKeyManager so key events
   * will display the proper options as active on arrow key events.
   */
  public setActiveStyles(): void {
    // istanbul ignore else
    if (!this.active) {
      this.active = true;
      this.changeDetectorRef.markForCheck();
    }
  }


  /**
   * This method removes display styles on the option that made it appear active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  public setInactiveStyles(): void {
    if (this.active) {
      // HACK: For some reason, triggering change detection works in `setActiveStyles` above, but not here.
      // Same issue seems preset in TsSelectComponent `autocompleteDeselectItem`.
      setTimeout(() => {
        this.active = false;
        this.changeDetectorRef.markForCheck();
      });
    }
  }


  /**
   * Emit the selection change event
   */
  private emitSelectionChangeEvent(isUserInput = false): void {
    this.selectionChange.emit(new TsOptionSelectionChange(this, isUserInput));
  }

}
