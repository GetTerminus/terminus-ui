import { AnimationEvent } from '@angular/animations';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import {
  isUnset,
  KEYS,
  untilComponentDestroyed,
} from '@terminus/ngx-tools';
import {
  fromEvent,
  Observable,
  Subject,
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  take,
} from 'rxjs/operators';

import { tsDrawerAnimations } from './drawer-animations';

/**
 * Result of the toggle promise that indicates the state of the drawer.
 */
export type TsDrawerToggleResult = 'open' | 'close';

/**
 * Type of drawer display mode
 */
export type TsDrawerModes = 'overlay' | 'push';

/**
 * Type of drawer position
 */
export type TsDrawerPosition = 'start' | 'end';

export const TS_DRAWER_DEFAULT_COLLAPSE_SIZE = '3.75rem';
export const TS_DRAWER_DEFAULT_EXPAND_SIZE = '12.5rem';

/**
 * This drawer component corresponds to a drawer that is nested inside a {@link TsDrawerContainerComponent}
 *
 * @example
 * <ts-drawer
 *              [collapsedSize]="collapsedSize"
 *              [expandedSize]="expandedSize"
 *              [isExpanded]="isExpanded"
 *              [mode]="mode"
 *              [position]="position"
 *              [role]="role"
 *              (expandedChange)="expandedChanged($event)"
 *              (expandedStart)="expandedStarted($event)"
 *              (collapsedStart)="collapsedStarted($event)"
 *              (positionChange)="positionChanged($event)"
 * ></ts-drawer>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/drawer</example-url>
 */
