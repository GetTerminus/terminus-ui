import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdIconModule,
    MdInputModule,
} from '@angular/material';

import { TsInputComponent } from './input.component';


@Component({
  template: `
  <div>
    <ts-input [initialValue]="val"></ts-input>
  </div>`,
})
class TestHostComponent {
  val = 'foo';
}


describe(`TsInputComponent`, () => {

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
        this.fixture = TestBed.createComponent(TsInputComponent);
        this.component = this.fixture.componentInstance;
        this.fixture.detectChanges();
      })
    ;
  }));


  it(`should be created`, () => {
    expect(this.component).toBeTruthy();
  });


  // TODO
/*
 *  describe(`clearInput()`, () => {
 *
 *    it(`should clear 'value'`, () => {
 *    });
 *
 *  });
 */


  describe(`enableValidation()`, () => {

    it(`should enable validation via a boolean`, () => {
      expect(this.component.validationEnabled).toBe(false);
      this.component.enableValidation();
      expect(this.component.validationEnabled).toBe(true);
    });

  });

});

