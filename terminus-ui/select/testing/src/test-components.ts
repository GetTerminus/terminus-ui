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
import {
  TsSelectModule,
  TsSelectOptionComponent,
  TsSelectSortComparatorFunction,
} from '@terminus/ui/select';


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
  public myCtrl = new FormControl();
  public options = STATES.slice();

  // Must be overwritten with a spy in the test
  public change = v => {};
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
  public myCtrl = new FormControl('Florida');
  public options = STATES.slice();
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
  public myModel = 'Florida';
  public options = STATES.slice();
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
  public myValue = 'Florida';
  public options = STATES.slice();
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
  public myCtrl = new FormControl('Florida');
  public options = STATES.slice();

  // Must be overwritten with a spy in the test
  public change = v => {};
  public selected = v => {};
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
  public myCtrl = new FormControl('Florida');
  public options = STATES.slice();
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
  public myCtrl = new FormControl('Florida');
  public options = STATES.slice();
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
  public myCtrl = new FormControl('Florida');
  public groups = STATES_GROUPED.slice();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [allowMultiple]="true"
    >
      <ts-select-optgroup
        *ngFor="let group of groups"
        [label]="group.name"
        [isDisabled]="group.disabled"
      >
        <ts-select-option
          *ngFor="let option of group.children"
          [value]="option.name"
          [option]="option"
          [isDisabled]="option?.disabled"
        >
          {{ option.name }}
        </ts-select-option>
      </ts-select-optgroup>
    </ts-select>
  `,
})
export class OptgroupsMultiple {
  public myCtrl = new FormControl();
  public groups = STATES_GROUPED.slice();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [allowMultiple]="true"
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
  public myCtrl = new FormControl();
  public items = STATES.slice();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [autocomplete]="true"
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
  public myCtrl = new FormControl();
  public states: State[] = STATES.slice();
  public showProgress = false;
  public allowMultiple = true;
  public keepOpen = true;
  public disabled: boolean | undefined;

  public changeOptionsLength() {
    this.states = STATES.slice(0, 5);
  }
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [autocomplete]="true"
      [allowMultiple]="true"
    >
      <ts-select-option
        *ngFor="let option of states"
        [value]="option.slug"
        [option]="option"
      >
        {{ option.foo }}
      </ts-select-option>
    </ts-select>
  `,
})
export class AutocompleteRequired {
  public myCtrl = new FormControl(null, [Validators.required]);
  public states: State[] = STATES.slice();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [autocomplete]="true"
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
  public myCtrl = new FormControl(['Florida']);
  public states: State[] = STATES.slice();
  public allowMultiple = true;
  public allowDuplicates = false;
  public keepOpen = false;

  // Must be overwritten with a spy in the test
  public duplicate = v => {};
}

