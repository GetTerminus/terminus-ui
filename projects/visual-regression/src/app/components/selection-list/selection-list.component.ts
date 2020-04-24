import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { untilComponentDestroyed } from '@terminus/ngx-tools/utilities';
import { TsOption } from '@terminus/ui/option';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { map } from 'rxjs/operators';


interface State extends TsOption {
  name: string;
  abbreviation: string;
}


const STATES: State[] = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
  },
  {
    name: 'Colorado',
    abbreviation: 'CO',
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT',
  },
  {
    name: 'Delaware',
    abbreviation: 'DE',
  },
  {
    name: 'District Of Columbia',
    abbreviation: 'DC',
  },
  {
    name: 'Federated States Of Micronesia',
    abbreviation: 'FM',
  },
  {
    name: 'Florida',
    abbreviation: 'FL',
  },
  {
    name: 'Georgia',
    abbreviation: 'GA',
  },

];


type DEMOS
  = 'complexMultiple'
  | 'simple'
  ;


@Component({
  selector: 'app-selection-list',
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

  public ngOnDestroy(): void {}

  public seedSelections(ctrl: FormControl, selections: State[] = STATES.slice(0, 3)): void {
    ctrl.setValue(selections);
  }

  public queryStates(query: string): State[] {
    query = query.toLowerCase();

    if (query) {
      const letters = query.split('').map(l => `${l}.*`).join('');
      const regex = new RegExp(letters, 'ig');
      return this.states.filter(s => !!s.name.match(regex));
    }
    // if no query, return first 10 states
    return STATES.slice(0, 10);

  }

  public queryHasChanged(query: string, demo: DEMOS): void {

    if (demo === 'complexMultiple') {
      this.complexMultipleQuery$.next(query);
    } else if (demo === 'simple') {
      this.simpleQuery$.next(query);
    }
  }

  public formatter(value: State): string {
    return value.name;
  }

}
