import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  Geometry,
  PerfectScrollbarDirective,
  Position,
} from 'ngx-perfect-scrollbar';


/**
 * Define possible scroll directions for {@link TsScrollbarsComponent}.
 */
export type TsScrollbarsScrollDirections
  = 'any'
  | 'both'
  | 'x'
  | 'y'
;


/**
 * A class that represents the current geometric state of scrolling for {@link TsScrollbarsComponent}.
 */
export class TsScrollbarsGeometry extends Geometry {}


/**
 * A class that represents the current scrollbar positions for {@link TsScrollbarsComponent}.
 */
export class TsScrollbarPosition extends Position {}


/**
 * Unique ID for each instance
 */
let nextUniqueId = 0;
const DEFAULT_SCROLL_SPEED = 400;


/**
 * The scrollbars UI Component
 *
 * @example
 * <ts-scrollbars
 *              id="my-id"
 *              [isDisabled]="true"
 *              (scrollDown)="myFunc($event)
 *              (scrollLeft)="myFunc($event)
 *              (scrollRight)="myFunc($event)
 *              (scrollUp)="myFunc($event)
 *              (scrollX)="myFunc($event)
 *              (scrollY)="myFunc($event)
 *              (xReachEnd)="myFunc($event)
 *              (xReachStart)="myFunc($event)
 *              (yReachEnd)="myFunc($event)
 *              (yReachStart)="myFunc($event)
 * >My content...</ts-scrollbars>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/scrollbars</example-url>
 */
@Component({
  selector: 'ts-scrollbars',
  templateUrl: './scrollbars.component.html',
  styleUrls: [
    './scrollbars.component.scss',
    // NOTE: Currently Codelyzer does not consider deep relative URLs correctly prefixed: https://github.com/mgechev/codelyzer/issues/816
    // tslint:disable-next-line relative-url-prefix
    './../../../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css',
  ],
  host: { class: 'ts-scrollbars' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsScrollbars',
})
export class TsScrollbarsComponent {
  /**
   * Define the default component ID
   */
  protected _uid = `ts-scrollbars-${nextUniqueId++}`;

  /**
   * Define the speed at which to scroll during automated movements
   */
  protected scrollSpeed = DEFAULT_SCROLL_SPEED;

  /**
   * Return an object containing scrollbar geometry.
   *
   * @return An object with all geometry information
   */
  public get geometry(): TsScrollbarsGeometry | null {
    if (this.scrollbar) {
      return this.scrollbar.geometry('scroll') as TsScrollbarsGeometry;
    }
    return null;

  }

  /**
   * Return the current scrollbar position.
   *
   * @return The current scrollbar position
   */
  public get position(): TsScrollbarPosition | null {
    if (this.scrollbar) {
      return this.scrollbar.position() as TsScrollbarPosition;
    }
    return null;

  }

  /**
   * Define an ID for the component
   */
  @Input()
  public set id(value: string) {
    this._id = value || this._uid;
  }
  public get id(): string {
    return this._id;
  }
  protected _id = this._uid;

  /**
   * Define if the scrollbars are disabled
   */
  @Input()
  public isDisabled = false;

  /**
   * Access underlying scrollbar directive
   */
  @ViewChild(forwardRef(() => PerfectScrollbarDirective), { static: false })
  public scrollbar!: PerfectScrollbarDirective;

  /**
   * Event Emitters
   */
  @Output()
  public readonly scrollDown = new EventEmitter<Event>();

  @Output()
  public readonly scrollLeft = new EventEmitter<Event>();

  @Output()
  public readonly scrollRight = new EventEmitter<Event>();

  @Output()
  public readonly scrollUp = new EventEmitter<Event>();

  @Output()
  public readonly scrollX = new EventEmitter<Event>();

  @Output()
  public readonly scrollY = new EventEmitter<Event>();

  @Output()
  public readonly xReachEnd = new EventEmitter<Event>();

  @Output()
  public readonly xReachStart = new EventEmitter<Event>();

  @Output()
  public readonly yReachEnd = new EventEmitter<Event>();

  @Output()
  public readonly yReachStart = new EventEmitter<Event>();


  /**
   * Determine if a direction is scrollable.
   *
   * See {@link TsScrollbarsScrollDirections} for all possible options.
   *
   * @param direction - The scroll direction to check
   * @return Whether the direction is currently scrollable
   */
  public scrollable(direction: TsScrollbarsScrollDirections = 'any'): boolean | null {
    if (this.scrollbar) {
      return this.scrollbar.scrollable(direction);
    }
    return null;
  }

  /**
   * Scroll to a location
   *
   * @param x - The value to scroll the x axis
   * @param y - The value to scroll the y axis
   * @param x - The speed to scroll at
   */
  public scrollTo(x: number, y?: number, speed?: number): void {
    // istanbul ignore else
    if (this.scrollbar) {
      this.scrollbar.scrollTo(x, y, speed);
    }
  }

  /**
   * Scroll to element
   *
   * @param queryString - The string to query the DOM for
   * @param speed - The speed to move at
   * @param offset - A px offset
   */
  public scrollToElement(queryString: string, speed: number = this.scrollSpeed, offset?: number): void {
    // istanbul ignore else
    if (this.scrollbar) {
      this.scrollbar.scrollToElement(queryString, offset, speed);
    }
  }


  /**
   * Scroll to the bottom
   *
   * @param speed - The rate at which to move
   * @param offset - An offset when scrolling
   */
  public scrollToBottom(speed: number = this.scrollSpeed, offset?: number): void {
    // istanbul ignore else
    if (this.scrollbar) {
      this.scrollbar.scrollToBottom(offset, speed);
    }
  }


  /**
   * Scroll to the left
   *
   * @param speed - The rate at which to move
   * @param offset - An offset when scrolling
   */
  public scrollToLeft(speed: number = this.scrollSpeed, offset?: number): void {
    // istanbul ignore else
    if (this.scrollbar) {
      this.scrollbar.scrollToLeft(offset, speed);
    }
  }


  /**
   * Scroll to the right
   *
   * @param speed - The rate at which to move
   * @param offset - An offset when scrolling
   */
  public scrollToRight(speed: number = this.scrollSpeed, offset?: number): void {
    // istanbul ignore else
    if (this.scrollbar) {
      this.scrollbar.scrollToRight(offset, speed);
    }
  }


  /**
   * Scroll to the top
   *
   * @param speed - The rate at which to move
   * @param offset - An offset when scrolling
   */
  public scrollToTop(speed: number = this.scrollSpeed, offset?: number): void {
    // istanbul ignore else
    if (this.scrollbar) {
      this.scrollbar.scrollToTop(offset, speed);
    }
  }


  /**
   * Trigger an update on the underlying scrollbar library instance.
   */
  public update(): void {
    // istanbul ignore else
    if (this.scrollbar) {
      this.scrollbar.update();
    }
  }

}
