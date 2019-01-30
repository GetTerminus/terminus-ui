// tslint:disable: component-class-suffix
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import {
  TsSelectSortComparatorFunction,
} from './../select.component';
import { TsSelectOptionComponent } from './../option/option.component';


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
    <ts-select
      [formControl]="myCtrl"
      (selectionChange)="change($event)"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsSelectOptionDisplay>{{ option.name }}</span></ts-select-option>
    </ts-select>
  `,
})
export class Basic {
  myCtrl = new FormControl();
  options = STATES.slice();
  change = jest.fn();
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsSelectOptionDisplay>{{ option.name }}</span></ts-select-option>
    </ts-select>
  `,
})
export class SeededFormControl {
  myCtrl = new FormControl('Florida');
  options = STATES.slice();
}

@Component({
  template: `
    <ts-select [(ngModel)]="myModel">
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsSelectOptionDisplay>{{ option.name }}</span></ts-select-option>
    </ts-select>
  `,
})
export class SeededNgModel {
  myModel = 'Florida';
  options = STATES.slice();
}

@Component({
  template: `
    <ts-select [value]="myValue">
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsSelectOptionDisplay>{{ option.name }}</span></ts-select-option>
    </ts-select>
  `,
})
export class SeededFallbackValue {
  myValue = 'Florida';
  options = STATES.slice();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      (optionSelected)="selected($event)"
      (selectionChange)="change($event)"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        *ngFor="let option of options"
      ><span tsSelectOptionDisplay>{{ option.name }}</span></ts-select-option>
    </ts-select>
  `,
})
export class SelectionChangeEventEmitters {
  myCtrl = new FormControl('Florida');
  options = STATES.slice();

  change = jest.fn();
  selected = jest.fn();
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
      <ts-select-trigger id="foo">
        My custom trigger!
      </ts-select-trigger>
      <ts-select-option
        [value]="option.name"
        [option]="option"
        *ngFor="let option of options"
      >
        <span tsSelectOptionDisplay>{{ option.name }}</span>
        <i>bar</i>
      </ts-select-option>
    </ts-select>
  `,
})
export class CustomOptionTemplate {
  myCtrl = new FormControl('Florida');
  options = STATES.slice();
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
      <ts-select-option>
        <h4 tsSelectOptionDisplay>FOO</h4>
      </ts-select-option>
      <ts-select-option
        [value]="option.name"
        [option]="option"
        *ngFor="let option of options"
      >
        {{ option.name }}
      </ts-select-option>
    </ts-select>
  `,
})
export class CustomBlankOption {
  myCtrl = new FormControl('Florida');
  options = STATES.slice();
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
      <ts-select-optgroup
        *ngFor="let group of groups"
        [label]="group.name"
        [isDisabled]="group.disabled"
      >
        <ts-select-option
          *ngFor="let option of group.children"
          [value]="option.slug"
          [option]="option"
          [isDisabled]="option?.disabled"
        >
          {{ option.foo }}
        </ts-select-option>
      </ts-select-optgroup>
    </ts-select>
  `,
})
export class Optgroups {
  myCtrl = new FormControl('Florida');
  groups = STATES_GROUPED.slice();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      allowMultiple="true"
    >
      <ts-select-optgroup
        *ngFor="let group of groups"
        [label]="group.name"
        [isDisabled]="group.disabled"
      >
        <ts-select-option
          *ngFor="let option of group.children"
          [value]="option.slug"
          [option]="option"
          [isDisabled]="option?.disabled"
        >
          {{ option.foo }}
        </ts-select-option>
      </ts-select-optgroup>
    </ts-select>
  `,
})
export class OptgroupsMultiple {
  myCtrl = new FormControl();
  groups = STATES_GROUPED.slice();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      allowMultiple="true"
    >
      <ts-select-option
        *ngFor="let option of items"
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        {{ option.name }}
      </ts-select-option>
    </ts-select>
  `,
})
export class NoGroupsMultiple {
  myCtrl = new FormControl();
  items = STATES.slice();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      autocomplete="true"
      [allowMultiple]="allowMultiple"
      [autocompleteReopenAfterSelection]="keepOpen"
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
    </ts-select>
  `,
})
export class Autocomplete {
  myCtrl = new FormControl();
  states: State[] = STATES.slice();
  showProgress = false;
  allowMultiple = true;
  keepOpen = true;
  disabled: boolean | undefined;

  changeOptionsLength() {
    this.states = STATES.slice(0, 5);
  }
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      autocomplete="true"
      [allowMultiple]="allowMultiple"
      [autocompleteAllowDuplicateSelections]="allowDuplicates"
      [autocompleteReopenAfterSelection]="keepOpen"
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
    </ts-select>
  `,
})
export class SeededAutocomplete {
  myCtrl = new FormControl(['Florida']);
  states: State[] = STATES.slice();
  allowMultiple = true;
  allowDuplicates = false;
  keepOpen = false;

