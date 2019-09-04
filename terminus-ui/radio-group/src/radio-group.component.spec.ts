import {
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import {
  FormControl,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  ChangeDetectorRefMock,
  createComponent,
} from '@terminus/ngx-tools/testing';
import {
  getRadioGroupInstance,
  selectStandardRadio,
  selectVisualRadio,
} from '@terminus/ui/radio-group/testing';

import { TsRadioChange } from '@terminus/ui/radio-group';
import {
  TsRadioFormatFn,
  TsRadioGroupComponent,
  TsRadioOption,
} from './radio-group.component';
import { TsRadioGroupModule } from './radio-group.module';


const SVG = `
<svg  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect x="10" y="10" height="100" width="100" style="stroke:#ff0000; fill: #0000ff"/>
</svg>
`;

class DomSanitizerMock {
  public bypassSecurityTrustHtml = jest.fn().mockReturnValue(SVG);
}

@Component({
  template: `
  <ts-radio-group
    [isVisual]="isVisual"
    [small]="small"
    [centeredContent]="centered"
    [formatUILabelFn]="uiFormatter"
    [formatModelValueFn]="modelFormatter"
    [formControl]="control"
    [options]="optionsArray"
    (selectionChange)="selectionChange($event)"
  ></ts-radio-group>
  `,
})
class TestHostComponent {
  private control: FormControl | undefined = new FormControl();
  public isVisual = false;
  public small = false;
  public centered = true;
  public optionsArray: TsRadioOption[] = [
    {
      foo: 'bar',
      bar: 'baz',
    },
  ];

  @ViewChild(TsRadioGroupComponent, { static: true })
  public component: TsRadioGroupComponent;

  public selectionChange = jest.fn();
  private uiFormatter: TsRadioFormatFn = optionsArray => optionsArray.bar;
  private modelFormatter: TsRadioFormatFn = optionsArray => optionsArray.foo;
}

describe('TsRadioGroupComponent INT test', function() {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    fixture = createComponent(TestHostComponent, [], [TsRadioGroupModule]);
    fixture.detectChanges();
  });


  describe(`change`, () => {

    test(`should emit change for non-isVisual radios`, () => {
      selectStandardRadio(fixture, 'baz');

      const radioComponent = getRadioGroupInstance(fixture);
      const change = new TsRadioChange(radioComponent, 'bar');
      expect(fixture.componentInstance.selectionChange).toHaveBeenCalledWith(change);
    });

    test(`should emit change for isVisual radios`, () => {
      fixture.componentInstance.component.isVisual = true;
      fixture.detectChanges();
      selectVisualRadio(fixture, 'baz');

      const radioComponent = getRadioGroupInstance(fixture);
      const change = new TsRadioChange(radioComponent, 'bar');
      expect(fixture.componentInstance.selectionChange).toHaveBeenCalledWith(change);
    });

  });


  describe(`visual mode`, function() {

    beforeEach(() => {
      fixture.componentInstance.isVisual = true;
      fixture.detectChanges();
    });


    test(`should add the visual layout class`, function() {
      const visualClass = fixture.debugElement.query(By.css('.c-radio--visual'));
      expect(visualClass).toBeTruthy();
    });


    describe(`small`, function() {

      test(`should add the correct class for the small layout`, function() {
        let smallClass = fixture.debugElement.queryAll(By.css('.c-radio--small'));
        expect(smallClass.length).toEqual(0);

        fixture.componentInstance.small = true;
        fixture.detectChanges();

        smallClass = fixture.debugElement.queryAll(By.css('.c-radio--small'));
        expect(smallClass.length).toBeGreaterThan(0);
      });

    });


    describe(`centeredContent`, function() {

      test(`should add the correct class for centered content`, function() {
        let centeredClass = fixture.debugElement.queryAll(By.css('.c-radio__content--centered'));
        expect(centeredClass.length).toBeGreaterThan(0);

        fixture.componentInstance.centered = false;
        fixture.detectChanges();

        centeredClass = fixture.debugElement.queryAll(By.css('.c-radio__content--centered'));
        expect(centeredClass.length).toEqual(0);
      });

    });
  });

});


