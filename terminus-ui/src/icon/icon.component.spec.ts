import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestModuleMetadata, TestBed } from '@angular/core/testing';
import { configureTestBedWithoutReset } from '@terminus/ngx-tools/testing';
import { By } from '@angular/platform-browser';

import { TsIconComponent } from './icon.component';
import { TsIconModule } from './icon.module';


@Component({
  template: `
    <ts-icon id="one" #one [background]="hasBackground">home</ts-icon>
    <ts-icon [svgIcon]="customIcon" id="two" #two></ts-icon>
  `,
})
class TestHostComponent {
  customIcon = 'csv';
  hasBackground = false;

  @ViewChild('one')
  one!: TsIconComponent;

  @ViewChild('two')
  two!: TsIconComponent;
}



describe(`TsIconComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let icon1: TsIconComponent;
  let icon2: TsIconComponent;
  const moduleDefinition: TestModuleMetadata = {
    imports: [
      TsIconModule,
    ],
    declarations: [
      TestHostComponent,
    ],
  };

  configureTestBedWithoutReset(moduleDefinition);

  beforeEach(() => {
    // Reset parent component inputs
    if (hostComponent) {
      hostComponent.customIcon = 'csv';
      fixture.detectChanges();
    }

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    icon1 = hostComponent.one;
    icon2 = hostComponent.two;
  });


  test(`should exist`, () => {
    expect(icon1).toBeTruthy();
    expect(icon2).toBeTruthy();
  });


  describe(`svgIcon`, () => {

    test(`should log a warning if an invalid value was passed in`, () => {
      window.console.warn = jest.fn();
      hostComponent.customIcon = 'foo' as any;
      fixture.detectChanges();

      expect(window.console.warn).toHaveBeenCalled();
      expect(icon2.svgIcon).toBeUndefined();
    });


    test(`should inject the custom icon`, () => {
      hostComponent.customIcon = 'csv';
      fixture.detectChanges();
      const svg = fixture.debugElement.queryAll(By.css('mat-icon'));

      expect(svg).toBeTruthy();
    });

  });


  describe(`background`, () => {

    test(`should get/set the background flag`, () => {
      expect(icon1.background).toEqual(false);
      hostComponent.hasBackground = true;
      fixture.detectChanges();
      expect(icon1.background).toEqual(true);
    });

  });

});
