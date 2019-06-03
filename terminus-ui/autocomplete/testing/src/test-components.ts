// tslint:disable: component-class-suffix
import { CommonModule } from '@angular/common';
import {
  Component, NgModule,
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
      <ts-select-option
        *ngFor="let option of states"
        [value]="option.slug"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        {{ option.foo }}
      </ts-select-option>
    </ts-autocomplete>
  `,
})
export class Autocomplete {
  myCtrl = new FormControl();
  states: State[] = STATES.slice();
  showProgress = false;
  allowMultiple = true;
  keepOpen = true;
  disabled: boolean | undefined;
  change = v => {};

  changeOptionsLength() {
    this.states = STATES.slice(0, 5);
  }
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [allowMultiple]="true"
    >
      <ts-select-option
        *ngFor="let option of states"
        [value]="option.slug"
        [option]="option"
      >
        {{ option.foo }}
      </ts-select-option>
    </ts-autocomplete>
  `,
})
export class AutocompleteRequired {
  myCtrl = new FormControl(null, [Validators.required]);
  states: State[] = STATES.slice();
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
      <ts-select-option
        *ngFor="let option of states"
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        <span tsSelectOptionDisplay>
          {{ option.name }}
        </span>
      </ts-select-option>
    </ts-autocomplete>
  `,
})
export class SeededAutocomplete {
  myCtrl = new FormControl(['Florida']);
  states: State[] = STATES.slice();
  allowMultiple = true;
  allowDuplicates = false;
  keepOpen = false;

  // Must be overwritten with a spy in the test
  duplicate = v => { };
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [allowMultiple]="allowMultiple"
      [allowDuplicateSelections]="allowDuplicates"
      [reopenAfterSelection]="keepOpen"
    >
      <ts-select-option
        *ngFor="let option of states"
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        <span tsSelectOptionDisplay>
          {{ option.name }}
        </span>
      </ts-select-option>
    </ts-autocomplete>
  `,
})
export class PassingInObjectValue {
  myCtrl = new FormControl([{name: 'Florida'}]);
  states: State[] = STATES.slice();
  allowMultiple = false;
  allowDuplicates = false;
  keepOpen = false;

  // Must be overwritten with a spy in the test
  duplicate = v => { };
}

@Component({
  template: `
    <ts-autocomplete
      [(ngModel)]="myModel"
    >
      <ts-select-option
        *ngFor="let option of states"
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        <span tsSelectOptionDisplay>
          {{ option.name }}
        </span>
      </ts-select-option>
    </ts-autocomplete>
  `,
})
export class SeededNgModelAutocomplete {
  myModel = ['Florida'];
  states: State[] = STATES.slice();
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [allowMultiple]="allowMultiple"
      [reopenAfterSelection]="false"
    >
      <ts-select-option
        *ngFor="let option of states"
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        <span tsSelectOptionDisplay>
          {{ option.name }}
        </span>
      </ts-select-option>
    </ts-autocomplete>
  `,
})
export class AutocompleteAllowMultipleNoReopen {
  myCtrl = new FormControl();
  states: State[] = STATES.slice();
  allowMultiple = true;
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [isDisabled]="true"
      (opened)="wasOpened($event)"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsSelectOptionDisplay>{{ option.name }}</span></ts-select-option>
    </ts-autocomplete>
  `,
})
export class Disabled {
  myCtrl = new FormControl();
  options = STATES.slice();

  wasOpened = v => { };
}


@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [allowMultiple]="true"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-autocomplete>
  `,
})
export class SelectOptionChange {
  myCtrl = new FormControl(['Texas', 'Florida']);
  options: State[] = STATES.slice(0, 10);

  updateOptions() {
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
      <ts-select-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of foods"
      >{{ option.name }}</ts-select-option>
    </ts-autocomplete>
  `,
})
export class CustomCompareFn {
  foods: ({ value: string; viewValue: string })[] = [
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
  selectedFood: { value: string; viewValue: string } = {
    value: 'pizza-1',
    viewValue: 'Pizza',
  };

  comparator: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  useCompareByValue() {
    this.comparator = this.compareByValue;
  }
  useCompareByReference() {
    this.comparator = this.compareByReference;
  }
  useNullComparator() {
    this.comparator = null;
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.value === f2.value;
  }
  compareByReference(f1: any, f2: any) {
    return f1 === f2;
  }
  setFoodByCopy(newValue: { value: string; viewValue: string }) {
    this.selectedFood = {
      ...{},
      ...newValue,
    };
  }
}

@Component({
  template: `
    <ts-autocomplete [formControl]="myCtrl">
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of items"
      ><span tsSelectOptionDisplay>{{ option.name }}</span></ts-select-option>
    </ts-autocomplete>
  `,
})
export class DeferOptionSelectionStream {
  myCtrl = new FormControl('Florida');
  items: any[] = [];

