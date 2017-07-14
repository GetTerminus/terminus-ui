import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TsCopyComponent } from './copy.component';

@Component({
  template: `
    <div>
      <ts-copy>
      </ts-copy>
    </div>
  `,
})
class TestHostComponent {}

describe(`TsCopyComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        TsCopyComponent,
        TestHostComponent,
      ],
    })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TsCopyComponent);
        this.component = this.fixture.componentInstance;
      });
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });

});
