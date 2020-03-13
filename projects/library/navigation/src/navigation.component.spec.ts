import { ChangeDetectorRefMock } from '@terminus/ngx-tools/testing';

import {
  TsNavigationComponent,
  TsNavigationItem,
} from './navigation.component';

const NAV_ITEMS_MOCK: TsNavigationItem[] = [
  {
    name: 'NAV_ITEM_ONE',
    destination: ['/foo'],
    alwaysHidden: false,
  },
  {
    name: 'NAV_ITEM_TWO',
    destination: ['/foo/bar'],
    alwaysHidden: false,
  },
  {
    name: 'NAV_ITEM_THREE',
    action: { type: 'foo:bar' },
    alwaysHidden: true,
  },
  {
    name: 'NAV_ITEM_FOUR',
    destination: ['/foo/bar/baz/bing'],
    alwaysHidden: false,
    isDisabled: true,
  },
];

const USER_MOCK = {
  id: 1,
  email: 'max@roadwarrior.com',
  firstname: 'Max',
  lastname: 'Rockatansky',
  fullName: 'Max Rockatansky',
};

const visibleLinkElementMock = [
  { nativeElement: { offsetWidth: 50 } },
  { nativeElement: { offsetWidth: 100 } },
  { nativeElement: { offsetWidth: 200 } },
];