  updateOptions() {
    this.items = STATES.slice();
  }
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      (queryChange)="change($event)"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-autocomplete>
  `,
})
export class Debounce {
  myCtrl = new FormControl(['Florida', 'Texas']);
  options = STATES.slice();
  change = v => { };
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      debounceDelay="0"
      (queryChange)="change($event)"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-autocomplete>
  `,
})
export class CustomDebounce {
  myCtrl = new FormControl(['Florida', 'Texas']);
  options = STATES.slice();
  change = v => { };
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [minimumCharacters]="customCount"
      debounceDelay="0"
      (queryChange)="change($event)"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-autocomplete>
  `,
})
export class CustomCharacterCount {
  myCtrl = new FormControl(['Florida', 'Texas']);
  options = STATES.slice();
  customCount: number | undefined;
  change = v => { };
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [hideRequiredMarker]="hideRequired"
      [isRequired]="true"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-autocomplete>
  `,
})
export class HideRequired {
  myCtrl = new FormControl();
  options = STATES.slice();
  hideRequired = false;
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [hint]="myHint"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-autocomplete>
  `,
})
export class Hint {
  myCtrl = new FormControl();
  myHint = 'foo';
  options = STATES.slice();
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [id]="myId"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-autocomplete>
  `,
})
export class Id {
  myCtrl = new FormControl();
  myId = 'foo';
  options = STATES.slice();
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [label]="myLabel"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-autocomplete>
  `,
})
export class Label {
  myCtrl = new FormControl();
  myLabel = 'foo bar';
  options = STATES.slice();
}


@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [validateOnChange]="validateOnChange"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-autocomplete>
  `,
})
export class ValidateOnChange {
  myCtrl = new FormControl(null, Validators.required);
  validateOnChange = true;
  options = STATES.slice();
}

@Component({
  template: `
    <ts-autocomplete [formControl]="myCtrl">
      <ts-select-option
        [value]="option.value"
        [option]="option"
        *ngFor="let option of items"
      >{{ option.viewValue }}</ts-select-option>
    </ts-autocomplete>
  `,
})
export class NullSelection {
  myCtrl = new FormControl('bar');
  items = [
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
      <ts-select-option
        [value]="state.name"
        *ngFor="let state of items"
      >
        <ng-template let-option>
          <div class="myClass">
            <h4 tsSelectOptionDisplay>{{ option?.state }}</h4>
            <small>{{ option?.population }}</small>
          </div>
        </ng-template>
      </ts-select-option>
    </ts-autocomplete>
  `,
})
export class OptionError {
  myCtrl = new FormControl();
  items = STATES.slice(0, 2);
}

@Component({
  template: `
    <ts-autocomplete [formControl]="myCtrl">
      <ts-select-option
        [value]="state.name"
        [option]="state"
        [id]="state.name"
        *ngFor="let state of items"
        (selectionChange)="change($event)"
      >
        {{ state.name }}
      </ts-select-option>
    </ts-autocomplete>
  `,
})
export class OptionId {
  myCtrl = new FormControl();
  items = STATES.slice(0, 4);
  change = v => { };
}

@Component({
  template: `
    <ts-autocomplete [formControl]="myCtrl">
      <ts-select-optgroup
        *ngFor="let group of groups"
        [id]="group.name"
        [label]="group.name"
      >
        <ts-select-option
          *ngFor="let option of group.children"
          [value]="option.name"
          [option]="option"
        >
          {{ option.name }}
        </ts-select-option>
      </ts-select-optgroup>
    </ts-autocomplete>
  `,
})
export class OptgroupIDs {
  myCtrl = new FormControl();
  groups = STATES_GROUPED.slice();
}

@Component({
  template: `
    <ts-autocomplete [formControl]="myCtrl">
      <ts-select-optgroup
        *ngFor="let group of groups"
        [id]="group.foo"
        [label]="group.name"
      >
        <ts-select-option
          *ngFor="let option of group.children"
          [value]="option.name"
          [option]="option"
        >
          {{ option.name }}
        </ts-select-option>
      </ts-select-optgroup>
    </ts-autocomplete>
  `,
})
export class OptgroupBadIDs {
  myCtrl = new FormControl('Florida');
  groups = STATES_GROUPED.slice();
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
