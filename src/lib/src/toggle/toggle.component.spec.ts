import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  MdSlideToggleModule,
} from '@angular/material';

import { TsToggleComponent } from './toggle.component';

@Component({
  template: `
    <div>
      <ts-toggle
        [(ngModel)]="myModel"
      >My toggle</ts-toggle>
    </div>
  `,
})
class TestHostComponent {
  myModel = false;
}

describe(`ToggleComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MdSlideToggleModule,
      ],
      declarations: [
        TsToggleComponent,
        TestHostComponent,
      ],
    })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TsToggleComponent);
        this.component = this.fixture.componentInstance;
      });
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });

});