describe(`TsNavigationComponent`, function() {
  let component: TsNavigationComponent;

  beforeEach(() => {
    component = new TsNavigationComponent(new ChangeDetectorRefMock());
  });

  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });

  describe(`usersFullName()`, () => {
    beforeEach(() => {
      component.user = null as any;
    });

    test(`should return the user's full name if it exists`, () => {
      component.user = USER_MOCK;

      expect(component.usersFullName).toEqual(USER_MOCK.fullName);
    });

    test(`should return the NULL if the full name doesn't exist`, () => {
      expect(component.usersFullName).toEqual(null);
    });

    test(`should accept character count of userNameLength`, () => {
      component.user = USER_MOCK;
      component.userNameLength = 10;

      expect(component.usersFullName).toEqual(USER_MOCK.fullName);
      // NOTE: the following lines can be tested once this test has been converted and detectChanges() can be called.
      // there is no class for the user name, so might taking the second child of .mat-button-wrapper
      // expect(document.querySelector('.mat-button-wrapper span:nth-child(2)')).not.toBeNull();
      // expect(document.querySelector('.mat-button-wrapper span:nth-child(2) > .ts-tooltip > .c-tooltip').textContent.trim().length)
      //   .toEqual(10);
    });
  });

  describe(`welcome message`, () => {
    test(`should exist`, () => {
      expect(component.welcomeMessage).toEqual('Welcome');
    });

    test(`should accept character count of welcomeMsgLength`, () => {
      component.welcomeMessage = 'This message has 31 characters.';
      component.welcomeMsgLength = 20;

      expect(component.welcomeMessage).toEqual('This message has 31 characters.');
      // NOTE: the following lines can be tested once this test has been converted and can detectChanges() can be called.
      // expect(document.querySelector('.c-navigation__trigger-welcome')).not.toBeNull();
      // expect(document.querySelector('.c-navigation__trigger-welcome > .ts-tooltip > .c-tooltip')).textContent.trim().length.toEqual(20);
    });
  });

  describe(`visibleItemsLength()`, () => {
    beforeEach(() => {
      component.visibleItems.next(NAV_ITEMS_MOCK);
    });

    test(`should return the length of visibleItems`, () => {
      expect(component.visibleItemsLength).toEqual(4);
    });
  });

  describe(`set items`, () => {
    beforeEach(() => {
      component['setUpInitialArrays'] = jest.fn();
      component['generateBreakWidths'] = jest.fn();
      component['updateLists'] = jest.fn();
      component.items = NAV_ITEMS_MOCK;
    });

    test(`should filter out disabled items and save the array to pristineItems`, () => {
      // Expect one item to be filtered out
      expect(component['pristineItems'].length).toEqual(3);
      expect(component['setUpInitialArrays']).toHaveBeenCalled();
      expect(component['generateBreakWidths']).toHaveBeenCalled();
      expect(component['updateLists']).toHaveBeenCalled();
    });
  });

  describe(`onResize()`, () => {
    test(`should call updateLists()`, () => {
      component['updateLists'] = jest.fn();
      component.onResize();

      expect(component['updateLists']).toHaveBeenCalled();
    });
  });

  describe(`ngOnInit()`, () => {
    test(`should call to set up the initial array`, () => {
      component['setUpInitialArrays'] = jest.fn();
      component.ngOnInit();
      expect(component['setUpInitialArrays']).toHaveBeenCalled();
    });
  });

  describe(`ngAfterViewInit()`, () => {
    beforeEach(() => {
      component['updateLists'] = jest.fn();
      component.visibleLinkElement = visibleLinkElementMock as any;
    });

    test(`should set the breakWidths array items and trigger a layout update`, done => {
      component.ngAfterViewInit();

      expect(component['breakWidths']).toEqual([50, 150, 350]);

      setTimeout(() => {
        expect(component['updateLists']).toHaveBeenCalled();
        done();
      });
    });
  });

  describe(`setUpInitialArrays()`, () => {
    test(`should push the updated arrays to visibleItems and hiddenItems`, () => {
      component['setUpInitialArrays'](NAV_ITEMS_MOCK);

      expect(component.visibleItems.getValue().length).toEqual(3);
      expect(component.hiddenItems.getValue().length).toEqual(1);
    });
  });

  describe(`updateLists()`, () => {
    // NOTE: For some reason we need to re-declare the visibleItemsList element each time. Using the
    // mock created very odd issues even when using Object.assign or {...}
    beforeEach(() => {
      component.visibleItemsList = { nativeElement: { offsetWidth: 180 } };
      component.visibleLinkElement = visibleLinkElementMock as any;
      component['breakWidths'] = [50, 150, 350];
      component.items = NAV_ITEMS_MOCK;
    });

    describe(`when there is not enough space`, () => {
      test(`should move one item to hiddenItems`, () => {
        expect(component.visibleItemsLength).toEqual(2);
        expect(component.hiddenItems.getValue().length).toEqual(1);

        component.visibleItemsList.nativeElement.offsetWidth = 140;
        component['updateLists']();

        expect(component.visibleItemsLength).toEqual(1);
        expect(component.hiddenItems.getValue().length).toEqual(2);
      });
    });

    describe(`when there is enough space`, () => {
      test(`should move an item to visibleItems if there is enough space`, () => {
        expect(component.visibleItemsLength).toEqual(2);
        expect(component.hiddenItems.getValue().length).toEqual(1);

        component.visibleItemsList = { nativeElement: { offsetWidth: 380 } };
        component['updateLists']();

        const actualVisibleLength = component.visibleItems.getValue().length;
        const actualHiddenLength = component.hiddenItems.getValue().length;
        expect(actualVisibleLength).toEqual(3);
        expect(actualHiddenLength).toEqual(0);
        expect(component.visibleItems.getValue()[actualVisibleLength - 1].name).toEqual('NAV_ITEM_THREE');
      });
    });
  });

  describe(`isExternalLink()`, () => {
    test(`should return true if the destination is a string to an external link`, () => {
      expect(component.isExternalLink('http://google.com')).toEqual(true);
    });

    test(`should return false if the destination doesn't begin with http`, () => {
      expect(component.isExternalLink('foo/bar')).toEqual(false);
    });

    test(`should return false if the destination is an array`, () => {
      expect(component.isExternalLink(['foo', '/bar'])).toEqual(false);
    });
  });

  describe(`trackByFn`, function() {
    test(`should return the index passed to it`, function() {
      expect(component.trackByFn(3)).toEqual(3);
      expect(component.trackByFn(6)).toEqual(6);
    });
  });
});
