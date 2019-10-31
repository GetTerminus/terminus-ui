// tslint:disable: template-no-call-expression
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DoCheck,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';
import { untilComponentDestroyed } from '@terminus/ngx-tools';
import { TsUILibraryError } from '@terminus/ui/utilities';
import { Subject } from 'rxjs';
import {
  debounceTime,
  filter,
  startWith,
  take,
  takeUntil,
} from 'rxjs/operators';

import { TsDrawerContentComponent } from './drawer-content.component';
import { TsDrawerComponent } from './drawer.component';

/**
 * Throws an exception when two TsDrawer are matching the same position with same mode.
 *
 * @params - drawer's position
 */
export function throwTsDuplicatedDrawerError(position: string): void {
  throw new TsUILibraryError(`TsDrawerContainer: Only one drawer can be in push mode on '"${position}" position'.`);
}

/**
 * Define content left right margin interface
 */
export interface ContentLeftRightMargin {
  left: number | null;
  right: number | null;
}

/**
 * This is used to convert margin measurement from rem to px.
 */
const MARGIN_SIZE_CONVERSION = 16;

/**
 * The drawer container UI Component
 *
 * @example
 * <ts-drawer-container
 *              [hasBackdrop]="hasBackdrop"
 *              (backdropClick)="backdropClicked($event)"
 * ></ts-drawer-container>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/drawer</example-url>
 */
