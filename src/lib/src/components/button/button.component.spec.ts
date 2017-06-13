import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    MdIconModule,
    MdButtonModule,
} from '@angular/material';
import { LaddaModule } from 'angular2-ladda';

import { ButtonComponent } from './button.component';

@Component({
  template: `
  <div>
    <t-button>Search</t-button>
  </div>`,
})
class TestHostComponent {}

describe(`ButtonComponent`, () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MdButtonModule,
        MdIconModule,
        LaddaModule.forRoot({
          style: 'expand-right',
        }),
      ],
      declarations: [
        ButtonComponent,
        TestHostComponent,
      ],
    }).overrideComponent(ButtonComponent, {
        set: {
          template: '',
        },
      });

    this.fixture = TestBed.createComponent(ButtonComponent);
    this.component = this.fixture.componentInstance;

    this.fixture.detectChanges();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


});
