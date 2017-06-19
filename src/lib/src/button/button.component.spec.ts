import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    MdIconModule,
    MdButtonModule,
} from '@angular/material';
import { LaddaModule } from 'angular2-ladda';

import { TsButtonComponent } from './button.component';

@Component({
  template: `
  <div>
    <ts-button>Search</ts-button>
  </div>`,
})
class TestHostComponent {}

describe(`ButtonComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdButtonModule,
        MdIconModule,
        LaddaModule.forRoot({
          style: 'expand-right',
        }),
      ],
      declarations: [
        TsButtonComponent,
        TestHostComponent,
      ],
    })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TsButtonComponent);
        this.component = this.fixture.componentInstance;

        this.fixture.detectChanges();
      });
  }));


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });

});
