import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdSelectModule,
} from '@angular/material';

import { TsSelectComponent } from './select.component';

@Component({
  template: `
    <div>
      <ts-select>Search</ts-select>
    </div>
  `,
})
class TestHostComponent {}

describe(`TsSelectComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MdSelectModule,
      ],
      declarations: [
        TsSelectComponent,
        TestHostComponent,
      ],
    })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TsSelectComponent);
        this.component = this.fixture.componentInstance;
      });
  }));


  it(`Should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });


  describe(`getValueKey()`, () => {

    it(`should return the item if no valueKey was passed in`, () => {
      this.fixture.detectChanges();
      const items = ['a', 'b'];

      expect(this.component.getValueKey(items[0])).toEqual('a');
      expect(this.component.getValueKey(items[1])).toEqual('b');
    });

    it(`should return the correct value for the valueKey`, () => {
      this.fixture.detectChanges();
      const items = [
        {
          name: 'AAA',
          thing: 'aaa',
        },
        {
          name: 'BBB',
          thing: 'bbb',
        },
      ];

      expect(this.component.getValueKey(items[0], 'thing')).toEqual('aaa');
    });

  });

});

