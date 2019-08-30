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
  Validators,
} from '@angular/forms';
import { TsOptionModule } from '@terminus/ui/option';
import {
  TsSelectionListChange,
  TsSelectionListFormatter,
  TsSelectionListModule,
} from '@terminus/ui/selection-list';


interface State {
  name: string;
  population: string;
  disabled?: boolean;
}

export const STATES: State[] = [
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
    <ts-selection-list
      [formControl]="myCtrl"
      [allowMultiple]="allowMultiple"
      [reopenAfterSelection]="keepOpen"
      [showProgress]="showProgress"
      [isDisabled]="disabled"
    >
      <ts-option
        *ngFor="let option of states"
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        {{ option.foo }}
      </ts-option>
    </ts-selection-list>
  `,
})
export class Basic {
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
    <ts-selection-list
      [formControl]="myCtrl"
      [allowMultiple]="allowMultiple"
      [reopenAfterSelection]="keepOpen"
      [showProgress]="showProgress"
      [isDisabled]="disabled"
    >
      <ts-option
        *ngFor="let option of states"
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        {{ option.foo }}
      </ts-option>
    </ts-selection-list>

    <ts-selection-list
      [formControl]="secondCtrl"
      [allowMultiple]="allowMultiple"
      [reopenAfterSelection]="keepOpen"
      [showProgress]="showProgress"
      [isDisabled]="disabled"
    >
      <ts-option
        *ngFor="let option of states"
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        {{ option.foo }}
      </ts-option>
    </ts-selection-list>
  `,
})
export class Multiple {
  public myCtrl = new FormControl();
  public secondCtrl = new FormControl();
  public states: State[] = STATES.slice();
  public showProgress = false;
  public allowMultiple = true;
  public keepOpen = true;
  public disabled: boolean | undefined;
  public change = v => { };

  public changeOptionsLength() {
    this.states = STATES.slice(0, 5);
  }
}

@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      [allowMultiple]="true"
    >
      <ts-option
        *ngFor="let option of states"
        [value]="option"
        [option]="option"
      >
        {{ option.foo }}
      </ts-option>
    </ts-selection-list>
  `,
})
export class Required {
  public myCtrl = new FormControl(null, [Validators.required]);
  public states: State[] = STATES.slice();
}

@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      [allowMultiple]="allowMultiple"
      [allowDuplicateSelections]="allowDuplicates"
      [reopenAfterSelection]="keepOpen"
      [displayFormatter]="formatter"
      (duplicateSelection)="duplicate($event)"
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
    </ts-selection-list>
  `,
})
export class Seeded {
  public states: State[] = STATES.slice();
  public myCtrl = new FormControl([STATES[4]]);
  public allowMultiple = true;
  public allowDuplicates = false;
  public keepOpen = false;
  public formatter: TsSelectionListFormatter | undefined;

  // Must be overwritten with a spy in the test
  public duplicate = v => { };

  public setNewStates() {
    this.states = STATES.slice(3, 7);
  }

  public setFormatter() {
    this.formatter = v => (v as State).population;
  }
}

@Component({
  template: `
    <ts-selection-list
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
    </ts-selection-list>
  `,
})
export class PassingInObjectValue {
  public states: State[] = STATES.slice();
  public myCtrl = new FormControl([STATES[4]]);
  public allowMultiple = false;
  public allowDuplicates = false;
  public keepOpen = false;

  // Must be overwritten with a spy in the test
  public duplicate = v => { };
}

@Component({
  template: `
    <ts-selection-list
      [(ngModel)]="myModel"
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
    </ts-selection-list>
  `,
})
export class SeededNgModel {
  public myModel = [STATES[4]];
  public states: State[] = STATES.slice();
}

@Component({
  template: `
    <ts-selection-list [(ngModel)]="myModel">
      <ts-option
        *ngFor="let option of states"
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        {{ option.name }}
      </ts-option>
    </ts-selection-list>
  `,
})
export class SeededNgModelError {
  public myModel = { id: 'foo' };
  public states: State[] = STATES.slice();
}

@Component({
  template: `
    <ts-selection-list [formControl]="meow">
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
    </ts-selection-list>
  `,
})
export class SeededNonArray {
  public states: State[] = STATES.slice();
  public meow = new FormControl(this.states[0]);
}

