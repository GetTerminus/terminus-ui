import { AnimationEvent } from '@angular/animations';
import {
  PortalHostDirective,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  isNumber,
  untilComponentDestroyed,
} from '@terminus/ngx-tools';
import {
  Subject,
  Subscription,
} from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { tsTabsAnimations } from './tab-animations';


/**
 * These position states are used internally as animation states for the tab body. Setting the position state to left, right, or center will
 * transition the tab body from its current position to its respective state. If there is not current position (void, in the case of a new
 * tab body), then there will be no transition animation to its state.
 *
 * In the case of a new tab body that should immediately be centered with an animating transition, then left-origin-center or
 * right-origin-center can be used, which will use left or right as its psuedo-prior state.
 */
export type TsTabBodyPositionState
  = 'left'
  | 'center'
  | 'right'
  | 'left-origin-center'
  | 'right-origin-center'
;

/**
 * The origin state is an internally used state that is set on a new tab body indicating if it began to the left or right of the prior
 * selected index. For example, if the selected index was set to 1, and a new tab is created and selected at index 2, then the tab body
 * would have an origin of right because its index was greater than the prior selected index.
 */
export type TsTabBodyOriginState
  = 'left'
  | 'right'
;

// Unique ID for each instance
let nextUniqueId = 0;


/**
 * A component that displays the tab content.
 *
 * NOTE: Only used internally.
 */
@Component({
  selector: 'ts-tab-body',
  templateUrl: './tab-body.component.html',
  styleUrls: ['./tab-body.component.scss'],
  host: {
    class: 'ts-tab-body',
  },
  animations: [tsTabsAnimations.translateTab],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsTabBody',
})
export class TsTabBodyComponent implements OnInit, OnDestroy {
  /**
   * A unique ID per instance
   */
  protected id: number = nextUniqueId++;

  /**
   * Current position of the tab-body in the tab-group. Zero means that the tab is visible.
   */
  private positionIndex: number;

  /**
   * Emits when an animation on the tab is complete
   */
  public translateTabComplete = new Subject<AnimationEvent>();

  /**
   * Computes the position state based on the specified origin position.
   * This is used if the tab is becoming visible immediately after creation.
   */
  private get computedPositionFromOrigin(): TsTabBodyPositionState {
    return (isNumber(this.origin) && (this.origin < 1)) ? 'left-origin-center' : 'right-origin-center';
  }

  /**
   * Determine the computed position state that will be used for the tab-body animation trigger
   */
  private get computedPositionAnimationState(): 'left' | 'right' | 'center' {
    const position = (this.positionIndex < 0)
      ? 'left'
      : (this.positionIndex > 0)
      ? 'right'
      : 'center'
    ;
    return position;
  }

  /**
   * The tab body content to display
   */
  @Input()
  public content: TemplatePortal;

  /**
   * Position that will be used when the tab is immediately becoming visible after creation
   */
  @Input()
  public origin: number;

  /**
   * The shifted index position of the tab body, where zero represents the active center tab.
   */
  @Input()
  public set position(position: number) {
    this.positionIndex = position;
    this.positionState = this.computedPositionAnimationState;
  }

  /**
   * Tab body position state.
   * Used by the animation trigger for the current state.
   *
   * NOTE: We cannot use a single getter/setter for position because the types are different
   */
  public positionState!: TsTabBodyPositionState;

  /**
   * Event emitted when the tab begins to animate towards the center as the active tab
   */
  @Output()
  readonly centering: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Event emitted before the centering of the tab begins
   */
  @Output()
  readonly beforeCentering: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Event emitted after the tab has left the center position
   */
  @Output()
  readonly afterLeavingCenter: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Event emitted when the tab completes its animation towards the center
   */
  @Output()
  readonly centered: EventEmitter<void> = new EventEmitter<void>(true);


  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) {}


  /**
   * After initialized, check if the content is centered and has an origin. If so, set the special position states that transition the tab
   * from the left or right before centering.
   */
  public ngOnInit(): void {
    // Emit the correct events when a tab is moving
    this.translateTabComplete.pipe(
      untilComponentDestroyed(this),
      // Ensure that we get unique animation events, because the `.done` callback can get invoked twice in some browsers.
      // See https://github.com/angular/angular/issues/24084.
      distinctUntilChanged((x, y) => {
        return x.fromState === y.fromState && x.toState === y.toState;
      }),
    ).subscribe((event) => {
      // If the transition to the center is complete, emit an event.
      if (this.isCenterPosition(event.toState) && this.isCenterPosition(this.positionState)) {
        this.centered.emit();
      }

      if (this.isCenterPosition(event.fromState) && !this.isCenterPosition(this.positionState)) {
        this.afterLeavingCenter.emit();
      }
    });

    if (this.positionState === 'center' && this.origin !== null) {
      this.positionState = this.computedPositionFromOrigin;
    }
  }


  public ngOnDestroy(): void {
    // Needed for untilComponentDestroyed
  }


  /**
   * Emit events when a tab translation begins
   *
   * @param event - The animation event
   */
  public onTranslateTabStarted(event: AnimationEvent): void {
    const isCentering = this.isCenterPosition(event.toState);
    this.beforeCentering.emit(isCentering);

    if (isCentering) {
      this.centering.emit(this.elementRef.nativeElement.clientHeight);
    }
  }


  /**
   * Deterimine whether the provided position state is considered center (regardless of origin)
   *
   * @param position - The toState of the animation
   * @return True if in a center position
   */
  public isCenterPosition(position: TsTabBodyPositionState | string): boolean {
    return position === 'center' || position === 'left-origin-center' || position === 'right-origin-center';
  }

}
