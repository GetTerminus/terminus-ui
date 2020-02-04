import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TsFormFieldComponent,
  TsFormFieldModule,
} from '@terminus/ui/form-field';
import {
  TsInputComponent,
  TsInputModule,
} from '@terminus/ui/input';

@Component({
  template: `
    <ts-form-field
       [control]="inputComponent"
       [id]="myId">
      <ts-input
        [hasExternalFormField]="true"
        [formControl]="formControl"
      ></ts-input>
    </ts-form-field>
  `,
})
export class Id {
  public formControl = new FormControl();
  public myId: string | undefined = 'foo';

  @ViewChild(TsInputComponent, { static: true })
  public inputComponent: TsInputComponent;

  @ViewChild(TsFormFieldComponent, { static: true })
  public formField: TsFormFieldComponent;
}

@Component({
  template: `
    <ts-form-field
      [control]="inputComponent"
      [hideRequiredMarker]="hideRequiredMarker"
    >
      <ts-input
        [hasExternalFormField]="true"
        [formControl]="formControl"
      ></ts-input>
    </ts-form-field>
  `,
})
export class RequiredMarker {
  public formControl = new FormControl(null, Validators.required);
  public hideRequiredMarker = false;

  @ViewChild(TsInputComponent, { static: true })
  public inputComponent: TsInputComponent;
}

@Component({
  template: `
    <ts-form-field
      [control]="inputComponent"
      [floatLabel]="float"
    >
      <ts-input
        [hasExternalFormField]="true"
        [formControl]="formControl"
      ></ts-input>
    </ts-form-field>
  `,
})
export class Float {
  public formControl = new FormControl();
  public float;

  @ViewChild(TsInputComponent, { static: true })
  public inputComponent: TsInputComponent;

  @ViewChild(TsFormFieldComponent, { static: true })
  public formField: TsFormFieldComponent;
}

@Component({
  template: `
    <ts-form-field></ts-form-field>
  `,
})
export class NoControl {
}

@Component({
  template: `
    <ts-form-field
      [control]="inputComponent"
      [validateOnChange]="true"
    >
      <ts-input
        [hasExternalFormField]="true"
        [formControl]="formControl"
      ></ts-input>
    </ts-form-field>
  `,
})
export class ErrorState implements OnInit {
  public formControl = new FormControl(null, Validators.required);

  @ViewChild(TsInputComponent, { static: true })
  public inputComponent: TsInputComponent;

  @ViewChild(TsFormFieldComponent, { static: true })
  public formField: TsFormFieldComponent;

  public ngOnInit() {
    this.formControl.markAsDirty();
  }
}

@Component({
  template: `
    <ts-form-field [control]="inputComponent">
      <ts-input
        [hasExternalFormField]="true"
        [formControl]="formControl"
      ></ts-input>
    </ts-form-field>
  `,
})
export class UpdateOutline {
  public formControl = new FormControl();

  @ViewChild(TsInputComponent, { static: true })
  public inputComponent: TsInputComponent;

  @ViewChild(TsFormFieldComponent, { static: true })
  public formField: TsFormFieldComponent;
}

@Component({
  template: `
    <ts-form-field
      [control]="inputComponent"
      [noValidationOrHint]="validationFlag"
    >
      <ts-input
        [hasExternalFormField]="true"
        [formControl]="formControl"
      ></ts-input>
    </ts-form-field>
  `,
})
export class NoValidationOrHint {
  public formControl = new FormControl();
  public validationFlag = false;

  @ViewChild(TsInputComponent, { static: true })
  public inputComponent!: TsInputComponent;

  @ViewChild(TsFormFieldComponent, { static: true })
  public formField!: TsFormFieldComponent;
}

/**
 * NOTE: Currently all exported Components must belong to a module. So this is our useless module to avoid the build error.
 */
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TsFormFieldModule,
    TsInputModule,
  ],
  declarations: [
    Id,
    RequiredMarker,
    Float,
    NoControl,
    NoValidationOrHint,
    ErrorState,
    UpdateOutline,
  ],
})
export class TsFormFieldTestComponentsModule {}
