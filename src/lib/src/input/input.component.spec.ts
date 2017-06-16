import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    MdIconModule,
    MdInputModule,
} from '@angular/material';
import { LaddaModule } from 'angular2-ladda';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TsInputComponent } from './input.component';


@Component({
  template: `
  <div>
    <ts-input></ts-input>
  </div>`,
})
class TestHostComponent {
}

describe(`TsInputComponent`, () => {
  let component: TsInputComponent;
  let fixture: ComponentFixture<TsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MdIconModule,
        MdInputModule,
      ],
      declarations: [
        TsInputComponent,
        TestHostComponent,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TsInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      })
    ;
  }));


  it(`should exist`, () => {
    expect(component).toBeTruthy();
  });


/*
 *  describe(`clearInput()`, () => {
 *
 *    it(`should clear 'value'`, () => {
 *      this.component.validateInputs('foo', 'primary', 'button');
 *      expect(this.component.loggingService.warn).toHaveBeenCalled();
 *    });
 *
 *  });
 *
 *
 *  describe(`enableValidation()`, () => {
 *
 *    it(`should enable validation via a boolean`, () => {
 *      this.component.validateInputs('foo', 'primary', 'button');
 *      expect(this.component.loggingService.warn).toHaveBeenCalled();
 *    });
 *
 *  });
 */

});