@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      [allowMultiple]="allowMultiple"
      [reopenAfterSelection]="false"
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
    </ts-selection-list>
  `,
})
export class AllowMultipleNoReopen {
  public myCtrl = new FormControl();
  public states: State[] = STATES.slice();
  public allowMultiple = true;
}

@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      [isDisabled]="true"
      (opened)="wasOpened($event)"
    >
      <ts-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      ><span tsOptionDisplay>{{ option.name }}</span></ts-option>
    </ts-selection-list>
  `,
})
export class Disabled {
  public myCtrl = new FormControl();
  public options = STATES.slice();

  public wasOpened = v => { };
}


@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      [allowMultiple]="true"
    >
      <ts-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-selection-list>
  `,
})
export class SelectOptionChange {
  public myCtrl = new FormControl([STATES[3], STATES[4]]);
  public options: State[] = STATES.slice(0, 10);

  public updateOptions() {
    const otherStates: State[] = STATES.slice(10, 14);
    this.options.push(...otherStates);
  }
}

@Component({
  template: `
    <ts-selection-list
      [ngModel]="selectedFood"
      (ngModelChange)="setFoodByCopy($event)"
    >
      <ts-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of foods"
      >{{ option.name }}</ts-option>
    </ts-selection-list>
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
    <ts-selection-list [formControl]="myCtrl">
      <ts-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of items"
      ><span tsOptionDisplay>{{ option.name }}</span></ts-option>
    </ts-selection-list>
  `,
})
export class DeferOptionSelectionStream {
  public myCtrl = new FormControl([STATES[4]]);
  public items: any[] = [];

  public updateOptions() {
    this.items = STATES.slice();
  }
}

@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      (queryChange)="change($event)"
    >
      <ts-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-selection-list>
  `,
})
export class Debounce {
  public myCtrl = new FormControl([STATES[3], STATES[4]]);
  public options = STATES.slice();
  public change = v => { };
}

@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      debounceDelay="0"
      (queryChange)="change($event)"
    >
      <ts-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-selection-list>
  `,
})
export class CustomDebounce {
  public myCtrl = new FormControl([STATES[3], STATES[4]]);
  public options = STATES.slice();
  public change = v => { };
}

@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      [minimumCharacters]="customCount"
      debounceDelay="0"
      (queryChange)="change($event)"
    >
      <ts-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-selection-list>
  `,
})
export class CustomCharacterCount {
  public myCtrl = new FormControl([STATES[3], STATES[4]]);
  public options = STATES.slice();
  public customCount: number | undefined;
  public change = v => { };
}

@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      [hideRequiredMarker]="hideRequired"
      [isRequired]="true"
    >
      <ts-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-selection-list>
  `,
})
export class HideRequired {
  public myCtrl = new FormControl();
  public options = STATES.slice();
  public hideRequired = false;
}

@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      [hint]="myHint"
    >
      <ts-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-selection-list>
  `,
})
export class Hint {
  public myCtrl = new FormControl();
  public myHint = 'foo';
  public options = STATES.slice();
}

@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      [id]="myId"
    >
      <ts-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-selection-list>
  `,
})
export class Id {
  public myCtrl = new FormControl();
  public myId = 'foo';
  public options = STATES.slice();
}

@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      [label]="myLabel"
    >
      <ts-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-selection-list>
  `,
})
export class Label {
  public myCtrl = new FormControl();
  public myLabel = 'foo bar';
  public options = STATES.slice();
}


