// tslint:disable: component-class-suffix
import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validator,
  Validators,
} from '@angular/forms';
import { TsAutocompleteModule } from '@terminus/ui/autocomplete';
import { TsOptionModule } from '@terminus/ui/option';


interface State {
  name: string;
  population: string;
  disabled?: boolean;
}

const STATES: State[] = [
  {
    name: 'Arkansas',
    population: '2.978M',
  },
  {
    name: 'Alabama',
    population: '3.29M',
    disabled: true,
  },
  {
    name: 'Alaska',
    population: '1.341M',
  },
  {
    name: 'California',
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


interface GroupedStates {
  name: string;
  children: State[];
  disabled?: boolean;
}

const STATES_GROUPED: GroupedStates[] = [
  {
    name: 'Group A',
    children: [
      {
        name: 'Arkansas',
        population: '2.978M',
      },
      {
        name: 'Alabama',
        population: '3.29M',
        disabled: true,
      },
      {
        name: 'Alaska',
        population: '1.341M',
      },
    ],
  },
  {
    name: 'Group B',
    disabled: true,
    children: [
      {
        name: 'California',
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
    ],
  },
];


@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [allowMultiple]="allowMultiple"
      [reopenAfterSelection]="keepOpen"
      [showProgress]="showProgress"
      [isDisabled]="disabled"
    >
      <ts-option
        *ngFor="let option of states"
        [value]="option.slug"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        {{ option.foo }}
      </ts-option>
    </ts-autocomplete>
  `,
})
export class Autocomplete {
  public myCtrl = new FormControl();
  public states: State[] = STATES.slice();
  public showProgress = false;
  public allowMultiple = true;
  public keepOpen = true;
  public disabled: boolean | undefined;
  public change = v => {};

  public changeOptionsLength() {
    this.states = STATES.slice(0, 5);
  }
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [allowMultiple]="true"
    >
      <ts-option
        *ngFor="let option of states"
        [value]="option.slug"
        [option]="option"
      >
        {{ option.foo }}
      </ts-option>
    </ts-autocomplete>
  `,
})
export class AutocompleteRequired {
  public myCtrl = new FormControl(null, [Validators.required]);
  public states: State[] = STATES.slice();
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [allowMultiple]="allowMultiple"
      [allowDuplicateSelections]="allowDuplicates"
      [reopenAfterSelection]="keepOpen"
      (duplicateSelection)="duplicate($event)"
    >
      <ts-option
        *ngFor="let option of states"
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        <span tsOptionDisplay>
          {{ option.name }}
        </span>
      </ts-option>
    </ts-autocomplete>
  `,
})
export class SeededAutocomplete {
  public myCtrl = new FormControl(['Florida']);
  public states: State[] = STATES.slice();
  public allowMultiple = true;
  public allowDuplicates = false;
  public keepOpen = false;

  // Must be overwritten with a spy in the test
  public duplicate = v => { };
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [allowMultiple]="allowMultiple"
      [allowDuplicateSelections]="allowDuplicates"
      [reopenAfterSelection]="keepOpen"
    >
      <ts-option
        *ngFor="let option of states"
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        <span tsOptionDisplay>
          {{ option.name }}
        </span>
      </ts-option>
    </ts-autocomplete>
  `,
})
export class PassingInObjectValue {
  public myCtrl = new FormControl([{name: 'Florida'}]);
  public states: State[] = STATES.slice();
  public allowMultiple = false;
  public allowDuplicates = false;
  public keepOpen = false;

  // Must be overwritten with a spy in the test
  public duplicate = v => { };
}