@Component({
  selector: 'ts-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: [tsDrawerAnimations.transformDrawer],
  host: {
    'class': 'ts-drawer',
    // set align to null is to prevent the browser from aligning text based on value
    '[attr.align]': 'null',
    '[attr.role]': 'role',
    '[class.ts-drawer--end]': 'position === "end"',
    '[class.ts-drawer--overlay]': 'mode === "overlay"',
    '[class.ts-drawer--push]': 'mode === "push"',
    'tabIndex': '-1',
    '[@transform]': `{
        value: animationState,
        params: {
            collapsedSize: collapsedSize,
            expandedSize: expandedSize
        }
    }`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsDrawer',
})
export class TsDrawerComponent implements AfterContentChecked, OnDestroy {
  /**
   * Define animation state, defaults to void state
   */
  public animationState: 'open-instant' | 'open' | 'void' = 'void';

  /**
   * Emits whenever the drawer has started animating.
   */
  public animationStarted = new Subject<AnimationEvent>();

  /**
   * Emits whenever the drawer is done animating.
   */
  public animationEnd = new Subject<AnimationEvent>();

  /**
   * Emits when the component is destroyed.
   */
  private readonly destroyed = new Subject<void>();

  /**
   * Whether the drawer is initialized. Used for disabling the initial animation.
   */
  private enableAnimations = false;

  /**
   * An observable that emits when the drawer mode changes. This is used by the drawer container to
   * to know when the mode changes so it can adapt the margins on the content.
   */
  public readonly modeChanged = new Subject();

  /**
   * Collapsed drawer width
   *
   * @param value
   */
  @Input()
  public set collapsedSize(value: string) {
    this._collapsedSize = isUnset(value) ? TS_DRAWER_DEFAULT_COLLAPSE_SIZE : value;
  }
  public get collapsedSize(): string {
    return this._collapsedSize;
  }
  public _collapsedSize = '3.75rem';

  /**
   * Expanded drawer width
   *
   * @param value
   */
  @Input()
  public set expandedSize(value: string) {
    this._expandedSize = isUnset(value) ? TS_DRAWER_DEFAULT_EXPAND_SIZE : value;
  }
  public get expandedSize(): string {
    return this._expandedSize;
  }
  public _expandedSize = '12.75rem';

  /**
   * Define whether the drawer is open
   *
   * @param value
   */
  @Input()
  public set isExpanded(value: boolean) {
    this.toggle(value);
  }
  public get isExpanded(): boolean {
    return this._isExpanded;
  }
  private _isExpanded = false;

  /**
   * Mode of the drawer, overlay or push
   *
   * @param value
   */
  @Input()
  public set mode(value: TsDrawerModes) {
    this._mode = value;
    this.modeChanged.next();
  }
  public get mode(): TsDrawerModes {
    return this._mode;
  }
  private _mode: TsDrawerModes = 'overlay';

  /**
   * The side that the drawer is attached to.
   *
   * @param value
   */
  @Input()
  public set position(value: TsDrawerPosition) {
    // Make sure we have a valid value.
    value = value === 'end' ? 'end' : 'start';
    if (value !== this._position) {
      this._position = value;
      this.positionChanged.emit();
    }
  }
  public get position(): TsDrawerPosition {
    return this._position;
  }
  private _position: TsDrawerPosition = 'start';

  /**
   * Define the aria role label, default to nothing
   */
  @Input()
  public role = '';

  /**
   * Event emitted when the drawer open state is changed.
   *
   * NOTE: This has to be async in order to avoid some issues with two-way bindings - setting isAsync to true.
   */
  @Output()
  public readonly expandedChange = new EventEmitter<boolean>(true);

  /**
   * Event emitted when the drawer has been expanded.
   */
  @Output('isExpanded')
  public get expandedStream(): Observable<void> {
    return this.expandedChange.pipe(filter(o => o), map(() => {}));
  }

  /**
   * Event emitted when the drawer has started expanding.
   */
  @Output()
  public get expandedStart(): Observable<void> {
    return this.animationStarted.pipe(
      filter(e => e.fromState !== e.toState && e.toState.indexOf('open') === 0),
      untilComponentDestroyed(this),
      map(() => {}),
    );
  }

  /**
   * Event emitted when the drawer has been collapsed.
   */
  @Output('closed')
  public get collapsedStream(): Observable<void> {
    return this.expandedChange.pipe(filter(o => !o), map(() => {}));
  }

  /**
   * Event emitted when the drawer has started collapsing.
   */
  @Output()
  public get collapsedStart(): Observable<void> {
    return this.animationStarted.pipe(
      filter(e => e.fromState !== e.toState && e.toState === 'void'),
      untilComponentDestroyed(this),
      map(() => {}),
    );
  }

  /**
   * Event emitted when the drawer's position changes.
   */
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('positionChanged')
  public readonly positionChanged = new EventEmitter<void>();

  constructor(
    public elementRef: ElementRef<HTMLElement>,
    private platform: Platform,
    private ngZone: NgZone,
    public renderer: Renderer2,
  ) {
    /**
     * Listen to `keydown` events outside the zone so that change detection is not run every
     * time a key is pressed. Re-enter the zone only if the `ESC` key is pressed
     */
    this.ngZone.runOutsideAngular(() => {
      // TODO: Refactor deprecation
      // eslint-disable-next-line deprecation/deprecation
      (fromEvent(this.elementRef.nativeElement, 'keydown') as Observable<KeyboardEvent>)
        .pipe(
          filter(event => event.code === KEYS.ESCAPE.code && !hasModifierKey(event)),
          untilComponentDestroyed(this),
        ).subscribe(event => this.ngZone.run(() => {
          this.collapse();
          event.stopPropagation();
          event.preventDefault();
        }));
    });

    // We need a Subject with distinctUntilChanged, because the `done` event fires twice on some browsers.
    this.animationEnd.pipe(
      distinctUntilChanged((x, y) => x.fromState === y.fromState && x.toState === y.toState),
      untilComponentDestroyed(this),
    ).subscribe((event: AnimationEvent) => {
      const { fromState, toState } = event;

      if ((toState.indexOf('open') === 0 && fromState === 'void') || (toState === 'void' && fromState.indexOf('open') === 0)) {
        this.expandedChange.emit(this.isExpanded);
      }
    });
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', this.expandedSize);
  }

  /**
   * Enable the animations after the lifecycle hooks have run, in order to avoid animating drawers that are open by default.
   */
  public ngAfterContentChecked(): void {
    if (this.platform.isBrowser) {
      this.enableAnimations = true;
    }
  }

  /**
   * Complete the observable on destroy
   */
  public ngOnDestroy(): void {
    this.modeChanged.complete();
    this.destroyed.next();
    this.destroyed.complete();
  }

  /**
   * Expand the drawer.
   *
   * @returns Promise<TsDrawerToggleResult>
   */
  public expand(): Promise<TsDrawerToggleResult> {
    return this.toggle(true);
  }

  /**
   * Collapse the drawer.
   *
   * @returns Promise<TsDrawerToggleResult>
   */
  public collapse(): Promise<TsDrawerToggleResult> {
    return this.toggle(false);
  }

  /**
   * Toggle this drawer.
   *
   * @param isOpen - whether the drawer should be open.
   * @returns  Promise<TsDrawerToggleResult>
   */
  public toggle(isOpen = !this.isExpanded): Promise<TsDrawerToggleResult> {
    this._isExpanded = isOpen;
    if (isOpen) {
      this.animationState = this.enableAnimations ? 'open' : 'open-instant';
    } else {
      this.animationState = 'void';
    }

    return new Promise<TsDrawerToggleResult>(resolve => {
      this.expandedChange.pipe(take(1)).subscribe(open => resolve(open ? 'open' : 'close'));
    });
  }

  /**
   * We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
   * In Ivy the `host` bindings will be merged when this class is extended, whereas in
   * ViewEngine they're overwritten.
   * TODO: we move this back into `host` once Ivy is turned on by default.
   *
   * @param event
   */
  @HostListener('@transform.start', ['$event'])
  public animationStartListener(event: AnimationEvent) {
    this.animationStarted.next(event);
  }

  /**
   * We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
   * In Ivy the `host` bindings will be merged when this class is extended, whereas in
   * ViewEngine they're overwritten.
   * TODO: move this back into `host` once Ivy is turned on by default.
   *
   * @param event
   */
  @HostListener('@transform.done', ['$event'])
  public animationDoneListener(event: AnimationEvent) {
    this.animationEnd.next(event);
  }
}