@Component({
  selector: 'ts-drawer-container',
  templateUrl: './drawer-container.component.html',
  styleUrls: ['./drawer.component.scss'],
  host: {
    'class': 'ts-drawer-container',
    '[class.ts-drawer-container-explicit-backdrop]': 'hasBackdrop',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsDrawerContainer',
})
export class TsDrawerContainerComponent implements AfterContentInit, DoCheck, OnDestroy {

  /**
   * The drawer at the start/end position.
   */
  private start: TsDrawerComponent | null = null;
  private end: TsDrawerComponent | null = null;
  private openDrawerCount = 0;

  /**
   * Emits on every ngDoCheck. Used for debouncing reflows.
   */
  private readonly doCheckSubject = new Subject<void>();

  /**
   * Whether the container is being pushed to the side by one of the drawers.
   */
  private get isPushed(): boolean {
    return (TsDrawerContainerComponent.isDrawerOpen(this.start) && this.start.mode === 'push')
      || (TsDrawerContainerComponent.isDrawerOpen(this.end) && this.end.mode === 'push');
  }

  /**
   * Define whether backdrop is shown.
   */
  public get isShowingBackdrop(): boolean {
    return (TsDrawerContainerComponent.isDrawerOpen(this.start) && this.hasBackdrop)
      || (TsDrawerContainerComponent.isDrawerOpen(this.end) && this.hasBackdrop);
  }

  /**
   * Access the child drawer {@link TsDrawerComponent}
   */
  @ContentChildren(TsDrawerComponent)
  public drawers!: QueryList<TsDrawerComponent>;

  /**
   * Access the child content {@link TsDrawerContentComponent}
   */
  @ContentChild(TsDrawerContentComponent, { static: false })
  public content!: TsDrawerContentComponent;

  /**
   * Margins to be applied to the content. These are used to push / shrink the drawer content when a
   * drawer is open. We use margin rather than transform even for push mode because transform breaks
   * fixed position elements inside of the transformed element.
   */
  public contentMargins: ContentLeftRightMargin = {
    left: null,
    right: null,
  };

  /**
   * Used to notify anyone that's listening to content margin changes.
   */
  public readonly contentMarginChanges = new Subject<ContentLeftRightMargin>();

  /**
   * Whether the drawer container should have a backdrop while one of the drawers is open.
   * If explicitly set to `true`, the backdrop will be enabled for drawers.
   */
  @Input()
  public set hasBackdrop(value: boolean) {
    this._hasBackdrop = value;
  }
  public get hasBackdrop(): boolean {
    return this._hasBackdrop;
  }
  public _hasBackdrop = false;

  /**
   * Event emitted when the drawer backdrop is clicked.
   */
  @Output()
  private readonly backdropClick = new EventEmitter<void>();

  constructor(
    private element: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    public renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) private animationMode?: string,
  ) {
  }

  /**
   * After drawer initiated, subscribe to drawer and content changes.
   */
  public ngAfterContentInit(): void {
    const contentEle = this.content ? this.content.getElementRef().nativeElement : null;
    this.drawers.changes.pipe(
      startWith<void, null>(null),
      untilComponentDestroyed(this),
    ).subscribe(() => {
      this.validateDrawers();
      this.drawers.forEach((drawer: TsDrawerComponent) => {
        this.adjustDrawerOnChange(drawer);
        this.drawerPositionOnChange(drawer);
        this.drawerModeOnChange(drawer);
      });

      if (!this.drawers.length
        || TsDrawerContainerComponent.isDrawerOpen(this.start)
        || TsDrawerContainerComponent.isDrawerOpen(this.end)) {
        this.updateContentMargins();
      }
      this.changeDetectorRef.markForCheck();
    });

    // Arbitrary debounce time, less than a frame at 60fps
    this.doCheckSubject.pipe(
      debounceTime(1),
      untilComponentDestroyed(this)
    ).subscribe(() => this.updateContentMargins());

    this.contentMarginChanges.subscribe(e => {
      if (this.content) {
        this.content.leftMargin = e.left;
        this.content.rightMargin = e.right;
        this.renderer.setStyle(contentEle, 'margin-left', e.left ? `${e.left.toString()}px` : 0);
        this.renderer.setStyle(contentEle, 'margin-right', e.right ? `${e.right.toString()}px` : 0);
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  /**
   * Run outside the NgZone, otherwise the debouncer will throw us into an infinite loop.
   */
  public ngDoCheck(): void {
    if (this.isPushed) {
      this.ngZone.runOutsideAngular(() => this.doCheckSubject.next());
    }
  }

  /**
   * Complete the observable on destroy
   */
  public ngOnDestroy(): void {
    this.contentMarginChanges.complete();
    this.doCheckSubject.complete();
  }

  /**
   * Calls `expand` of drawers
   */
  public expand(): void {
    this.drawers.forEach(drawer => drawer.expand());
  }

  /**
   * Calls `collapse` of drawers
   */
  public collapse(): void {
    this.drawers.forEach(drawer => drawer.collapse());
  }

  /**
   * Recalculates and updates the inline styles for the content.
   */
  public updateContentMargins(): void {
    let left: number | null = 0;
    let right: number | null = 0;
    left = this.start ? this.marginCalculation(this.start, 'left', 0) : left;
    right = this.end ? this.marginCalculation(this.end, 'right', 0) : right;

    // If either `right` or `left` is zero, don't set a style to the element. This
    // allows users to specify a custom size via CSS class in SSR scenarios where the
    // measured widths will always be zero. Note that we reset to `null` here, rather
    // than below, in order to ensure that the types in the `if` below are consistent.
    left = left || null;
    right = right || null;
    if (left !== this.contentMargins.left || right !== this.contentMargins.right) {
      this.contentMargins = {
        left,
        right,
      };

      // Pull back into the NgZone since in some cases we could be outside.
      this.ngZone.run(() => this.contentMarginChanges.next(this.contentMargins));
    }
  }

  /**
   * For drawers in `overlay` mode, they don't affect the content.
   * For drawers in `push` mode they should shrink the content. We do this by adding to the
   * left margin (for left drawer) or right margin (for right the drawer).
   * If the content margin has already been set and there are more than 1 opening windows on the same size, do not update.
   *
   * @param drawer: drawer component,
   * @param side: left of right side where the drawer expands
   * @param margin: margin on that side of drawer
   * @return - calculated margin on the specific side.
   */
  private marginCalculation(drawer: TsDrawerComponent | null, side: string, margin: number): number {
    let sideMargin;
    if (this.content) {
      sideMargin = side === 'left' ? this.content.leftMargin : this.content.rightMargin;
    }
    if (drawer && drawer.isExpanded) {
      if (drawer.mode === 'push') {
        const width = parseFloat(drawer.expandedSize.replace(/[^0-9.]/g, ''));
        const measurement = drawer.expandedSize.match(/[a-zA-Z]+/g) || '';
        const coefficient = measurement.includes('px') ? 1 : MARGIN_SIZE_CONVERSION;
        margin += width * coefficient;
      } else if (this.content && sideMargin && this.openDrawerCount <= 1) {
        margin = 0;
      } else if (this.content && sideMargin && this.openDrawerCount > 1) {
        margin = this.contentMargins[side] || 0;
      }
    }
    return margin;
  }

  /**
   * Subscribes to drawer events in order to set a class on the main container element when the
   * drawer is open and the backdrop is visible. This ensures any overflow on the container element
   * is properly hidden.
   *
   * @params drawer - TsDrawerComponent
   */
  private adjustDrawerOnChange(drawer: TsDrawerComponent): void {
    drawer.animationStarted.pipe(
      filter(event => event.fromState !== event.toState),
      takeUntil(this.drawers.changes),
      untilComponentDestroyed(this),
    )
      .subscribe(event => {
        // Set the transition class on the container so that the animations occur. This should not
        // be set initially because animations should only be triggered via a change in state.
        if (event.toState !== 'open-instant' && this.animationMode !== 'NoopAnimations') {
          this.element.nativeElement.classList.add('ts-drawer-transition');
        }
        this.validateDrawers();
        this.updateContentMargins();
        this.changeDetectorRef.markForCheck();
      });

    drawer.expandedChange.pipe(takeUntil(this.drawers.changes))
      .subscribe(() => {
        this.setContainerClass(drawer.isExpanded);
        this.validateDrawers();
      });
  }

  /**
   * Subscribes to drawer positionChanged event in order to re-validate drawers when the position changes.
   *
   * @params drawer - TsDrawerComponent
   */
  private drawerPositionOnChange(drawer: TsDrawerComponent): void {
    // NOTE: We need to wait for the microtask queue to be empty before validating,
    // since both drawers may be swapping positions at the same time.
    drawer.positionChanged.pipe(takeUntil(this.drawers.changes)).subscribe(() => {
      this.ngZone.onMicrotaskEmpty.asObservable().pipe(take(1)).subscribe(() => {
        this.validateDrawers();
      });
    });
  }

  /**
   * Subscribes to changes in drawer mode so we can run change detection.
   */
  private drawerModeOnChange(drawer: TsDrawerComponent): void {
    // istanbul ignore else
    if (drawer) {
      drawer.modeChanged
        .pipe(
          takeUntil(this.drawers.changes),
          untilComponentDestroyed(this),
        )
        .subscribe(() => {
          this.validateDrawers();
          this.updateContentMargins();
          this.changeDetectorRef.markForCheck();
        });
    }
  }

  /**
   * Toggles the 'ts-drawer--expanded' class on the main 'ts-drawer-container' element.
   *
   * @params isAdd: whether drawer is expanding
   */
  private setContainerClass(isAdd: boolean): void {
    if (isAdd) {
      this.element.nativeElement.classList.add('ts-drawer-container--expanded');
    } else {
      this.element.nativeElement.classList.remove('ts-drawer-container--expanded');
    }
  }

  /**
   * Validate the state of the drawer children components.
   */
  private validateDrawers(): void {
    this.start = this.end = null;
    this.openDrawerCount = 0;

    this.drawers.forEach(drawer => {
      this.openDrawerCount = this.openDrawerCount + (drawer.isExpanded ? 1 : 0);
      if (drawer.position === 'end' && drawer.isExpanded) {
        this.end = drawer;
      } else if (drawer.position === 'start' && drawer.isExpanded) {
        this.start = drawer;
      }
    });

    // Ensure that we have at most one start and one end drawer with push mode.
    const seen = new Set();
    const hasDuplicates = this.drawers.filter(d => d.mode === 'push').some(function(currentObject) {
      return seen.size === seen.add(currentObject.position).size;
    });
    if (hasDuplicates) {
      throwTsDuplicatedDrawerError(seen.values().next().value);
    }

    this.changeDetectorRef.markForCheck();
  }

  /**
   * When backdrop is clicked, emit backdropClick event and collapse the drawer
   */
  public onBackdropClicked(): void {
    this.backdropClick.emit();
    this.closeModalDrawer();
  }

  /**
   * Collapse all the drawers if hasBackdrop is true
   */
  public closeModalDrawer(): void {
    // Close all open drawers where closing is not disabled.
    [this.start, this.end]
      .filter(drawer => drawer && this.hasBackdrop)
      .forEach(drawer => drawer && drawer.collapse());
  }

  /**
   * Whether drawer is currently expanded
   *
   * @param drawer
   * @return boolean
   */
  private static isDrawerOpen(drawer: TsDrawerComponent | null): drawer is TsDrawerComponent {
    return drawer != null && drawer.isExpanded;
  }

}
