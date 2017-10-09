import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule,
  MatMenuModule,
} from '@angular/material';

import { TsMenuComponent } from './menu.component';


describe(`TsMenuComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatIconModule,
        MatMenuModule,
      ],
      declarations: [
        TsMenuComponent,
      ],
    })
      .overrideComponent(TsMenuComponent, {
        set: {
          template: '',
          templateUrl: null,
        }
      })
      .compileComponents()
      .then(() => {
        this.fixture = TestBed.createComponent(TsMenuComponent);
        this.component = this.fixture.componentInstance;
      })
    ;
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });


  describe(`ngOnInit()`, () => {

    it(`should set the hasIcons flag`, () => {
      this.component.hasAtLeastOneIcon = jasmine.createSpy('hasAtLeastOneIcon');
      this.fixture.detectChanges();

      expect(this.component.hasAtLeastOneIcon).toHaveBeenCalled();
    });

  });


  describe(`ngAfterViewInit()`, () => {

    it(`should not open the menu when 'defaultOpened' is FALSE`, () => {
      this.component.trigger = {
        openMenu: jasmine.createSpy('openMenu'),
      };
      this.fixture.detectChanges();

      expect(this.component.trigger.openMenu).not.toHaveBeenCalled();
    });


    it(`should open the menu when 'defaultOpened' is TRUE`, () => {
      this.component.defaultOpened = true;
      this.component.trigger = {
        openMenu: jasmine.createSpy('openMenu'),
      };
      this.fixture.detectChanges();

      expect(this.component.trigger.openMenu).toHaveBeenCalled();
    });

  });


  describe(`hasAtLeastOneIcon()`, () => {

    it(`should return TRUE if any array item has a value for 'icon'`, () => {
      this.fixture.detectChanges();
      const arrayMock = [
        {
          name: 'a',
          icon: 'a',
        },
        {
          name: 'b',
          icon: null,
        },
        {
          name: 'c',
          icon: 'c',
        },
      ];

      expect(this.component.hasAtLeastOneIcon(arrayMock)).toEqual(true);
    });


    it(`should return FALSE if no array items have a value for 'icon'`, () => {
      this.fixture.detectChanges();
      const arrayMock = [
        {
          name: 'foo',
        },
      ];
      expect(this.component.hasAtLeastOneIcon(arrayMock)).toEqual(false);
    });

  });


});

