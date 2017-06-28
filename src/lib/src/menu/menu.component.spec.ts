import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdIconModule,
  MdMenuModule,
} from '@angular/material';

import { TsMenuComponent } from './menu.component';


@Component({
  template: `
  <div>
    <ts-menu [menuItems]="items" [isDisabled]="disabled" [defaultOpened]="menuOpened"></ts-menu>
  </div>`,
})
class TestHostComponent {
  items = [
    {
      name: 'Item 1',
      icon: 'build',
      action: 'foobar',
    },
    {
      name: 'Item 2',
      icon: null,
      action: 'barbaz',
    },
    {
      name: 'Item 3',
      icon: 'announcement',
      action: 'bing',
    },
  ];
  menuOpened = true;
}


describe(`TsMenuComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MdIconModule,
        MdMenuModule,
      ],
      declarations: [
        TsMenuComponent,
        TestHostComponent,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    })
      .compileComponents()
      .then(() => {
        this.fixture = TestBed.createComponent(TsMenuComponent);
        this.component = this.fixture.componentInstance;
      })
    ;
  }));


  it(`should be created`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
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


  describe(`_hasAtLeastOneIcon()`, () => {

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

      expect(this.component._hasAtLeastOneIcon(arrayMock)).toEqual(true);
    });


    it(`should return FALSE if no array items have a value for 'icon'`, () => {
      this.fixture.detectChanges();
      const arrayMock = [
        {
          name: 'foo',
          icon: null,
        },
      ];
      expect(this.component._hasAtLeastOneIcon(arrayMock)).toEqual(false);
    });

  });


});

