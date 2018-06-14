import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestModuleMetadata, TestBed } from '@angular/core/testing';
import { configureTestBedWithoutReset } from '@terminus/ngx-tools/testing';

import { TsIconComponent } from './icon.component';
import { TsIconModule } from './icon.module';


@Component({
  template: `
    <ts-icon id="one" #one>home</ts-icon>
    <ts-icon svgIcon="csv" id="two" #two></ts-icon>
  `,
})
class TestHostComponent {

  @ViewChild('one')
  one!: TsIconComponent;

  @ViewChild('two')
  two!: TsIconComponent;
}



describe(`TsIconComponent`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testComponent: TestHostComponent;
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
    fixture = TestBed.createComponent(TestHostComponent);
    testComponent = fixture.componentInstance;
    icon1 = testComponent.one;
    icon2 = testComponent.two;
  });


  test(`should exist`, () => {
    expect(icon1).toBeTruthy();
    expect(icon2).toBeTruthy();
  });

});