@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      [validateOnChange]="validateOnChange"
    >
      <ts-option
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
        *ngFor="let option of options"
      >{{ option.name }}</ts-option>
    </ts-selection-list>
  `,
})
export class ValidateOnChange {
  public myCtrl = new FormControl(null, Validators.required);
  public validateOnChange = true;
  public options = STATES.slice();
}

@Component({
  template: `
    <ts-selection-list [formControl]="myCtrl">
      <ts-option
        [value]="option"
        [option]="option"
        *ngFor="let option of items"
      >{{ option.viewValue }}</ts-option>
    </ts-selection-list>
  `,
})
export class NullSelection {
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
  public myCtrl = new FormControl(this.items[2]);
}

@Component({
  template: `
    <ts-selection-list [formControl]="myCtrl">
      <ts-option
        [value]="state"
        *ngFor="let state of items"
      >
        <ng-template let-option>
          <div class="myClass">
            <h4 tsOptionDisplay>{{ option?.state }}</h4>
            <small>{{ option?.population }}</small>
          </div>
        </ng-template>
      </ts-option>
    </ts-selection-list>
  `,
})
export class OptionError {
  public myCtrl = new FormControl();
  public items = STATES.slice(0, 2);
}

@Component({
  template: `
    <ts-selection-list [formControl]="myCtrl">
      <ts-option
        [value]="state"
        [option]="state"
        [id]="state.name"
        *ngFor="let state of items"
        (selectionChange)="change($event)"
      >
        {{ state.name }}
      </ts-option>
    </ts-selection-list>
  `,
})
export class OptionId {
  public myCtrl = new FormControl();
  public items = STATES.slice(0, 4);
  public change = v => { };
}

@Component({
  template: `
    <ts-selection-list [formControl]="myCtrl">
      <ts-select-optgroup
        *ngFor="let group of groups"
        [id]="group.name"
        [label]="group.name"
      >
        <ts-option
          *ngFor="let option of group.children"
          [value]="option"
          [option]="option"
        >
          {{ option.name }}
        </ts-option>
      </ts-select-optgroup>
    </ts-selection-list>
  `,
})
export class OptgroupIDs {
  public myCtrl = new FormControl();
  public groups = STATES_GROUPED.slice();
}

@Component({
  template: `
    <ts-selection-list [formControl]="myCtrl">
      <ts-select-optgroup
        *ngFor="let group of groups"
        [id]="group.foo"
        [label]="group.name"
      >
        <ts-option
          *ngFor="let option of group.children"
          [value]="option"
          [option]="option"
        >
          {{ option.name }}
        </ts-option>
      </ts-select-optgroup>
    </ts-selection-list>
  `,
})
export class OptgroupBadIDs {
  public myCtrl = new FormControl([STATES[4]]);
  public groups = STATES_GROUPED.slice();
}

@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      [displayFormatter]="myFormatter"
      [allowMultiple]="allowMultiple"
    >
      <ts-option
        *ngFor="let option of states"
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        {{ option.foo }}
      </ts-option>
    </ts-selection-list>
  `,
})
export class Formatter {
  public myCtrl = new FormControl([STATES[0]]);
  public states: State[] = STATES.slice();
  public allowMultiple = true;

  public myFormatter(v: State): string {
    return v.name.toUpperCase();
  }
}

@Component({
  template: `
    <ts-selection-list
      [formControl]="myCtrl"
      [allowMultiple]="allowMultiple"
    >
      <ts-option
        *ngFor="let option of options"
        [value]="option"
        [option]="option"
        [isDisabled]="option?.disabled"
      >
        {{ option }}
      </ts-option>
    </ts-selection-list>
  `,
})
export class SimpleArray {
  public myCtrl = new FormControl();
  public options: string[] = ['foo', 'bar', 'baz'];
  public allowMultiple = true;
}

@Component({
  template: `
      <ts-selection-list
              [formControl]="myCtrl"
              [allowMultiple]="allowMultiple"
              (selectionChange)="mySelection($event)"
      >
          <ts-option
                  *ngFor="let option of options"
                  [value]="option"
                  [option]="option"
                  [isDisabled]="option?.disabled"
          >
              {{ option }}
          </ts-option>
      </ts-selection-list>
  `,
})
export class SelectionEvent {
  public myCtrl = new FormControl(['bar']);
  public options: string[] = ['foo', 'bar', 'baz'];
  public allowMultiple = true;
  public lastSelection: TsSelectionListChange | undefined;
  public mySelection(e: TsSelectionListChange): void {
    this.lastSelection = e;
  }
}

@Component({
  template: `
      <ts-selection-list
          [formControl]="myCtrl"
          [allowMultiple]="true"
          (backdropClicked)="clicked()"
      >
          <ts-option
              *ngFor="let option of options"
              [value]="option"
              [option]="option"
          >
              {{ option }}
          </ts-option>
      </ts-selection-list>
  `,
})
export class BackdropClick {
  public myCtrl = new FormControl(['bar']);
  public options: string[] = ['foo', 'bar', 'baz'];
  public clicked = () => {};
}


/**
 * NOTE: Currently all exported Components must belong to a module. So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TsSelectionListModule,
    TsOptionModule,
  ],
  declarations: [
    AllowMultipleNoReopen,
    BackdropClick,
    Basic,
    CustomCharacterCount,
    CustomCompareFn,
    CustomDebounce,
    Debounce,
    DeferOptionSelectionStream,
    Disabled,
    Formatter,
    HideRequired,
    Hint,
    Id,
    Label,
    Multiple,
    NullSelection,
    OptgroupBadIDs,
    OptgroupIDs,
    OptionError,
    OptionId,
    PassingInObjectValue,
    Required,
    Seeded,
    SeededNgModel,
    SeededNgModelError,
    SeededNonArray,
    SelectionEvent,
    SelectOptionChange,
    SimpleArray,
    ValidateOnChange,
  ],
})
export class TsSelectionListTestComponentsModule { }
