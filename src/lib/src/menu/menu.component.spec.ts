import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule,
  MatMenuModule,
} from '@angular/material';

import { TsMenuComponent } from './menu.component';


describe(`TsMenuComponent`, () => {

  beforeEach(() => {
    this.component = new TsMenuComponent();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`isUtilityMenu()`, () => {

    it(`should return true if the menu is a utility menu`, () => {
      this.component.triggerType = 'utility';
      expect(this.component.isUtilityMenu).toEqual(true);

      this.component.triggerType = 'default';
      expect(this.component.isUtilityMenu).toEqual(false);
    });

  });


  describe(`ngOnInit()`, () => {

    it(`should set the correct trigger icon`, () => {
      this.component.triggerType = 'default';
      this.component.ngOnInit();

      expect(this.component.triggerIcon).toEqual(this.component.TRIGGER_ICON_DEFAULT);

      this.component.triggerType = 'utility';
      this.component.ngOnInit();

      expect(this.component.triggerIcon).toEqual(this.component.TRIGGER_ICON_UTILITY);
    });

  });


  describe(`ngAfterViewInit()`, () => {

    it(`should not open the menu when 'defaultOpened' is FALSE`, () => {
      this.component.trigger = {
        openMenu: jasmine.createSpy('openMenu'),
      };
      this.component.ngAfterViewInit();

      expect(this.component.trigger.openMenu).not.toHaveBeenCalled();
    });


    it(`should open the menu when 'defaultOpened' is TRUE`, () => {
      this.component.defaultOpened = true;
      this.component.trigger = {
        openMenu: jasmine.createSpy('openMenu'),
      };
      this.component.ngAfterViewInit();

      expect(this.component.trigger.openMenu).toHaveBeenCalled();
    });

  });

});
