import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  NgModule,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TsFormFieldComponent } from '@terminus/ui/form-field';
import {
  TsInputModule,
  TsInputAutocompleteTypes,
  TsInputComponent,
  TsInputTypes,
  TsMaskShortcutOptions,
} from '@terminus/ui/input';


// tslint:disable: component-class-suffix

@Component({
  template: `
    <ts-input [formControl]="control"></ts-input>
  `,
})
export class SimpleFormControl {
  control: FormControl | undefined = new FormControl();

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}


@Component({
  template: `
    <ts-input
      [datepicker]="true"
    ></ts-input>
  `,
})
export class Autocomplete implements AfterContentInit {
  control: FormControl | undefined = new FormControl();
  firstDate = new Date(2018, 1, 1);
  secondDate = new Date(2017, 3, 3);

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;

  ngAfterContentInit() {
    this.inputComponent.value = this.firstDate;
  }

  updateDate() {
    this.inputComponent.value = this.secondDate;
  }
}

@Component({
  template: `<ts-input [readOnly]="readOnly"></ts-input>`,
})
export class AttrReadonly {
  readOnly: boolean | undefined = undefined;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `<ts-input [spellcheck]="spellcheck"></ts-input>`,
})
export class AttrSpellcheck {
  spellcheck: boolean | undefined = undefined;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `<ts-input [autocapitalize]="autocapitalize"></ts-input>`,
})
export class AttrAutocapitalize {
  autocapitalize = false;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `<ts-input [autocomplete]="autocomplete"></ts-input>`,
})
export class AttrAutocomplete {
  autocomplete: TsInputAutocompleteTypes = 'on';
}

@Component({
  template: `<ts-input [id]="id"></ts-input>`,
})
export class AttrId {
  id: string | undefined = undefined;
}

@Component({
  template: `<ts-input [isDisabled]="disabled"></ts-input>`,
})
export class AttrDisabled {
  disabled = false;
}

@Component({
  template: `<ts-input [isFocused]="focused"></ts-input>`,
})
export class AttrAutofocus {
  focused = false;
}

@Component({
  template: `
    <ts-input
      [tabIndex]="index"
    ></ts-input>
  `,
})
export class TabIndex {
  index = 4;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [mask]="mask"
      [formControl]="formControl"
    ></ts-input>
  `,
})
export class Mask {
  mask: TsMaskShortcutOptions | undefined = undefined;
  formControl = new FormControl();

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [mask]="mask"
      [formControl]="formControl"
      [maskSanitizeValue]="maskSanitizeValue"
    ></ts-input>
  `,
})
export class MaskSanitize {
  mask: TsMaskShortcutOptions | undefined;
  formControl = new FormControl();
  maskSanitizeValue = true;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [mask]="mask"
      [formControl]="formControl"
      [maskAllowDecimal]="maskAllowDecimal"
    ></ts-input>
  `,
})
export class MaskDecimal {
  mask: TsMaskShortcutOptions | undefined;
  formControl = new FormControl();
  maskAllowDecimal = true;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [mask]="mask"
      [formControl]="formControl"
    ></ts-input>
  `,
})
export class MaskDateFormat {
  mask: TsMaskShortcutOptions = 'date';
  formControl = new FormControl();

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [formControl]="formControl"
      [mask]="mask"
    ></ts-input>
  `,
})
export class PostalMask {
  formControl = new FormControl();
  mask: TsMaskShortcutOptions = 'postal';

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `<ts-input></ts-input>`,
})
export class MissingFormControl {
  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [datepicker]="true"
      [startingView]="startingView"
    ></ts-input>
  `,
})
export class StartingView {
  startingView = 'month';

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [datepicker]="true"
      [openTo]="openTo"
    ></ts-input>
  `,
})
export class OpenTo {
  openTo: undefined | Date = new Date(2018, 1, 1);

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [datepicker]="true"
      [minDate]="minDate"
      [maxDate]="maxDate"
    ></ts-input>
  `,
})
export class MinMaxDate {
  minDate: undefined | Date = undefined;
  maxDate: undefined | Date = undefined;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `<ts-input [formControl]="formControl" [hideRequiredMarker]="hideRequiredMarker"></ts-input>`,
})
export class AttrRequiredHidden {
  formControl: FormControl = new FormControl(null, Validators.required);
  hideRequiredMarker: boolean | undefined = false;
}

