//
// TODO: Add tests
//
// Currently disabled due to odd errors.
// Code examples and errors here: http://bnj.bz/2S1Y3P3P1n0N
//

import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MdIconModule,
    MdInputModule,
} from '@angular/material';

import { TsSearchComponent } from './search.component';

@Component({
  template: `
    <div>
      <ts-search></ts-search>
    </div>
  `,
})
class TestHostComponent {}


/*
 *describe('TsSearchComponent', () => {
 *
 *  beforeEach(async(() => {
 *    TestBed.configureTestingModule({
 *      imports: [
 *        BrowserAnimationsModule,
 *        FormsModule,
 *        MdIconModule,
 *        MdInputModule,
 *      ],
 *      declarations: [
 *        TsSearchComponent,
 *        TestHostComponent,
 *      ],
 *      schemas: [
 *        CUSTOM_ELEMENTS_SCHEMA,
 *      ],
 *    })
 *      .overrideComponent(TsSearchComponent, {
 *        set: {
 *          template: '',
 *          templateUrl: null,
 *        }
 *      })
 *      .compileComponents()
 *      .then(() => {
 *        this.fixture = TestBed.createComponent(TsSearchComponent);
 *        this.component = this.fixture.componentInstance;
 *      });
 *  }));
 *
 *
 *  it(`should exist`, () => {
 *    this.fixture.detectChanges();
 *    expect(this.component).toBeTruthy();
 *  });
 *
 *});
 */
