import { Component, ViewChild } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { createComponent } from '@terminus/ngx-tools/testing';

import { TsCardComponent, TsCardBorderOptions } from './card.component';
import { TsCardModule } from './card.module';
import { TsStyleThemeTypes } from '../../utilities/src/public-api';

@Component({
  template: `
  <ts-card
    [isDisabled]="disabled"
    [flat]="flat"
    [supportsInteraction]="supportsInteraction"
    [theme]="theme"
    [border]="border"
  >
  Here is my card!
  </ts-card>
  `,
})
class TestHostComponent {
  border: TsCardBorderOptions | undefined;
  disabled!: boolean;
  flat!: boolean;
  supportsInteraction!: boolean;
  theme: TsStyleThemeTypes | undefined;

  @ViewChild(TsCardComponent)
  cardComponent!: TsCardComponent;
}

describe(`TsCardComponent`, function() {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let card: HTMLElement;
  let cardComponent: TsCardComponent;
  let cardComponent2: TsCardComponent;

  beforeEach(() => {
    fixture = createComponent(TestHostComponent, [], [TsCardModule]);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cardComponent = component.cardComponent;
    card = fixture.debugElement.query(By.css('.c-card')).nativeElement as HTMLElement;
    cardComponent2 = new TsCardComponent();
  });

  describe(`isDisabled`, function() {
    test(`should not disable a card`, () => {
      expect(cardComponent.disabled).toEqual(false);
      component.disabled = false;
      fixture.detectChanges();
      expect(cardComponent.isDisabled).toEqual(false);
      expect(cardComponent.disabled).toEqual(false);
      expect(card.classList).not.toContain('c-card--disabled');
    });

    test(`should disable a card`, () => {
      component.disabled = true;
      fixture.detectChanges();
      expect(cardComponent.isDisabled).toEqual(true);
      expect(cardComponent.disabled).toEqual(true);
      expect(card.classList).toContain('c-card--disabled');
    });
  });

  describe(`isFlat`, function() {
    test(`should flat a card`, () => {
      component.flat = true;
      fixture.detectChanges();
      expect(cardComponent.flat).toEqual(true);
      expect(card.classList).toContain('c-card--flat');
    });

    test(`should not flat a card`, () => {
      component.flat = false;
      fixture.detectChanges();
      expect(cardComponent.flat).toEqual(false);
      expect(card.classList).not.toContain('c-card--flat');
    });
  });

  describe(`supportsInteraction`, function() {
    test(`should support interaction`, () => {
      component.supportsInteraction = true;
      fixture.detectChanges();
      expect(cardComponent.supportsInteraction).toEqual(true);
      expect(card.classList).toContain('c-card--interaction');
    });

    test(`should not support interaction`, () => {
      component.supportsInteraction = false;
      fixture.detectChanges();
      expect(cardComponent.supportsInteraction).toEqual(false);
      expect(card.classList).not.toContain('c-card--interaction');
    });
  });

  describe(`centeredContent`, function() {
    it(`should set position centered`, () => {
      expect(cardComponent.centeredContent).toEqual(false);
      cardComponent.centeredContent = true;
      expect(cardComponent.centeredContent).toEqual(true);
    });
  });

  describe(`set aspectRatio()`, function() {
    it(`should convert the string aspect to a percentage`, () => {
      cardComponent.aspectRatio = '16:9';
      fixture.detectChanges();
      expect(cardComponent.aspectRatioPadding).toEqual('56.25%');

      cardComponent.aspectRatio = '4:3';
      fixture.detectChanges();
      expect(cardComponent.aspectRatioPadding).toEqual('75.00%');
    });
  });

  describe(`id`, function() {

    test(`should set a unique ID and be overwritable and default to UUID if no value is passed in`, () => {
      expect(cardComponent.id).toBeTruthy();
      expect(cardComponent2.id).toBeTruthy();
      expect(cardComponent.id).not.toEqual(cardComponent2.id);

      cardComponent.id = 'foo';
      expect(cardComponent.id).toEqual('foo');

      cardComponent.id = null as any;
      expect(cardComponent.id).toEqual(cardComponent['_uid']);
    });

  });

  describe(`theme`, function() {

    test(`should set a default and allow overrides`, () => {
      expect(cardComponent.theme).toEqual('primary');
      component.theme = 'warn';
      fixture.detectChanges();
      expect(cardComponent.theme).toEqual('warn');
      expect(card.classList).toContain('c-card--warn');
    });


    test(`should do nothing if no value is passed in`, () => {
      cardComponent.theme = '' as any;
      expect(cardComponent.theme).toEqual('primary');
      expect(card.classList).toContain('c-card--primary');
    });

  });


  describe(`border`, function() {

    test(`should do nothing if no value is passed in`, () => {
      cardComponent.border = '' as any;
      fixture.detectChanges();
      expect(cardComponent.border).toEqual('none');
      expect(card.classList).not.toContain('c-card--border');
    });

  });


  describe(`get borderClass`, function() {

    test(`should return a string representation of the needed class`, () => {
      expect(cardComponent.borderClass).toEqual('');
      component.border = 'top';
      fixture.detectChanges();
      expect(cardComponent.borderClass).toEqual('c-card--border-top');
      expect(card.classList).toContain('c-card--border-top');
    });

  });

});
