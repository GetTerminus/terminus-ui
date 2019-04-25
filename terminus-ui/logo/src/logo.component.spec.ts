import {
  Component,
  ViewChild,
} from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { createComponent } from '@terminus/ngx-tools/testing';

import { TsLogoComponent } from './logo.component';
import { TsLogoModule } from './logo.module';


 @Component({
   template: `
    <ts-logo id="one" #one></ts-logo>
    <ts-logo id="two" #two [type]="type" [logoColor]="logoColor"></ts-logo>
  `,
 })
class TestHostComponent {
  type = '';
  logoColor = '';

  @ViewChild('one')
  one!: TsLogoComponent;

  @ViewChild('two')
  two!: TsLogoComponent;
 }



describe(`TsLogoComponent`, function() {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let logo1: TsLogoComponent;
  let logo2: TsLogoComponent;

  beforeEach(() => {
    fixture = createComponent(TestHostComponent, undefined, [TsLogoModule]);
    hostComponent = fixture.componentInstance;
    logo1 = hostComponent.one;
    logo2 = hostComponent.two;
  });


  test(`should exist`, () => {
    expect(logo1).toBeTruthy();
    expect(logo2).toBeTruthy();
  });


  describe(`logo type`, () => {

    test(`should default to full-gradient without input`, () => {
      expect(logo1.type).toEqual('full-gradient');
    });

    test(`should log a warning if an invalid value was passed in`, () => {
      window.console.warn = jest.fn();
      hostComponent.type = 'foo';
      fixture.detectChanges();

      expect(window.console.warn).toHaveBeenCalled();
    });

    test(`should change type to full-account-hub on input`, () => {
      hostComponent.type = 'full-account-hub';
      fixture.detectChanges();

      expect(logo2.type).toEqual('full-account-hub');
      expect(document.querySelector('#logo-account-hub')).not.toBeNull();
    });

    test(`should change type to full-gradient on input`, () => {
      hostComponent.type = 'full-gradient';
      fixture.detectChanges();

      expect(logo2.type).toEqual('full-gradient');
      expect(document.querySelector('#logo-full-gradient')).not.toBeNull();
    });

    test(`should change type to full-solid on input`, () => {
      hostComponent.type = 'full-solid';
      fixture.detectChanges();

      expect(logo2.type).toEqual('full-solid');
      expect(document.querySelector('#logo-full-solid')).not.toBeNull();
    });

    test(`should change type to mark-gradient on input`, () => {
      hostComponent.type = 'mark-gradient';
      fixture.detectChanges();

      expect(logo2.type).toEqual('mark-gradient');
      expect(document.querySelector('#logo-mark-gradient')).not.toBeNull();
    });

    test(`should change type to mark-solid on input`, () => {
      hostComponent.type = 'mark-solid';
      fixture.detectChanges();

      expect(logo2.type).toEqual('mark-solid');
      expect(document.querySelector('#logo-mark-solid')).not.toBeNull();
    });
  });


  describe(`logo color`, () => {

    test(`should default to white without input`, () => {
      expect(logo1.logoColor).toEqual('white');
    });

    test(`should log a warning if an invalid value was passed in`, () => {
      window.console.warn = jest.fn();
      hostComponent.logoColor = 'foo';
      fixture.detectChanges();

      expect(window.console.warn).toHaveBeenCalled();
    });

    test(`should set to gray on input`, () => {
      hostComponent.logoColor = 'gray';
      hostComponent.type = 'full-solid';
      fixture.detectChanges();

      expect(logo2.logoColor).toEqual('gray');
      expect(document.querySelector('.ts-logo--gray')).not.toBeNull();
    });

    test(`should set to black input`, () => {
      hostComponent.logoColor = 'black';
      hostComponent.type = 'mark-solid';
      fixture.detectChanges();

      expect(logo2.logoColor).toEqual('black');
      expect(document.querySelector('.ts-logo--black')).not.toBeNull();
    });

    test(`should set to white when full-account-hub type is selected with any other color`, () => {
      hostComponent.type = 'full-account-hub';
      hostComponent.logoColor = 'gray';
      fixture.detectChanges();

      expect(logo2.logoColor).toEqual('white');
      expect(document.querySelector('.ts-logo--gray')).toBeNull();
    });

    test(`should set to white when full-gradient type is selected with any other color`, () => {
      hostComponent.type = 'full-gradient';
      hostComponent.logoColor = 'black';
      fixture.detectChanges();

      expect(logo2.logoColor).toEqual('white');
      expect(document.querySelector('.ts-logo--black')).toBeNull();
    });

    test(`should set to white when mark-gradient type is selected with any other color`, () => {
      hostComponent.type = 'mark-gradient';
      hostComponent.logoColor = 'gray';
      fixture.detectChanges();

      expect(logo2.logoColor).toEqual('white');
      expect(document.querySelector('.ts-logo--gray')).toBeNull();
    });
  });
});
