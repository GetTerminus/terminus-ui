import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  TestModuleMetadata,
} from '@angular/core/testing';
import {
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  expectNativeEl,
  typeInElement,
  configureTestBedWithoutReset,
} from '@terminus/ngx-tools/testing';

import {
  TsMaskDirective,
  MaskShortcutOptions,
} from './mask.directive';


@Component({
  template: `
    <input
      [tsMask]="myMask"
      [sanitizeValue]="shouldSanitize"
      [allowDecimal]="shouldAllowDecimal"
      [formControl]="myControl"
      #input
    />
  `,
})
class TestHostComponent {
  myMask: MaskShortcutOptions = 'phone';
  shouldSanitize: boolean = true;
  shouldAllowDecimal: boolean = true;
  myControl = new FormControl();

  @ViewChild('input')
  input!: HTMLInputElement;
}


describe(`TsMaskDirective Integration`, () => {
  // Standard tests
  let fixture: ComponentFixture<TestHostComponent>;
  let testComponent: TestHostComponent;
  let input: HTMLInputElement;
  const moduleDefinition: TestModuleMetadata = {
    imports: [
      ReactiveFormsModule,
    ],
    declarations: [
      TsMaskDirective,
      TestHostComponent,
    ],
  };

  configureTestBedWithoutReset(moduleDefinition);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testComponent = fixture.componentInstance;
    input = fixture.debugElement.query(By.css('input')).nativeElement;
  });


  describe(`tsMask`, () => {

    it(`should exist`, () => {
      expectNativeEl(fixture).toBeTruthy();
    });

  });


  test(`should mask a phone number`, () => {
    fixture.detectChanges();
    typeInElement('1235551234', input);

    expect(input.value).toEqual('(123) 555-1234');
    expect(testComponent.myControl.value).toEqual('1235551234');
  });


  test(`should mask currency`, () => {
    testComponent.myMask = 'currency';
    fixture.detectChanges();
    typeInElement('12.34', input);

    expect(input.value).toEqual('$12.34');
    expect(testComponent.myControl.value).toEqual('12.34');
  });


  test(`should mask a number`, () => {
    testComponent.myMask = 'number';
    fixture.detectChanges();
    typeInElement('1234567.34', input);

    expect(input.value).toEqual('1,234,567.34');
    expect(testComponent.myControl.value).toEqual('1234567.34');
  });


  test(`should mask a percentage`, () => {
    testComponent.myMask = 'percentage';
    fixture.detectChanges();
    typeInElement('12.34', input);

    expect(input.value).toEqual('12.34%');
    expect(testComponent.myControl.value).toEqual('12.34');
  });


  describe(`postal mask`, () => {

    test(`should mask a short postal`, () => {
      testComponent.myMask = 'postal';
      fixture.detectChanges();
      typeInElement('12345', input);

      expect(input.value).toEqual('12345');
      expect(testComponent.myControl.value).toEqual('12345');
    });


    test(`should mask a long postal`, () => {
      testComponent.myMask = 'postal';
      fixture.detectChanges();
      typeInElement('123456789', input);

      expect(input.value).toEqual('12345-6789');
      expect(testComponent.myControl.value).toEqual('12345-6789');
    });

  });


  test(`should be able to disable decimal support`, () => {
    testComponent.myMask = 'number';
    testComponent.shouldAllowDecimal = false;
    fixture.detectChanges();
    typeInElement('1.23', input);

    expect(input.value).toEqual('123');
    expect(testComponent.myControl.value).toEqual('123');
  });


  test(`should be able to save the formatted value to the model`, () => {
    testComponent.shouldSanitize = false;
    fixture.detectChanges();
    typeInElement('1235551234', input);

    expect(input.value).toEqual('(123) 555-1234');
    expect(testComponent.myControl.value).toEqual('(123) 555-1234');
  });


});