  duplicate = jest.fn();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      autocomplete="true"
      [allowMultiple]="allowMultiple"
      [autocompleteAllowDuplicateSelections]="allowDuplicates"
      [autocompleteReopenAfterSelection]="keepOpen"
      [chipFormatUIFn]="myFormatFn"
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
    </ts-select>
  `,
})
export class SeededAutocompleteWithFormatFn {
  myCtrl = new FormControl([{ name: 'Florida', population: '20.27M'}]);
  states: State[] = STATES.slice();
  allowMultiple = true;
  allowDuplicates = false;
  keepOpen = false;
  duplicate = jest.fn();
  myFormatFn = (v: any) => v.name;
}

@Component({
  template: `
    <ts-select
      [(ngModel)]="myModel"
      autocomplete="true"
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
    </ts-select>
  `,
})
export class SeededNgModelAutocomplete {
  myModel = ['Florida'];
  states: State[] = STATES.slice();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      autocomplete="true"
      [allowMultiple]="allowMultiple"
      autocompleteReopenAfterSelection="false"
      (queryChange)="queryChange($event)"
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
    </ts-select>
  `,
})
export class AutocompleteAllowMultipleNoReopen {
  myCtrl = new FormControl();
  states: State[] = STATES.slice();
  allowMultiple = true;

