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
  TsOptionComponent,
  TsOptionModule,
} from '@terminus/ui/option';
import {
  TsSelectModule,
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
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsOptionDisplay>{{ option.name }}</span></ts-option>
    </ts-select>
  `,
})
export class Basic {
  myCtrl = new FormControl();
  options = STATES.slice();

  // Must be overwritten with a spy in the test
  change = v => {};
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsOptionDisplay>{{ option.name }}</span></ts-option>
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
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsOptionDisplay>{{ option.name }}</span></ts-option>
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
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsOptionDisplay>{{ option.name }}</span></ts-option>
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
      <ts-option
        [value]="option.name"
        [option]="option"
        *ngFor="let option of options"
      ><span tsOptionDisplay>{{ option.name }}</span></ts-option>
    </ts-select>
  `,
})
export class SelectionChangeEventEmitters {
  myCtrl = new FormControl('Florida');
  options = STATES.slice();

  // Must be overwritten with a spy in the test
  change = v => {};
  selected = v => {};
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
      <ts-select-trigger id="foo">
        My custom trigger!
      </ts-select-trigger>
      <ts-option
        [value]="option.name"
        [option]="option"
        *ngFor="let option of options"
      >
        <span tsOptionDisplay>{{ option.name }}</span>
        <i>bar</i>
      </ts-option>
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
      <ts-option>
        <h4 tsOptionDisplay>FOO</h4>
      </ts-option>
      <ts-option
        [value]="option.name"
        [option]="option"
        *ngFor="let option of options"
      >
        {{ option.name }}
      </ts-option>
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
        <ts-option
          *ngFor="let option of group.children"
          [value]="option.slug"
          [option]="option"
          [isDisabled]="option?.disabled"
        >
          {{ option.foo }}
        </ts-option>
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
      [allowMultiple]="true"
    >
      <ts-select-optgroup
        *ngFor="let group of groups"
        [label]="group.name"
        [isDisabled]="group.disabled"
      >
        <ts-option
          *ngFor="let option of group.children"
          [value]="option.name"
          [option]="option"
          [isDisabled]="option?.disabled"
        >
          {{ option.name }}
        </ts-option>
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
      [allowMultiple]="true"
    >
      <ts-option
        *ngFor="let option of items"
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        {{ option.name }}
      </ts-option>
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
      [isDisabled]="true"
      (opened)="wasOpened($event)"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsOptionDisplay>{{ option.name }}</span></ts-option>
    </ts-select>
  `,
})
export class Disabled {
  myCtrl = new FormControl();
  options = STATES.slice();

  wasOpened = v => {};
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [isDisabled]="true"
      [delimiter]="delimiter"
      [allowMultiple]="true"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsOptionDisplay>{{ option.name }}</span></ts-option>
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
      [allowMultiple]="true"
      [sortComparator]="myComparator"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-select>
  `,
})
export class SelectOptionChange {
  myCtrl = new FormControl(['Texas', 'Florida']);
  options: State[] = STATES.slice(0, 10);
  // tslint:disable: max-line-length
  myComparator: TsSelectSortComparatorFunction = (a: TsOptionComponent, b: TsOptionComponent, options: TsOptionComponent[]) => {
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
      <ts-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of foods"
      >{{ option.name }}</ts-option>
    </ts-select>
  `,
})
export class CustomCompareFn {
  foods: ({value: string; viewValue: string})[] = [
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
  selectedFood: {value: string; viewValue: string} = {
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
  setFoodByCopy(newValue: {value: string; viewValue: string}) {
    this.selectedFood = {
      ...{},
      ...newValue,
    };
  }
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of items"
      ><span tsOptionDisplay>{{ option.name }}</span></ts-option>
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
      [hideRequiredMarker]="hideRequired"
      [isRequired]="true"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
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
      [hint]="myHint"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-select>
  `,
})
export class Hint {
  myCtrl = new FormControl();
  myHint = 'foo';
  options = STATES.slice();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [id]="myId"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-select>
  `,
})
export class Id {
  myCtrl = new FormControl();
  myId = 'foo';
  options = STATES.slice();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [label]="myLabel"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-select>
  `,
})
export class Label {
  myCtrl = new FormControl();
  myLabel = 'foo bar';
  options = STATES.slice();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [tabIndex]="index"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-select>
  `,
})
export class Tabindex {
  myCtrl = new FormControl();
  index = 4;
  options = STATES.slice();
}

@Component({
  template: `
    <ts-select
      [formControl]="myCtrl"
      [validateOnChange]="validateOnChange"
    >
      <ts-option
        [value]="option.name"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-select>
  `,
})
export class ValidateOnChange {
  myCtrl = new FormControl(null, Validators.required);
  validateOnChange = true;
  options = STATES.slice();
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
      <ts-option
        [value]="option.value"
        [option]="option"
        *ngFor="let option of items"
      >{{ option.viewValue }}</ts-option>
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
      <ts-option
        [value]="state.name"
        [option]="state"
        [id]="state.name"
        *ngFor="let state of items"
        (selectionChange)="change($event)"
      >
        {{ state.name }}
      </ts-option>
    </ts-select>
  `,
})
export class OptionId {
  myCtrl = new FormControl();
  items = STATES.slice(0, 4);
  change = v => {};
}

@Component({
  template: `
    <ts-select [formControl]="myCtrl">
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
        <ts-option
          *ngFor="let option of group.children"
          [value]="option.name"
          [option]="option"
        >
          {{ option.name }}
        </ts-option>
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
      <ts-option
        [value]="option.name"
        [option]="option"
        *ngFor="let option of options"
      >
        {{ option.name }}
      </ts-option>
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
      <ts-option
        [value]="option.name"
        [option]="option"
        *ngFor="let option of options"
      >
        {{ option.name }}
      </ts-option>
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
    if (value) {
      const regex = new RegExp(value, 'i');
      this.options = STATES.slice().filter(state => state.name.match(regex));
    } else {
      this.options = STATES.slice();
    }
  }
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
    TsOptionModule,
  ],
  declarations: [
    Basic,
    CustomBlankOption,
    CustomCompareFn,
    CustomDelimiter,
    CustomOptionTemplate,
    CustomTrigger,
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
    SeededFallbackValue,
    SeededFormControl,
    SeededNgModel,
    SelectionChangeEventEmitters,
    SelectOptionChange,
    Tabindex,
    ValidateOnChange,
  ],
})
export class TsSelectTestComponentsModule {}
