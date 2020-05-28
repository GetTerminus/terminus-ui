import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  ViewContainerRef,
} from '@angular/core';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import { untilComponentDestroyed } from '@terminus/ngx-tools/utilities';
import { TsUILibraryError } from '@terminus/ui/utilities';
import { fromEvent } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
  TsPopoverOptions,
  TsPopoverPosition,
  tsPopoverPositions,
  TsPopoverPositions,
  TsTriggers,
} from './popover-options';
import { TsPopoverComponent } from './popover.component';

// Unique ID for each instance
let nextUniqueId = 0;

/**
 * A directive that adds popover trigger functionality
 *
 * @example
 * <button
 *              tsPopoverTrigger="popper1"
 *              [defaultOpened]="defaultOpened"
 *              [hideOnBlur]="false"
 *              id="my-id"
 *              [popover]="popper1"
 *              [position]="position"
 *              (popoverOnCreate)="myFunction($event)"
 *              (popoverOnShown)="myFunction($event)"
 *              (popoverOnHidden)="myFunction($event)"
 *              (popoverOnUpdate)="myFunction($event)"
 * />
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/popover</example-url>
 */
@Directive({
  selector: '[tsPopoverTrigger]',
  host: { class: 'ts-popover-trigger' },
  exportAs: 'tsPopoverTrigger',
})
export class TsPopoverTriggerDirective implements OnInit, OnDestroy, OnChanges, AfterContentInit, AfterContentChecked {
  /**
   * Define the UID
   */
  public readonly uid = `ts-popover-trigger-${nextUniqueId++}`;

  /**
   * Default options for popper
   *
   * For now we only support click, so it specifies click here. But could support more if needed.
   */
  public static defaultOptions: TsPopoverOptions = {
    trigger: TsTriggers.CLICK,
    ariaRole: 'popover',
    placement: TsPopoverPositions.Bottom,
  };

  /**
   * Whether current popover is open or not.
   */
  public isOpen = false;

  /**
   * Whether popover is opened on load.
   */
  @Input()
  public defaultOpened = false;

  /**
   * Whether popover closes when click outside.
   */
  @Input()
  public hideOnBlur = true;

  /**
   * Define an ID for the directive
   *
   * @param value
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
   * TsPopoverComponent provided as an input
   */
  @Input()
  public popover!: TsPopoverComponent;

  /**
   * Set position of where popover opens
   *
   * @param value
   */
  @Input()
  public set position(value: TsPopoverPosition) {
    if (tsPopoverPositions.indexOf(value) < 0) {
      throw new TsUILibraryError(`"${value}" is not an allowed position value.`);
    }
    this._position = value || TsPopoverPositions.Bottom;
  }
  public get position(): TsPopoverPosition {
    return this._position;
  }
  public _position = TsPopoverPositions.Bottom;

  /**
   * Emit when create popover.
   */
  @Output()
  public readonly popoverOnCreate = new EventEmitter<TsPopoverComponent>();

  /**
   * Emit when popover is shown.
   */
  @Output()
  public readonly popoverOnShown = new EventEmitter<TsPopoverComponent>();

  /**
   * Emit when popover is hidden.
   */
  @Output()
  public readonly popoverOnHidden = new EventEmitter<TsPopoverComponent>();

  /**
   * Emit when popover is updated.
   */
  @Output()
  public readonly popoverOnUpdate = new EventEmitter<TsPopoverComponent>();

  /**
   * Register the click to decide whether it's inside the element or out.
   *
   * @param targetElement
   */
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const clickedInside = this.popover.popoverViewRef.nativeElement.contains(targetElement);
    if (!clickedInside && this.hideOnBlur) {
      this.hide();
    }
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private ngZone: NgZone,
  ) {
    /**
     * Listen to `keydown` events outside the zone so that change detection is not run every
     * time a key is pressed. Re-enter the zone only if the `ESC` key is pressed
     */
    this.ngZone.runOutsideAngular(() => {
      // eslint-disable-next-line deprecation/deprecation
      (fromEvent<KeyboardEvent>(this.elementRef.nativeElement, 'keydown'))
        .pipe(
          filter(event => event.code === KEYS.ESCAPE.code),
          untilComponentDestroyed(this),
        ).subscribe(event => this.ngZone.run(() => {
          this.hide();
          event.stopPropagation();
          event.preventDefault();
        }));
    });
  }

  /**
   * When directive initiated, it assigns a reference to popover component and also register on click event.
   */
  public ngOnInit(): void {
    this.popover.referenceObject = this.viewContainerRef.element.nativeElement;
    this.setContentProperties(this.popover);

    // eslint-disable-next-line deprecation/deprecation
    (fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click'))
      .pipe(
        untilComponentDestroyed(this),
      ).subscribe(event => {
        this.toggle();
        event.stopPropagation();
        event.preventDefault();
      });
  }

  /**
   * After the default change detector has completed checking all content, it decides on popover status based on defaultOpened input.
   */
  public ngAfterContentInit(): void {
    if (this.defaultOpened) {
      this.show();
    }
  }

  /**
   * Once content is initialized and checked, assign custom id to popover id
   */
  public ngAfterContentChecked(): void {
    if (this.popover) {
      this.popover.id = this.id;
    }
  }

  /**
   * When changes happen, assign current position value to popover's popoverOption
   *
   * @param changes - SimpleChange
   */
  public ngOnChanges(changes: { [propertyName: string]: SimpleChange}): void {
    if (changes.position) {
      this.popover.popoverOptions.placement = changes.position.currentValue;
    }
  }

  /**
   * Needed for untilComponentDestroyed
   */
  public ngOnDestroy(): void { }

  /**
   * Set popover options
   *
   * @param popperRef - TsPopoverComponent
   */
  public setContentProperties(popperRef: TsPopoverComponent): void {
    popperRef.popoverOptions = {
      ...TsPopoverTriggerDirective.defaultOptions,
      placement: this.position,
    };
    popperRef.onHidden
      .pipe(untilComponentDestroyed(this))
      .subscribe(_ => this.popoverOnUpdate.emit(this.popover));
  }

  /**
   * Toggle between show and hide.
   */
  public toggle(): void {
    this.isOpen ? this.hide() : this.show();
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Hide the popover.
   */
  public hide(): void {
    this.isOpen = false;
    this.popover.hide();
    this.popoverOnHidden.emit(this.popover);
  }

  /**
   * Show the popover.
   */
  public show(): void {
    this.isOpen = true;
    this.popover.show(this.popover.popoverOptions);
    this.popoverOnShown.emit(this.popover);
  }
}
