import { Operator } from 'rxjs/Operator';
import { Observable } from 'rxjs/Observable';

/**
 * A HACK module to fix a bug with the declaration of 'Subject'
 *
 * TODO: Remove this when RxJS releases a stable version with a correct declaration of `Subject`.
 * https://github.com/ReactiveX/rxjs/issues/2539#issuecomment-312683629
 */
declare module 'rxjs/Subject' {

  /**
   * Add new Subject interface
   */
  interface Subject<T> {
    /**
     * The lift method signature
     */
    lift<R>(operator: Operator<T, R>): Observable<R>;
  }

}
