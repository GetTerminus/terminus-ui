// TODO: Remove this when RxJS releases a stable version with a correct declaration of `Subject`.
// https://github.com/ReactiveX/rxjs/issues/2539#issuecomment-312683629
import { Operator } from 'rxjs/Operator'
import { Observable } from 'rxjs/Observable';

declare module 'rxjs/Subject' {
  interface Subject<T> {
    lift<R>(operator: Operator<T, R>): Observable<R>
  }
}