@Component({
  template: `
    <ts-select
      [(ngModel)]="myModel"
      [autocomplete]="true"
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
  public myModel = ['Florida'];
  public states: State[] = STATES.slice();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [autocomplete]="true"
      [allowMultiple]="allowMultiple"
      [autocompleteReopenAfterSelection]="false"
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
  public myCtrl = new FormControl();
  public states: State[] = STATES.slice();
  public allowMultiple = true;
}

@Component({
  template: `
    <ts-select
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
    </ts-select>
  `,
})
export class Disabled {
  public myCtrl = new FormControl();
  public options = STATES.slice();

  public wasOpened = v => {};
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [isDisabled]="true"
      [delimiter]="delimiter"
      [allowMultiple]="true"
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
  public myCtrl = new FormControl(['Florida', 'Texas']);
  public options = STATES.slice();
  public delimiter = '-';
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [allowMultiple]="true"
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
  public myCtrl = new FormControl(['Texas', 'Florida']);
  public options: State[] = STATES.slice(0, 10);
  public myComparator: TsSelectSortComparatorFunction = (
    a: TsSelectOptionComponent,
    b: TsSelectOptionComponent,
    options: TsSelectOptionComponent[],
  ) => {
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

  public updateOptions() {
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
  public foods: ({value: string; viewValue: string})[] = [
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
  public selectedFood: {value: string; viewValue: string} = {
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
  public setFoodByCopy(newValue: {value: string; viewValue: string}) {
    this.selectedFood = {
      ...{},
      ...newValue,
    };
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
  public myCtrl = new FormControl('Florida');
  public items: any[] = [];

  public updateOptions() {
    this.items = STATES.slice();
  }
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [autocomplete]="true"
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
  public myCtrl = new FormControl(['Florida', 'Texas']);
  public options = STATES.slice();
  public change = v => {};
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      debounceDelay="0"
      [autocomplete]="true"
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
  public myCtrl = new FormControl(['Florida', 'Texas']);
  public options = STATES.slice();
  public change = v => {};
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [minimumCharacters]="customCount"
      debounceDelay="0"
      [autocomplete]="true"
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
  public myCtrl = new FormControl(['Florida', 'Texas']);
  public options = STATES.slice();
  public customCount: number | undefined;
  public change = v => {};
}

@Component({
  template: `
    <ts-select
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
    </ts-select>
  `,
})
export class HideRequired {
  public myCtrl = new FormControl();
  public options = STATES.slice();
  public hideRequired = false;
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
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
  public myCtrl = new FormControl();
  public myHint = 'foo';
  public options = STATES.slice();
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
  public myCtrl = new FormControl();
  public myId = 'foo';
  public options = STATES.slice();
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
  public myCtrl = new FormControl();
  public myLabel = 'foo bar';
  public options = STATES.slice();
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
  public myCtrl = new FormControl();
  public index = 4;
  public autocomplete = false;
  public options = STATES.slice();
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
  public myCtrl = new FormControl(null, Validators.required);
  public validateOnChange = true;
  public options = STATES.slice();
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
  public myCtrl = new FormControl();
  public items = STATES.slice(0, 2);
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
  public myCtrl = new FormControl();
  public items = STATES.slice(0, 4);
  public change = v => {};
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
  public myCtrl = new FormControl();
  public groups = STATES_GROUPED.slice();
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
  public myCtrl = new FormControl('Florida');
  public groups = STATES_GROUPED.slice();
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
  public myCtrl = new FormControl();
  public options = STATES.slice();
  public myId = 'foo';
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
  public myCtrl = new FormControl();
  public options = STATES.slice();

  public onReset(): void {
    this.options = STATES.slice();
  }

  public onFilter(value: string): void {
    if (value) {
      const regex = new RegExp(value, 'i');
      this.options = STATES.slice().filter(state => state.name.match(regex));
    } else {
      this.options = STATES.slice();
    }
  }
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [autocomplete]="true"
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
  public myCtrl = new FormControl([{
    name: 'Florida',
    population: '20.27M',
  }]);
  public states: State[] = STATES.slice();
  public allowMultiple = true;
  public allowDuplicates = false;
  public keepOpen = false;
  public duplicate = jest.fn();
  public myFormatFn = (v: any) => v.name;
}



/**
 * NOTE: Currently all exported Components must belong to a module. So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TsSelectModule,
  ],
  declarations: [
    Autocomplete,
    AutocompleteAllowMultipleNoReopen,
    AutocompleteRequired,
    Basic,
    CustomBlankOption,
    CustomCharacterCount,
    CustomCompareFn,
    CustomDebounce,
    CustomDelimiter,
    CustomOptionTemplate,
    CustomTrigger,
    Debounce,
    DeferOptionSelectionStream,
    Disabled,
    Filterable,
    HideRequired,
    Hint,
    Id,
    Label,
    NoGroupsMultiple,
    NullSelection,
    OptgroupBadIDs,
    OptgroupIDs,
    Optgroups,
    OptgroupsMultiple,
    OptionError,
    OptionId,
    SeededAutocomplete,
    SeededAutocompleteWithFormatFn,
    SeededFallbackValue,
    SeededFormControl,
    SeededNgModel,
    SeededNgModelAutocomplete,
    SelectionChangeEventEmitters,
    SelectOptionChange,
    Tabindex,
    ValidateOnChange,
  ],
})
export class TsSelectTestComponentsModule {}
