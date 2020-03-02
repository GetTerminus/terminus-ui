import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TsAutocompleteModule } from '@terminus/ui/autocomplete';
import {
  TsChipComponent,
  TsChipEvent,
  TsChipModule,
  TsChipSelectionChange,
} from '@terminus/ui/chip';
import { TsOptionModule } from '@terminus/ui/option';


@Component({
  template: `
    <ts-chip-collection>
      <ts-chip
        *ngFor="let chip of options"
        [value]="chip"
      >{{ chip }}</ts-chip>
    </ts-chip-collection>
  `,
})
export class RegularChip {
  public options = ['banana', 'apple', 'orange'];
}

// FIXME: Combine `OneChip` and `SingleChip`?
@Component({
  template: `
    <ts-chip-collection (removed)="removed()">
      <ts-chip
        *ngFor="let chip of options"
        [value]="chip"
      >{{ chip }}</ts-chip>
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
      (remove)="removed()"
      (destroyed)="chipDestroy($event)"
      (selectionChange)="selectionChange($event)"
    ></ts-chip>
  `,
})
export class SingleChip {
  public option = 'banana';
  public selected = false;
  public removed: (event?: TsChipEvent) => void = () => { };
  public chipDestroy: (event?: TsChipEvent) => void = () => { };
  public selectionChange: (event?: TsChipSelectionChange) => void = () => { };
}

@Component({
  template: `
    <ts-chip-collection></ts-chip-collection>
  `,
})
export class NoChip { }

@Component({
  template: `
    <ts-chip-collection [isDisabled]="isDisabled" id="foooooooooooooo">
      <ts-chip
        *ngFor="let chip of options"
        [value]="chip"
      >{{ chip }}</ts-chip>
    </ts-chip-collection>
  `,
})
export class DisabledChip {
  public options = ['banana', 'apple'];
  public isDisabled = true;
}

@Component({
  template: `
    <ts-chip-collection [isReadonly]="isReadonly">
      <ts-chip
        *ngFor="let chip of options"
        [value]="chip"
      >{{ chip }}</ts-chip>
    </ts-chip-collection>
  `,
})
export class ReadonlyChip {
  public options = ['banana', 'apple'];
  public isReadonly = false;
}

@Component({
  template: `
    <ts-autocomplete
      [formControl]="myCtrl"
      [allowMultiple]="allowMultiple"
    >
      <ts-option
        *ngFor="let option of options"
        [value]="option"
        [option]="option"
      >
        {{ option }}
      </ts-option>
    </ts-autocomplete>
  `,
})
export class Autocomplete {
  public allowMultiple = true;
  public myCtrl = new FormControl(['apple', 'orange']);
  public options = ['apple', 'banana', 'orange'];
}

@Component({
  template: `
    <ts-chip-collection [isSelectable]="selectable">
      <ts-chip
        *ngFor="let chip of options"
        [value]="chip"
      >{{ chip }}</ts-chip>
    </ts-chip-collection>`,
})
export class StandardChipCollection {
  public options = [0, 1, 2, 3, 4];
  public selectable = true;
}

@Component({
  template: `
    <ts-chip-collection
      [tabIndex]="index"
      [isDisabled]="isDisabled"
    >
      <ts-chip
        *ngFor="let chip of options"
        [value]="chip"
      >{{ chip }}</ts-chip>
    </ts-chip-collection>
  `,
})
export class Tabindex {
  public options = [1, 2, 3];
  public index = 4;
  public isDisabled = false;
}

@Component({
  template: `
    <ts-chip-collection [id]="myId">
      <ts-chip
        *ngFor="let chip of options"
        [value]="chip"
      >{{ chip }}</ts-chip>
    </ts-chip-collection>
  `,
})
export class Id {
  public options = [1, 2, 3];
  public myId = 100;
}

@Component({
  template: `
    <ts-chip-collection [allowMultipleSelections]="allowMultipleSelections">
      <ts-chip
        *ngFor="let chip of options"
        [value]="chip"
      >{{ chip }}</ts-chip>
    </ts-chip-collection>
  `,
})
export class NotAllowMultipleSelections {
  public options = [1, 2, 3];
  public allowMultipleSelections = false;
}

@Component({
  template: `
    <ts-chip-collection>
      <ts-chip *ngFor="let chip of options">{{ chip }}</ts-chip>
    </ts-chip-collection>
  `,
})
export class NoValueChip {
  public options = [];
}

@Component({
  template: `
    <ts-chip-collection
        (tabUpdateFocus)="tabbed()"
        (removed)="removed($event)"
        (collectionChange)="change($event)"
    >
       <ts-chip
           *ngFor="let chip of options"
           [value]="chip"
           (remove)="remove($event.chip)"
       >{{ chip }}</ts-chip>
    </ts-chip-collection>
  `,
})
export class Events {
  public options = ['banana', 'apple'];
  public change = v => { };
  public removed = (v: TsChipEvent) => { };
  public tabbed = () => { };
  public remove = (v: TsChipComponent) => {
    this.options = this.options.filter(option => v.value === option);
  }
}

@Component({
  template: `
    <ts-chip-collection>
      <ts-chip *ngFor="let chip of options">{{ chip }}</ts-chip>
    </ts-chip-collection>
  `,
})
export class ChipNoValue {
  public options = ['banana'];
}

@Component({
  template: `
    <ts-chip tsChipBadge>foo</ts-chip>
  `,
})
export class ChipBadge {}


export type TsChipTestComponent
  = Autocomplete
  | RegularChip
  | ChipBadge
  | ChipNoValue
  | DisabledChip
  | Events
  | Id
  | OneChip
  | NoChip
  | NotAllowMultipleSelections
  | NoValueChip
  | ReadonlyChip
  | SingleChip
  | StandardChipCollection
  | Tabindex
;

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
    ChipBadge,
    ChipNoValue,
    DisabledChip,
    Events,
    Id,
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
