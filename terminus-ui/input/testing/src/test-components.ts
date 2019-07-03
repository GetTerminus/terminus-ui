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
  TsInputAutocompleteTypes,
  TsInputComponent,
  TsInputModule,
  TsInputTypes,
  TsMaskShortcutOptions,
} from '@terminus/ui/input';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';


// tslint:disable: component-class-suffix

@Component({
  template: `
    <ts-input [formControl]="control"></ts-input>
  `,
})
export class SimpleFormControl {
  public control: FormControl | undefined = new FormControl();

  @ViewChild(TsInputComponent, {static: true})
  inputComponent: TsInputComponent;
}


@Component({template: `<ts-input [datepicker]="true"></ts-input>`})
export class Autocomplete implements AfterContentInit {
  public control: FormControl | undefined = new FormControl();
  public firstDate = new Date(2018, 1, 1);
  public secondDate = new Date(2017, 3, 3);

  @ViewChild(TsInputComponent, {static: true})
  inputComponent: TsInputComponent;

  ngAfterContentInit() {
    this.inputComponent.value = this.firstDate;
  }

  updateDate() {
    this.inputComponent.value = this.secondDate;
  }
}

@Component({template: `<ts-input [readOnly]="readOnly"></ts-input>`})
export class AttrReadonly {
  public readOnly = false;

  @ViewChild(TsInputComponent, {static: true})
  inputComponent: TsInputComponent;
}

@Component({template: `<ts-input [spellcheck]="spellcheck"></ts-input>`})
export class AttrSpellcheck {
  public spellcheck = false;

  @ViewChild(TsInputComponent, {static: true})
  inputComponent: TsInputComponent;
}

@Component({template: `<ts-input [autocapitalize]="autocapitalize"></ts-input>`})
export class AttrAutocapitalize {
  public autocapitalize = false;

  @ViewChild(TsInputComponent, {static: true})
  inputComponent: TsInputComponent;
}

@Component({template: `<ts-input [autocomplete]="autocomplete"></ts-input>`})
export class AttrAutocomplete {
  public autocomplete: TsInputAutocompleteTypes = 'on';
}

@Component({template: `<ts-input [id]="id"></ts-input>`})
export class AttrId {
  public id: string | undefined = undefined;
}

@Component({template: `<ts-input [isDisabled]="disabled"></ts-input>`})
export class AttrDisabled {
  public disabled = false;
}

@Component({template: `<ts-input [isFocused]="focused"></ts-input>`})
export class AttrAutofocus {
  public focused = false;
}

@Component({
  template: `
    <ts-input [theme]="theme"></ts-input>
  `,
})
export class Theme {
  public theme: TsStyleThemeTypes | undefined;

  @ViewChild(TsInputComponent, {static: true})
  inputComponent: TsInputComponent;
}

@Component({template: `<ts-input [tabIndex]="index"></ts-input>`})
export class TabIndex {
  public index = 4;

  @ViewChild(TsInputComponent, {static: true})
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
  public mask: TsMaskShortcutOptions | undefined = undefined;
  public formControl = new FormControl();

  @ViewChild(TsInputComponent, {static: true})
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
  public mask: TsMaskShortcutOptions | undefined;
  public formControl = new FormControl();
  public maskSanitizeValue = true;

  @ViewChild(TsInputComponent, {static: true})
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
  public mask: TsMaskShortcutOptions | undefined;
  public formControl = new FormControl();
  public maskAllowDecimal = true;

  @ViewChild(TsInputComponent, {static: true})
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
  public mask: TsMaskShortcutOptions = 'date';
  public formControl = new FormControl();

  @ViewChild(TsInputComponent, {static: true})
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
  public formControl = new FormControl();
  public mask: TsMaskShortcutOptions = 'postal';

  @ViewChild(TsInputComponent, {static: true})
  inputComponent: TsInputComponent;
}

@Component({template: `<ts-input></ts-input>`})
export class MissingFormControl {
  @ViewChild(TsInputComponent, {static: true})
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
  public startingView = 'month';

  @ViewChild(TsInputComponent, {static: true})
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
  public openTo: undefined | Date = new Date(2018, 1, 1);

  @ViewChild(TsInputComponent, {static: true})
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
  public minDate: undefined | Date = undefined;
  public maxDate: undefined | Date = undefined;

  @ViewChild(TsInputComponent, {static: true})
  inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-input
      [formControl]="formControl"
      [hideRequiredMarker]="hideRequiredMarker"
    ></ts-input>
  `,
})
export class AttrRequiredHidden {
  public formControl: FormControl = new FormControl(null, Validators.required);
  public hideRequiredMarker: boolean | undefined = false;
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
  public mask: TsMaskShortcutOptions | undefined = 'number';
  public formControl = new FormControl();
  public type: TsInputTypes | undefined;

  @ViewChild(TsInputComponent, {static: true})
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
  public clearable: boolean | undefined = undefined;
  public formControl = new FormControl();

  @ViewChild(TsInputComponent, {static: true})
  inputComponent: TsInputComponent;
  // Must be overwritten with a spy in the test
  cleared = v => {};
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
  public formControl = new FormControl();
  public hasFormField = true;

  @ViewChild(TsInputComponent, {static: true})
  inputComponent: TsInputComponent;
}

@Component({template: `<ts-input [formControl]="formControl" [hint]="hint"></ts-input>`})
export class Hint {
  public formControl = new FormControl();
  public hint: string | undefined = undefined;
}

@Component({template: `<ts-input [formControl]="formControl"></ts-input>`})
export class AttrNotRequired {
  public formControl: FormControl = new FormControl(null);
}

@Component({template: `<ts-input [formControl]="formControl"></ts-input>`})
export class FormControlAttrRequired {
  public formControl: FormControl = new FormControl(null, Validators.required);
}

@Component({template: `<ts-input [formControl]="formControl" [isRequired]="required"></ts-input>`})
export class AttrInputRequired {
  public formControl: FormControl = new FormControl(null);
  public required = false;
}


@Component({template: `<ts-input label="test label"></ts-input>`})
export class Label {
  @ViewChild(TsInputComponent, {static: true})
  inputComponent: TsInputComponent;

  @ContentChild(TsFormFieldComponent, {static: false})
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
  public dateFilter = undefined;

  @ViewChild(TsInputComponent, {static: true})
  inputComponent: TsInputComponent;
}

@Component({template: `<ts-input [formControl]="formControl"></ts-input>`})
export class Autofill {
  public formControl = new FormControl();

  @ViewChild(TsInputComponent, {static: true})
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
  public formControl = new FormControl('foo');
  public mask: TsMaskShortcutOptions = 'number';
  public maskSanitizeValue = true;
  public maskAllowDecimal = true;
  public label = 'my first label';

  @ViewChild(TsInputComponent, {static: true})
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
  public formControl = new FormControl();
  public rows: undefined | number;

  @ViewChild(TsInputComponent, {static: true})
  inputComponent: TsInputComponent;
}

@Component({template: `<div *ngIf="show"><ts-input></ts-input></div>`})
export class ToggleInputComponent {

  @ViewChild(TsInputComponent, {static: false})
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
    Theme,
    ToggleInputComponent,
  ],
})
export class TsInputTestComponentsModule {}