  queryChange = jest.fn();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      isDisabled="true"
      (opened)="wasOpened($event)"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsSelectOptionDisplay>{{ option.name }}</span></ts-select-option>
    </ts-select>
  `,
})
export class Disabled {
  myCtrl = new FormControl();
  options = STATES.slice();

  wasOpened = jest.fn();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      isDisabled="true"
      [delimiter]="delimiter"
      allowMultiple="true"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsSelectOptionDisplay>{{ option.name }}</span></ts-select-option>
    </ts-select>
  `,
})
export class CustomDelimiter {
  myCtrl = new FormControl(['Florida', 'Texas']);
  options = STATES.slice();
  delimiter = '-';
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      allowMultiple="true"
      [sortComparator]="myComparator"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-select>
  `,
})
export class SelectOptionChange {
  myCtrl = new FormControl(['Texas', 'Florida']);
  options: State[] = STATES.slice(0, 10);
  // tslint:disable: max-line-length
  myComparator: TsSelectSortComparatorFunction = (a: TsSelectOptionComponent, b: TsSelectOptionComponent, options: TsSelectOptionComponent[]) => {
    // tslint:enable: max-line-length
    const one = a.viewValue.toLowerCase();
    const two = b.viewValue.toLowerCase();

    if (one < two) {
      return -1;
    }
    if (one > two) {
      return 1;
    }
    return 0;
  }

  updateOptions() {
    const otherStates: State[] = STATES.slice(10, 14);
    this.options.push(...otherStates);
  }
}

@Component({
  template: `
    <ts-select
      [ngModel]="selectedFood"
      (ngModelChange)="setFoodByCopy($event)"
      [compareWith]="comparator"
    >
      <ts-select-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of foods"
      >{{ option.name }}</ts-select-option>
    </ts-select>
  `,
})
export class CustomCompareFn {
  /*
   *myCtrl = new FormControl({ value: 'pizza-1', viewValue: 'Pizza' });
   */
  foods: ({value: string; viewValue: string})[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  selectedFood: {value: string; viewValue: string} = { value: 'pizza-1', viewValue: 'Pizza' };

  comparator: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  useCompareByValue() { this.comparator = this.compareByValue; }
  useCompareByReference() { this.comparator = this.compareByReference; }
  useNullComparator() { this.comparator = null; }

  compareByValue(f1: any, f2: any) { return f1 && f2 && f1.value === f2.value; }
  compareByReference(f1: any, f2: any) { return f1 === f2; }
  setFoodByCopy(newValue: {value: string; viewValue: string}) {
    this.selectedFood = {...{}, ...newValue};
  }
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of items"
      ><span tsSelectOptionDisplay>{{ option.name }}</span></ts-select-option>
    </ts-select>
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
    <ts-select
      [formControl]="myCtrl"
      autocomplete="true"
      (queryChange)="change($event)"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-select>
  `,
})
export class Debounce {
  myCtrl = new FormControl(['Florida', 'Texas']);
  options = STATES.slice();
  change = jest.fn();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      debounceDelay="0"
      autocomplete="true"
      (queryChange)="change($event)"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-select>
  `,
})
export class CustomDebounce {
  myCtrl = new FormControl(['Florida', 'Texas']);
  options = STATES.slice();
  change = jest.fn();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [minimumCharacters]="customCount"
      debounceDelay="0"
      autocomplete="true"
      (queryChange)="change($event)"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-select>
  `,
})
export class CustomCharacterCount {
  myCtrl = new FormControl(['Florida', 'Texas']);
  options = STATES.slice();
  customCount: number | undefined;
  change = jest.fn();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [hideRequiredMarker]="hideRequired"
      isRequired="true"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-select>
  `,
})
export class HideRequired {
  myCtrl = new FormControl();
  options = STATES.slice();
  hideRequired = false;
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [hideRequiredMarker]="hideRequired"
      [hint]="myHint"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-select>
  `,
})
export class Hint {
  myCtrl = new FormControl();
  myHint = 'foo';
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [id]="myId"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-select>
  `,
})
export class Id {
  myCtrl = new FormControl();
  myId = 'foo';
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [label]="myLabel"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-select>
  `,
})
export class Label {
  myCtrl = new FormControl();
  myLabel = 'foo bar';
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [autocomplete]="autocomplete"
      [tabIndex]="index"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-select>
  `,
})
export class Tabindex {
  myCtrl = new FormControl();
  index = 4;
  autocomplete = false;
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [validateOnChange]="validateOnChange"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-select-option>
    </ts-select>
  `,
})
export class ValidateOnChange {
  myCtrl = new FormControl(null, Validators.required);
  validateOnChange = true;
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
      <ts-select-option
        [value]="option.value"
        [option]="option"
        *ngFor="let option of items"
      >{{ option.viewValue }}</ts-select-option>
    </ts-select>
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
    <ts-select [formControl]="myCtrl">
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
    </ts-select>
  `,
})
export class OptionError {
  myCtrl = new FormControl();
  items = STATES.slice(0, 2);
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
      <ts-select-option
        [value]="state.name"
        [option]="state"
        [id]="state.name"
        *ngFor="let state of items"
        (selectionChange)="change($event)"
      >
        {{ state.name }}
      </ts-select-option>
    </ts-select>
  `,
})
export class OptionId {
  myCtrl = new FormControl();
  items = STATES.slice(0, 4);
  change = jest.fn();
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
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
    </ts-select>
  `,
})
export class OptgroupIDs {
  myCtrl = new FormControl();
  groups = STATES_GROUPED.slice();
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
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
    </ts-select>
  `,
})
export class OptgroupBadIDs {
  myCtrl = new FormControl('Florida');
  groups = STATES_GROUPED.slice();
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
      <ts-select-trigger [id]="myId">
        My custom trigger!
      </ts-select-trigger>
      <ts-select-option
        [value]="option.name"
        [option]="option"
        *ngFor="let option of options"
      >
        {{ option.name }}
      </ts-select-option>
    </ts-select>
  `,
})
export class CustomTrigger {
  myCtrl = new FormControl();
  options = STATES.slice();
  myId = 'foo';
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [isFilterable]="true"
      (queryChange)="onFilter($event)"
      (selectionChange)="onReset()"
    >
      <ts-select-option
        [value]="option.name"
        [option]="option"
        *ngFor="let option of options"
      >
        {{ option.name }}
      </ts-select-option>
    </ts-select>
  `,
})
export class Filterable {
  myCtrl = new FormControl();
  options = STATES.slice();

  onReset(): void {
    this.options = STATES.slice();
  }

  onFilter(value: string): void {
    if (!value) {
      this.options = STATES.slice();
    } else {
      const regex = new RegExp(value, 'i');
      this.options = STATES.slice().filter((state) => state.name.match(regex));
    }
  }
}

