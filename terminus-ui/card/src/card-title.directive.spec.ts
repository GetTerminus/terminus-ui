import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { createComponent } from '@terminus/ngx-tools/testing';

import { TsCardTitleDirective } from './card-title.directive';
import { TsCardModule } from './card.module';


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
    <ts-card>
      <h3 tsCardTitle tsTitleAccentBorder>Hi</h3>
    </ts-card>
  `,
})
class TestHostAccentBorderComponent {}

@Component({
  template: `
    <h3 tsCardTitle class="fooooo">Hi</h3>
  `,
})
class TestHostErrorComponent {}


describe(`TsCardTitleDirective`, () => {

  test(`should add the title class`, () => {
    const fixture = createComponent(TestHostComponent, [], [TsCardModule]);
    fixture.detectChanges();
    const classElement = fixture.debugElement.query(By.directive(TsCardTitleDirective));

    expect(classElement.properties.className).toEqual('c-card__title');
  });


  test(`should add the accent border class`, () => {
    const fixture = createComponent(TestHostAccentBorderComponent, [], [TsCardModule]);
    fixture.detectChanges();
    const classElement = fixture.debugElement.query(By.directive(TsCardTitleDirective));

    expect(classElement.properties.className).toEqual('c-card__title c-card__title-accent-border');
  });


  test(`should throw an error if not nested within a TsCardComponent`, () => {
    const create = () => {
      const fixture = createComponent(TestHostErrorComponent, [], [TsCardModule]);
      fixture.detectChanges();
    };

    expect(create).toThrow();
  });

});
