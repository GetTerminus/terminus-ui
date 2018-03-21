import { Component } from '@angular/core';
import {
  TestBed,
  async,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TsCardTitleDirective } from './card-title.directive';
/*
 *import { TsCardComponent } from './card.component';
 */

@Component({
  selector: 'ts-card',
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
})
class TsCardComponent {}

@Component({
  template: `
    <ts-card>
      <h3 tsCardTitle>Hi</h3>
    </ts-card>
  `,
})
class TestHostComponent {}

@Component({
  template: `
    <h3 tsCardTitle class="fooooo">Hi</h3>
  `,
})
class TestHostErrorComponent {}


describe(`TsCardTitleDirective`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TsCardTitleDirective,
        TsCardComponent,
        TestHostComponent,
        TestHostErrorComponent,
      ],
    }).compileComponents();

  }));


  it(`should add the title class`, () => {
    this.fixture = TestBed.createComponent(TestHostComponent);
    this.testHost = this.fixture.componentInstance;
    this.fixture.detectChanges();
    const classElement = this.fixture.debugElement.query(By.directive(TsCardTitleDirective));
    expect(classElement.properties.className).toEqual('c-card__title');
  });


  it(`should throw an error if not nested within a TsCardComponent`, () => {
    this.component = new TsCardComponent();
    this.directive = new TsCardTitleDirective(this.component);
    const errorMessage = `The 'tsCardTitle' directive must be inside a <ts-card> component.`;
    expect(() => this.directive.ngOnChanges()).toThrowError(errorMessage);
  });

});

