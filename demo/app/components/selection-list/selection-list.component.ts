import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { untilComponentDestroyed } from '@terminus/ngx-tools';
import { TsSelectionListChange } from '@terminus/ui/selection-list';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { map } from 'rxjs/operators';

import {
  State,
  STATES,
} from './data';


export type DEMOS
  = 'complexMultiple'
  | 'simple'
;


@Component({
  selector: 'demo-selection-list',
  templateUrl: './selection-list.component.html',
})
export class SelectionListComponent implements OnInit, OnDestroy {
  public isDisabledMulti = false;
  public isDisabledSingle = false;
  public allowInputMulti = true;
  public allowInputSingle = false;

  // Data
  public states = STATES.slice();

  // FormControls
  public complexMultipleControl = new FormControl('');
  public simpleControl = new FormControl('');

  // Query controls
  public complexMultipleQuery$ = new BehaviorSubject('');
  public simpleQuery$ = new BehaviorSubject('');

  // Results
  public complexMultipleResults: Observable<State[]> | undefined;
  public simpleResults: Observable<State[]> | undefined;

  // Async
  public complexMultipleAsync = false;
  public simpleAsync = false;


  /**
   * Wire up query listeners
   */
  public ngOnInit() {
    this.complexMultipleResults = this.complexMultipleQuery$
      .pipe(
        untilComponentDestroyed(this),
        map(query => this.queryStates(query)),
      );

    this.simpleResults = this.simpleQuery$
      .pipe(
        untilComponentDestroyed(this),
        map(query => this.queryStates(query)),
      );
  }

  public ngOnDestroy(): void {};

  public seedSelections(ctrl: FormControl, selections: State[] = STATES.slice(0, 8)): void {
    ctrl.setValue(selections);
  }

  public queryStates(query: string): State[] {
    query = query.toLowerCase();

    if (query) {
      const letters = query.split('').map(l => `${l}.*`).join('');
      const regex = new RegExp(letters, 'ig');
      return this.states.filter(s => !!s.name.match(regex));
    } else {
      // if no query, return first 10 states
      return STATES.slice(0, 10);
    }
  }

  public queryHasChanged(query: string, demo: DEMOS): void {
    console.log(`DEMO: '${demo}' query string changed: `, query);

    if (demo === 'complexMultiple') {
      this.complexMultipleQuery$.next(query);
    } else if (demo === 'simple') {
      this.simpleQuery$.next(query);
    }
  }

  public formatter(value: State): string {
    return value.name;
  }

  public duplicate(e: TsSelectionListChange, demo: DEMOS): void {
    console.log(`DEMO: '${demo}' duplicate selection: `, e);
  }

  public selectionChange(e: TsSelectionListChange, demo: DEMOS) {
    console.log(`DEMO: '${demo}' selection change: `, e);
  }

  public wasClosed(demo: DEMOS) {
    console.log(`DEMO: '${demo}' panel closed`);
  }

  public wasOpened(demo: DEMOS) {
    console.log(`DEMO: '${demo}' panel opened`);
  }

  public backdropClick(demo: DEMOS): void {
    console.log(`DEMO: '${demo}' backdrop clicked`);
  }

}