@Component({
  template: `
    <ts-autocomplete
      [(ngModel)]="myModel"
    >
      <ts-option
        *ngFor="let option of states"
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        <span tsOptionDisplay>
          {{ option.name }}
        </span>
      </ts-option>
    </ts-autocomplete>
  `,
})
export class SeededNgModelAutocomplete {
  public myModel = ['Florida'];
  public states: State[] = STATES.slice();
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [allowMultiple]="allowMultiple"
      [reopenAfterSelection]="false"
    >
      <ts-option
        *ngFor="let option of states"
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        <span tsOptionDisplay>
          {{ option.name }}
        </span>
      </ts-option>
    </ts-autocomplete>
  `,
})
export class AutocompleteAllowMultipleNoReopen {
  public myCtrl = new FormControl();
  public states: State[] = STATES.slice();
  public allowMultiple = true;
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [isDisabled]="true"
      (opened)="wasOpened($event)"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsOptionDisplay>{{ option.name }}</span></ts-option>
    </ts-autocomplete>
  `,
})
export class Disabled {
  public myCtrl = new FormControl();
  public options = STATES.slice();

  public wasOpened = v => { };
}


@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [allowMultiple]="true"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-autocomplete>
  `,
})
export class SelectOptionChange {
  public myCtrl = new FormControl(['Texas', 'Florida']);
  public options: State[] = STATES.slice(0, 10);

  public updateOptions() {
    const otherStates: State[] = STATES.slice(10, 14);
    this.options.push(...otherStates);
  }
}

@Component({
  template: `
    <ts-autocomplete
      [ngModel]="selectedFood"
      (ngModelChange)="setFoodByCopy($event)"
    >
      <ts-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of foods"
      >{{ option.name }}</ts-option>
    </ts-autocomplete>
  `,
})
export class CustomCompareFn {
  public foods: ({ value: string; viewValue: string })[] = [
    {
      value: 'steak-0',
      viewValue: 'Steak',
    },
    {
      value: 'pizza-1',
      viewValue: 'Pizza',
    },
    {
      value: 'tacos-2',
      viewValue: 'Tacos',
    },
  ];
  public selectedFood: { value: string; viewValue: string } = {
    value: 'pizza-1',
    viewValue: 'Pizza',
  };

  public comparator: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  public useCompareByValue() {
    this.comparator = this.compareByValue;
  }
  public useCompareByReference() {
    this.comparator = this.compareByReference;
  }
  public useNullComparator() {
    this.comparator = null;
  }

  public compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.value === f2.value;
  }
  public compareByReference(f1: any, f2: any) {
    return f1 === f2;
  }
  public setFoodByCopy(newValue: { value: string; viewValue: string }) {
    this.selectedFood = {
      ...{},
      ...newValue,
    };
  }
}

@Component({
  template: `
    <ts-autocomplete [formControl]="myCtrl">
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of items"
      ><span tsOptionDisplay>{{ option.name }}</span></ts-option>
    </ts-autocomplete>
  `,
})
export class DeferOptionSelectionStream {
  public myCtrl = new FormControl('Florida');
  public items: any[] = [];

  public updateOptions() {
    this.items = STATES.slice();
  }
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      (queryChange)="change($event)"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-autocomplete>
  `,
})
export class Debounce {
  public myCtrl = new FormControl(['Florida', 'Texas']);
  public options = STATES.slice();
  public change = v => { };
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      debounceDelay="0"
      (queryChange)="change($event)"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-autocomplete>
  `,
})
export class CustomDebounce {
  public myCtrl = new FormControl(['Florida', 'Texas']);
  public options = STATES.slice();
  public change = v => { };
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [minimumCharacters]="customCount"
      debounceDelay="0"
      (queryChange)="change($event)"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-autocomplete>
  `,
})
export class CustomCharacterCount {
  public myCtrl = new FormControl(['Florida', 'Texas']);
  public options = STATES.slice();
  public customCount: number | undefined;
  public change = v => { };
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [hideRequiredMarker]="hideRequired"
      [isRequired]="true"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-autocomplete>
  `,
})
export class HideRequired {
  public myCtrl = new FormControl();
  public options = STATES.slice();
  public hideRequired = false;
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [hint]="myHint"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-autocomplete>
  `,
})
export class Hint {
  public myCtrl = new FormControl();
  public myHint = 'foo';
  public options = STATES.slice();
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [id]="myId"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-autocomplete>
  `,
})
export class Id {
  public myCtrl = new FormControl();
  public myId = 'foo';
  public options = STATES.slice();
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [label]="myLabel"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-autocomplete>
  `,
})
export class Label {
  public myCtrl = new FormControl();
  public myLabel = 'foo bar';
  public options = STATES.slice();
}


