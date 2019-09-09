import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  Validators,
} from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { TsChipCollectionComponent } from '@terminus/ui/chip';


export interface State {
  name: string;
  population: string;
}


@Component({
  selector: 'demo-autocomplete',
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent {
  @ViewChild(TsChipCollectionComponent, { static: false })
  public list!: TsChipCollectionComponent;

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
    },
    {
      name: 'Alabama',
      population: '3.29M',
    },
    {
      name: 'Alaska',
      population: '1.341M',
    },
    {
      name: 'CALIFORNIA',
      population: '39.14M',
    },
    {
      name: 'Florida',
      population: '20.27M',
    },
    {
      name: 'Texas',
      population: '27.47M',
    },
    {
      name: 'Arizona',
      population: '24.112M',
    },
    {
      name: 'Arkansas 2',
      population: '2.978M',
    },
    {
      name: 'Alabama 2',
      population: '3.29M',
    },
    {
      name: 'Alaska 2',
      population: '1.341M',
    },
    {
      name: 'California 2',
      population: '39.14M',
    },
    {
      name: 'Florida 2',
      population: '20.27M',
    },
    {
      name: 'Texas 2',
      population: '27.47M',
    },
    {
      name: 'Arizona 2',
      population: '24.112M',
    },
    {
      name: 'Arkansas 3',
      population: '2.978M',
    },
    {
      name: 'Alabama 3',
      population: '3.29M',
    },
    {
      name: 'Alaska 3',
      population: '1.341M',
    },
    {
      name: 'California 3',
      population: '39.14M',
    },
    {
      name: 'Florida 3',
      population: '20.27M',
    },
    {
      name: 'Texas 3',
      population: '27.47M',
    },
    {
      name: 'Arizona 3',
      population: '24.112M',
    },
  ];
  filteredStates!: Observable<State[]>;
  myQuery$: BehaviorSubject<string> = new BehaviorSubject('');
  fakeAsync = false;

  stateCtrl = new FormControl([this.states[4]], [Validators.required]);
  singleStateCtrl = new FormControl([this.states[4]], [Validators.required]);

  constructor() {

    this.filteredStates = this.myQuery$
      .pipe(
        map(state => {
          const val = state ? this.filterStates(state) : [];
          console.log('Demo: in pipe: ', state, val);
          return val;
        }),
      );
  }

  ngOnInit() {
  }

  private filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  log(v: any): void {
    console.log('DEMO: Form value: ', v);
  }

  queryHasChanged(v) {
    console.log('DEMO: query string changed: ', v);
    this.myQuery$.next(v);
  }

  duplicate(e) {
    console.log('DEMO: Duplicate selection: ', e);
  }

  formatter(value: State): string {
    return value.name;
  }
}
