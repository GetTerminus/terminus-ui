import {
  Component,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import {
  TsChipModule,
  TsChipEvent,
  TsChipSelectionChange,
} from '@terminus/ui/chip';
import { TsAutocompleteModule } from '@terminus/ui/autocomplete';
import { TsOptionModule } from '@terminus/ui/option';

@Component({
  template: `
    <ts-chip-collection
      [chipsInput]="options"
      #tsChipCollection
    >
    </ts-chip-collection>
  `,
})
export class RegularChip {
  public options = ['banana', 'apple', 'orange'];
}

@Component({
  template: `
    <ts-chip-collection
      [chipsInput]="options"
      (removed)="removed()"
      #tsChipCollection
    >
    </ts-chip-collection>
  `,
})
export class OneChip {
  public options = ['banana'];
  public removed() {
    this.options.pop();
  }
}

@Component({
  template: `
    <ts-chip
      [value]="option"
      [selected]="selected"
      (removed)="removed()"
      (destroyed)="chipDestroy($event)"
      (selectionChange)="selectionChange($event)"
    >
    </ts-chip>
  `,
})
export class SingleChip {
  public option = 'banana';
  public selected = false;
  removed: (event?: TsChipEvent) => void = () => { }
  chipDestroy: (event?: TsChipEvent) => void = () => { };
  selectionChange: (event?: TsChipSelectionChange) => void = () => { };
}

@Component({
  template: `
    <ts-chip-collection
      #tsChipCollection
    >
    </ts-chip-collection>
  `,
})
export class NoChip {
}

@Component({
  template: `
    <ts-chip-collection
      [chipsInput]="options"
      [isDisabled]="isDisabled"
      #tsChipCollection
    >
    </ts-chip-collection>
  `,
})
export class DisabledChip {
  public options = ['banana', 'apple'];
  public isDisabled = true;
}

@Component({
  template: `
    <ts-chip-collection
      [chipsInput]="options"
      [isReadonly]="isReadonly"
      #tsChipCollection
    >
    </ts-chip-collection>
  `,
})
export class ReadonlyChip {
  public options = ['banana', 'apple'];
  public isReadonly = false;
}

@Component({
  template: `
    <form
    novalidate
    fxLayout="column"
    fxLayout.gt-sm="row"
    fxLayoutGap="1rem"
    >
    <ts-autocomplete
      [formControl]="myCtrl"
      [allowMultiple]="allowMultiple"
    >
      <ts-option
        *ngFor="let option of items"
        [value]="option"
        [option]="option"
      >
        {{ option }}
      </ts-option>
    </ts-autocomplete>
  </form>
  `
  ,
})
export class Autocomplete {
  public allowMultiple = true;
  public myCtrl = new FormControl(['apple', 'orange']);
  public items = ['apple', 'banana', 'orange'];
}

@Component({
  template: `
    <ts-chip-collection
      [isSelectable]="selectable"
      [chipsInput]="options"
    >
    </ts-chip-collection>`,
})
export class StandardChipCollection {
  name: string = 'Test';
  selectable: boolean = true;
  chipSelect: (index?: number) => void = () => { };
  chipDeselect: (index?: number) => void = () => { };
  options = [0, 1, 2, 3, 4];
}

@Component({
  template: `
    <ts-chip-collection
      [chipsInput]="options"
      [tabIndex]="index"
      [isDisabled]="isDisabled"
    >
    </ts-chip-collection>
  `,
})
export class Tabindex {
  index = 4;
  options = [1, 2, 3];
  isDisabled = false;
}

@Component({
  template: `
    <ts-chip-collection
      [chipsInput]="options"
      [id]="myId"
    >
    </ts-chip-collection>
  `,
})
export class Id {
  options = [1, 2, 3];
  myId = 100;
}

@Component({
  template: `
    <ts-chip-collection
      [chipsInput]="options"
      [id]="myId"
      [isSelectable]="isSelectable"
    >
    </ts-chip-collection>
  `,
})
export class isSelectable {
  isSelectable = false;
  myId = 'foo';
  options = [1, 2, 3];
}

@Component({
  template: `
    <ts-chip-collection
      [chipsInput]="options"
      [allowMultipleSelections]="allowMultipleSelections"
    >
    </ts-chip-collection>
  `,
})
export class NotAllowMultipleSelections {
  allowMultipleSelections = false;
  options = [1, 2, 3];
}

@Component({
  template: `
    <ts-chip-collection
    >
    </ts-chip-collection>
  `,
})
export class NoValueChip {
}

/**
 * NOTE: Currently all exported Components must belong to a module. So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TsChipModule,
    TsAutocompleteModule,
    TsOptionModule,
  ],
  declarations: [
    Autocomplete,
    RegularChip,
    DisabledChip,
    Id,
    isSelectable,
    OneChip,
    NoChip,
    NotAllowMultipleSelections,
    NoValueChip,
    ReadonlyChip,
    SingleChip,
    StandardChipCollection,
    Tabindex,
  ],
})
export class TsChipCollectionTestComponentsModule { }
