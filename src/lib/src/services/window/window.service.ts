import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';


export interface WindowSize {
  height: number,
  width: number,
}


/**
 * Return the native window object
 *
 * @return {Object} window The native window object
 */
function _window(): any {
  // return the native window object
  return window;
}

/**
 * Define a service that exposes the native window object
 */
@Injectable()
export class TsWindowService {

  /**
   * Return a function that returns the native window object
   *
   * @return {Object} _window The function that returns the native window object
   */
  get nativeWindow(): any {
    return _window();
  }

  private DEBOUNCE_DELAY: number = 200;

  public height$: Observable<number>;

  public width$: Observable<number>;

  constructor() {
    const windowSize$ = new BehaviorSubject(this.getWindowSize());
    const returnWindowSize = Observable.fromEvent(this.nativeWindow, 'resize').map(this.getWindowSize, this);
    const debouncedInput = returnWindowSize.debounceTime(this.DEBOUNCE_DELAY);

    this.height$ = (windowSize$.pluck('height') as Observable<number>).distinctUntilChanged();
    this.width$ = (windowSize$.pluck('width') as Observable<number>).distinctUntilChanged();

    debouncedInput.subscribe(windowSize$);
  }


  getWindowSize(): WindowSize {
    return {
      height: this.nativeWindow.innerHeight,
      width: this.nativeWindow.innerWidth,
    };
  };
}