@Component({
  template: `
    <ts-input
      [mask]="mask"
      [formControl]="formControl"
      [type]="type"
    ></ts-input>
  `,
})
export class InputType {
  mask: TsMaskShortcutOptions | undefined = 'number';
  formControl = new FormControl();
  type: TsInputTypes | undefined;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [formControl]="formControl"
      [isClearable]="clearable"
      (cleared)="cleared($event)"
    ></ts-input>
  `,
})
export class Clearable {
  clearable: boolean | undefined = undefined;
  formControl = new FormControl();

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
  // Must be overwritten with a spy in the test
  cleared = (v) => {};
}

@Component({
  template: `
    <ts-input
      [formControl]="formControl"
      [hasExternalFormField]="hasFormField"
    ></ts-input>
  `,
})
export class NoExternalFormField {
  formControl = new FormControl();
  hasFormField = true;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `<ts-input [formControl]="formControl" [hint]="hint"></ts-input>`,
})
export class Hint {
  formControl = new FormControl();
  hint: string | undefined = undefined;
}

@Component({
  template: `<ts-input [formControl]="formControl"></ts-input>`,
})
export class AttrNotRequired {
  formControl: FormControl = new FormControl(null);
}

@Component({
  template: `<ts-input [formControl]="formControl"></ts-input>`,
})
export class FormControlAttrRequired {
  formControl: FormControl = new FormControl(null, Validators.required);
}

@Component({
  template: `<ts-input [formControl]="formControl" [isRequired]="required"></ts-input>`,
})
export class AttrInputRequired {
  formControl: FormControl = new FormControl(null);
  required = false;
}


@Component({
  template: `<ts-input label="test label"></ts-input>`,
})
export class Label {
  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;

  @ContentChild(TsFormFieldComponent)
  formFieldComponent: TsFormFieldComponent;
}

@Component({
  template: `
    <ts-input
      [datepicker]="true"
      [dateFilter]="dateFilter"
    ></ts-input>
  `,
})
export class DateFilter {
  dateFilter = undefined;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [formControl]="formControl"
    ></ts-input>
  `,
})
export class Autofill {
  formControl = new FormControl();

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [formControl]="formControl"
      [mask]="mask"
      [maskSanitizeValue]="maskSanitizeValue"
      [maskAllowDecimal]="maskAllowDecimal"
      [label]="label"
    ></ts-input>
  `,
})
export class OnChanges {
  formControl = new FormControl('foo');
  mask: TsMaskShortcutOptions = 'number';
  maskSanitizeValue = true;
  maskAllowDecimal = true;
  label = 'my first label';

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [formControl]="formControl"
      [isTextarea]="true"
      [textareaRows]="rows"
    ></ts-input>
  `,
})
export class Textarea {
  formControl = new FormControl();
  rows: undefined | number;

  @ViewChild(TsInputComponent)
  inputComponent: TsInputComponent;
}

@Component({
  template: `<div *ngIf="show"><ts-input></ts-input></div>`,
})
export class ToggleInputComponent {

  @ViewChild(TsInputComponent)
  inputComponent!: TsInputComponent;
  public show: boolean = true;
}




/**
 * NOTE: Currently all exported Components must belong to a module. So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TsInputModule,
  ],
  declarations: [
    AttrAutocapitalize,
    AttrAutocomplete,
    AttrAutofocus,
    AttrDisabled,
    AttrId,
    AttrInputRequired,
    AttrNotRequired,
    AttrReadonly,
    AttrRequiredHidden,
    AttrSpellcheck,
    Autocomplete,
    Autofill,
    Clearable,
    DateFilter,
    FormControlAttrRequired,
    Hint,
    InputType,
    Label,
    Mask,
    MaskDateFormat,
    MaskDecimal,
    MaskSanitize,
    MinMaxDate,
    MissingFormControl,
    NoExternalFormField,
    OnChanges,
    OpenTo,
    PostalMask,
    SimpleFormControl,
    StartingView,
    TabIndex,
    Textarea,
    ToggleInputComponent,
  ],
})
export class TsInputTestComponentsModule {}