@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [validateOnChange]="validateOnChange"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-autocomplete>
  `,
})
export class ValidateOnChange {
  public myCtrl = new FormControl(null, Validators.required);
  public validateOnChange = true;
  public options = STATES.slice();
}

@Component({
  template: `
    <ts-autocomplete [formControl]="myCtrl">
      <ts-option
        [value]="option.value"
        [option]="option"
        *ngFor="let option of items"
      >{{ option.viewValue }}</ts-option>
    </ts-autocomplete>
  `,
})
export class NullSelection {
  public myCtrl = new FormControl('bar');
  public items = [
    {
      value: 'foo',
      viewValue: 'foo view',
    },
    {
      value: null,
      viewValue: null,
    },
    {
      value: 'bar',
      viewValue: 'bar view',
    },
  ];
}

@Component({
  template: `
    <ts-autocomplete [formControl]="myCtrl">
      <ts-option
        [value]="state.name"
        *ngFor="let state of items"
      >
        <ng-template let-option>
          <div class="myClass">
            <h4 tsOptionDisplay>{{ option?.state }}</h4>
            <small>{{ option?.population }}</small>
          </div>
        </ng-template>
      </ts-option>
    </ts-autocomplete>
  `,
})
export class OptionError {
  public myCtrl = new FormControl();
  public items = STATES.slice(0, 2);
}

@Component({
  template: `
    <ts-autocomplete [formControl]="myCtrl">
      <ts-option
        [value]="state.name"
        [option]="state"
        [id]="state.name"
        *ngFor="let state of items"
        (selectionChange)="change($event)"
      >
        {{ state.name }}
      </ts-option>
    </ts-autocomplete>
  `,
})
export class OptionId {
  public myCtrl = new FormControl();
  public items = STATES.slice(0, 4);
  public change = v => { };
}

@Component({
  template: `
    <ts-autocomplete [formControl]="myCtrl">
      <ts-select-optgroup
        *ngFor="let group of groups"
        [id]="group.name"
        [label]="group.name"
      >
        <ts-option
          *ngFor="let option of group.children"
          [value]="option.name"
          [option]="option"
        >
          {{ option.name }}
        </ts-option>
      </ts-select-optgroup>
    </ts-autocomplete>
  `,
})
export class OptgroupIDs {
  public myCtrl = new FormControl();
  public groups = STATES_GROUPED.slice();
}

@Component({
  template: `
    <ts-autocomplete [formControl]="myCtrl">
      <ts-select-optgroup
        *ngFor="let group of groups"
        [id]="group.foo"
        [label]="group.name"
      >
        <ts-option
          *ngFor="let option of group.children"
          [value]="option.name"
          [option]="option"
        >
          {{ option.name }}
        </ts-option>
      </ts-select-optgroup>
    </ts-autocomplete>
  `,
})
export class OptgroupBadIDs {
  public myCtrl = new FormControl('Florida');
  public groups = STATES_GROUPED.slice();
}


/**
 * NOTE: Currently all exported Components must belong to a module. So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TsAutocompleteModule,
    TsOptionModule,
  ],
  declarations: [
    Autocomplete,
    AutocompleteAllowMultipleNoReopen,
    AutocompleteRequired,
    CustomCharacterCount,
    CustomCompareFn,
    CustomDebounce,
    Debounce,
    DeferOptionSelectionStream,
    Disabled,
    HideRequired,
    Hint,
    Id,
    Label,
    NullSelection,
    OptgroupBadIDs,
    OptgroupIDs,
    OptionError,
    OptionId,
    SeededAutocomplete,
    PassingInObjectValue,
    SeededNgModelAutocomplete,
    SelectOptionChange,
    ValidateOnChange,
  ],
})
export class TsAutocompleteTestComponentsModule { }