describe('TsRadioGroupComponent', function() {
  let component: TsRadioGroupComponent;
  let options: TsRadioOption[];

  beforeEach(() => {
    component = new TsRadioGroupComponent(
      new ChangeDetectorRefMock(),
      DomSanitizerMock as any,
    );
    options = [
      {
        foo: 'foo_value',
        bar: 'Foo Display',
        bing: 'Some helper text for my item',
      },
      {
        foo: 'bar_value',
        bar: 'Bar Display',
        bing: 'Some helper text for my item',
        disabled: true,
      },
      {
        foo: 'baz_value',
        bar: 'Baz Display',
        bing: 'Some helper text for my item',
      },
    ];
    component.changeDetectorRef.markForCheck = jest.fn();
  });


  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`isDisabled`, () => {

    test(`should set and retrieve`, () => {
      component.isDisabled = true;
      expect(component.isDisabled).toEqual(true);
    });

  });


  describe(`formatUILabelFn`, () => {

    test(`should return undefined if no value is passed in`, () => {
      const foo = void 0;
      expect(component.formatUILabelFn = foo as any).toEqual(undefined);
    });


    test(`should set/get the uiFormatFn`, () => {
      const myFn = (v: any) => v.id;
      component.formatUILabelFn = myFn;
      expect(component.formatUILabelFn).toEqual(myFn);
    });


    test(`should throw an error in dev mode when passed a value that is not a function`, () => {
      expect(() => {
        component.formatUILabelFn = 3 as any;
      })
        .toThrowError(`TsRadioGroupComponent: 'formatUILabelFn' must be passed a 'TsRadioFormatFn'.`);
    });

  });


  describe(`formatUISubLabelFn`, () => {

    test(`should return undefined if no value is passed in`, () => {
      const foo = void 0;
      expect(component.formatUISubLabelFn = foo as any).toEqual(undefined);
    });


    test(`should set/get the uiFormatFn`, () => {
      const myFn = (v: any) => v.id;
      component.formatUISubLabelFn = myFn;
      expect(component.formatUISubLabelFn).toEqual(myFn);
    });


    test(`should throw an error in dev mode when passed a value that is not a function`, () => {
      expect(() => {
        component.formatUISubLabelFn = 3 as any;
      })
        .toThrowError(`TsRadioGroupComponent: 'formatUISubLabelFn' must be passed a 'TsRadioFormatFn'.`);
    });

  });


  describe(`formatModelValueFn`, () => {

    test(`should return undefined if no value is passed in`, () => {
      const foo = void 0;
      expect(component.formatModelValueFn = foo as any).toEqual(undefined);
    });


    test(`should set/get the uiFormatFn`, () => {
      const myFn = (v: any) => v.id;
      component.formatModelValueFn = myFn;
      expect(component.formatModelValueFn).toEqual(myFn);
    });


    test(`should throw an error in dev mode when passed a value that is not a function`, () => {
      expect(() => {
        component.formatModelValueFn = 3 as any;
      })
        .toThrowError(`TsRadioGroupComponent: 'formatModelValueFn' must be passed a 'TsRadioFormatFn'.`);
    });

  });


  describe(`isRequired`, () => {

    test(`should return true if the form group is required`, () => {
      component.formControl = new FormControl(null, Validators.required);
      expect(component.isRequired).toEqual(true);
    });

    test(`should return false if the form group is not required`, () => {
      component.formControl = new FormControl();
      expect(component.isRequired).toEqual(false);
    });

  });


  describe(`name`, () => {

    test(`should set and retrieve the name value`, () => {
      expect(component.name).toEqual(expect.stringContaining('ts-radio-group'));
      component.name = 'foo';
      expect(component.name).toEqual('foo');
    });


    test(`should not change the name if no value was passed in`, () => {
      component.name = '' as any;
      expect(component.name).toEqual(expect.stringContaining('ts-radio-group'));
    });

  });


  describe(`options`, () => {

    test(`should set and retrieve options`, () => {
      component.options = [
        {
          foo: 'bar',
          bar: 'baz',
        },
      ];
      expect(component.options[0].foo).toEqual('bar');
    });


    test(`should return undefined if no options were passed in`, () => {
      component.options = '' as any;
      expect(component.options).toEqual(undefined);
    });

  });


  describe(`ngOnInit`, () => {
    let ctrl: FormControl;

    beforeEach(() => {
      ctrl = new FormControl('foo');
      component.formControl = ctrl;
    });


    test(`should wire up change detection to fire after form control value changes`, () => {
      component.ngOnInit();
      ctrl.setValue('bar');

      expect(component.changeDetectorRef.markForCheck).toHaveBeenCalled();
      expect(component.value).toEqual('bar');
    });

  });

  describe(`retrieveValue`, () => {

    test(`should use a formatter to return a value`, () => {
      const fn1: TsRadioFormatFn = v => v.foo;
      const val1: string | TsRadioOption = component.retrieveValue(options[0], fn1);
      expect(val1).toEqual('foo_value');

      const fn2: TsRadioFormatFn = v => v.bar;
      const val2: string | TsRadioOption = component.retrieveValue(options[1], fn2);
      expect(val2).toEqual('Bar Display');
    });


    test(`should return the option if no formatter was passed in`, () => {
      expect(component.retrieveValue(options[0])).toEqual(options[0]);
    });

  });


  describe(`id`, () => {

    test(`should default to the uid`, () => {
      component.id = null as any;
      expect(component.id).toEqual(component._uid);
    });

  });


  describe(`trackByFn`, function() {

    test(`should return the passed index`, function() {
      expect(component.trackByFn(1)).toEqual(1);
      expect(component.trackByFn(4)).toEqual(4);
    });

  });

});
