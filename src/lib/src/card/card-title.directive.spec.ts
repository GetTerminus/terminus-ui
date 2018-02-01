import { Component } from '@angular/core';
import {
  TestBed,
  async,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TsCardTitleDirective } from './card-title.directive';


@Component({
  template: `
    <h3 tsCardTitle>Hi</h3>
  `,
})
class TestHostComponent {}


describe(`TsCardTitleDirective`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TsCardTitleDirective,
        TestHostComponent,
      ],
    }).compileComponents();

    this.fixture = TestBed.createComponent(TestHostComponent);
    this.testHost = this.fixture.componentInstance;
    this.fixture.detectChanges();
  }));


  it(`should add the title class`, () => {
    const classElement = this.fixture.debugElement.query(By.directive(TsCardTitleDirective));
    expect(classElement.properties.className).toEqual('c-card__title');
  });

});

