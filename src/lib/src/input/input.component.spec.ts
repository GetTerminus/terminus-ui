import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    MdIconModule,
    MdInputModule,
} from '@angular/material';
import { LaddaModule } from 'angular2-ladda';

import { InputComponent } from './input.component';

@Component({
  selector: 't-input-messages',
  template: `<div></div>`,
})
class InputMessagesComponentMock {}

@Component({
  template: `
  <div>
    <t-input [value]="myValue"></t-input>
  </div>`,
})
class TestHostComponent {
  myValue = 'foo';
}

fdescribe(`InputComponent`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MdIconModule,
        MdInputModule,
      ],
      declarations: [
        InputComponent,
        TestHostComponent,
        InputMessagesComponentMock,
      ],
    }).overrideComponent(InputComponent, {
        set: {
          template: '',
        },
      });

    this.fixture = TestBed.createComponent(InputComponent);
    this.component = this.fixture.componentInstance;

    this.fixture.detectChanges();
  });


  it(`should exist`, () => {
    console.log('this.component: ', this.component);
    expect(this.component).toBeTruthy();
  });


  describe(`clearInput()`, () => {

    /*
     *it(`should clear 'value'`, () => {
     *  this.component.validateInputs('foo', 'primary', 'button');
     *  expect(this.component.loggingService.warn).toHaveBeenCalled();
     *});
     */

  });


  describe(`enableValidation()`, () => {

    /*
     *it(`should enable validation via a boolean`, () => {
     *  this.component.validateInputs('foo', 'primary', 'button');
     *  expect(this.component.loggingService.warn).toHaveBeenCalled();
     *});
     */

  });

});

