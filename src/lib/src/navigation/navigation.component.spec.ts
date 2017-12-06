import { ChangeDetectorRefMock } from './../utilities/testing/mocks/changeDetectorRef.mock';
import { fakeAsync, tick } from '@angular/core/testing';

import { TsNavigationComponent } from './navigation.component';
import { TsNavigationItem } from './../utilities/interfaces/';

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
    action: {
      type: 'foo:bar',
    },
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
  {
    nativeElement: {
      offsetWidth: 50,
    },
  },
  {
    nativeElement: {
      offsetWidth: 100,
    },
  },
  {
    nativeElement: {
      offsetWidth: 200,
    },
  },
];

const visibleItemsListMock = {
  nativeElement: {
    offsetWidth: 180,
  },
};


describe(`TsNavigationComponent`, () => {

  beforeEach(() => {
    this.component = new TsNavigationComponent(new ChangeDetectorRefMock());
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`hiddenItemsLength()`, () => {

    beforeEach(() => {
      this.component.hiddenItems.next(NAV_ITEMS_MOCK);
    });


    it(`should return the length of hiddenItems`, () => {
      // We are bypassing the items setter so we expect 4 even though one is disabled
      expect(this.component.hiddenItemsLength).toEqual(4);
    });

  });


  describe(`usersFullName()`, () => {

    beforeEach(() => {
      this.component.user = null;
    });


    it(`should return the user's full name if it exists`, () => {
      this.component.user = USER_MOCK;

      expect(this.component.usersFullName).toEqual(USER_MOCK.fullName);
    });


    it(`should return the NULL if the full name doesn't exist`, () => {
      expect(this.component.usersFullName).toEqual(null);
    });

  });


  describe(`visibleItemsLength()`, () => {

    beforeEach(() => {
      this.component.visibleItems.next(NAV_ITEMS_MOCK);
    });


    it(`should return the length of visibleItems`, () => {
      expect(this.component.visibleItemsLength).toEqual(4);
    });

  });


  describe(`set items`, () => {

    beforeEach(() => {
      this.component.setUpInitialArrays = jasmine.createSpy('setUpInitialArrays');
      this.component.generateBreakWidths = jasmine.createSpy('generateBreakWidths');
      this.component.updateLists = jasmine.createSpy('updateLists');
      this.component.items = NAV_ITEMS_MOCK;
    });


    it(`should filter out disabled items and save the array to pristineItems`, () => {
      // Expect one item to be filtered out
      expect(this.component.pristineItems.length).toEqual(3);
      expect(this.component.setUpInitialArrays).toHaveBeenCalled();
      expect(this.component.generateBreakWidths).toHaveBeenCalled();
      expect(this.component.updateLists).toHaveBeenCalled();
    });

  });


  describe(`onResize()`, () => {

    it(`should call updateLists()`, () => {
      this.component.updateLists = jasmine.createSpy('updateLists');
      this.component.onResize();

      expect(this.component.updateLists).toHaveBeenCalled();
    });

  });


  describe(`ngOnInit()`, () => {

    it(`should call to set up the initial array`, () => {
      this.component.setUpInitialArrays = jasmine.createSpy('setUpInitialArrays');
      this.component.ngOnInit();
      expect(this.component.setUpInitialArrays).toHaveBeenCalled();
    });

  });


  describe(`ngAfterViewInit()`, () => {

    beforeEach(() => {
      this.component.updateLists = jasmine.createSpy('updateLists');
      this.component.visibleLinkElement = visibleLinkElementMock;
    });


    it(`should set the breakWidths array items and trigger a layout update`, (done) => {
      this.component.ngAfterViewInit();

      expect(this.component.breakWidths).toEqual([50, 150, 350]);

      setTimeout(() => {
        expect(this.component.updateLists).toHaveBeenCalled();
        done();
      });
    });

  });


  describe(`setUpInitialArrays()`, () => {

    it(`should push the updated arrays to visibleItems and hiddenItems`, () => {
      this.component.setUpInitialArrays(NAV_ITEMS_MOCK);

      expect(this.component.visibleItems.getValue().length).toEqual(3);
      expect(this.component.hiddenItems.getValue().length).toEqual(1);
    });

  });


  describe(`updateLists()`, () => {

    // NOTE: For some reason we need to re-declare the visibleItemsList element each time. Using the
    // mock created very odd issues even when using Object.assign or {...}
    beforeEach(() => {
      this.component.visibleItemsList = {
        nativeElement: {
          offsetWidth: 180,
        },
      };
      this.component.visibleLinkElement = visibleLinkElementMock;
      this.component.breakWidths = [50, 150, 350];
      this.component.items = NAV_ITEMS_MOCK;
    });


    describe(`when there is not enough space`, () => {

      it(`should move one item to hiddenItems`, () => {
        expect(this.component.visibleItemsLength).toEqual(2);
        expect(this.component.hiddenItemsLength).toEqual(1);

        this.component.visibleItemsList.nativeElement.offsetWidth = 140;
        this.component.updateLists();

        expect(this.component.visibleItemsLength).toEqual(1);
        expect(this.component.hiddenItemsLength).toEqual(2);
      });

    });


    describe(`when there is enough space`, () => {

      it(`should move an item to visibleItems if there is enough space`, () => {
        expect(this.component.visibleItemsLength).toEqual(2);
        expect(this.component.hiddenItemsLength).toEqual(1);

        this.component.visibleItemsList = {
          nativeElement: {
            offsetWidth: 380,
          },
        };
        this.component.updateLists();

        expect(this.component.visibleItems.getValue().length).toEqual(3);
        expect(this.component.hiddenItems.getValue().length).toEqual(0);
      });

    });

  });


  describe(`isExternalLink()`, () => {

    it(`should return true if the destination is a string to an external link`, () => {
      expect(this.component.isExternalLink('http://google.com')).toEqual(true);
    });


    it(`should return false if the destination doesn't begin with http`, () => {
      expect(this.component.isExternalLink('foo/bar')).toEqual(false);
    });


    it(`should return false if the destination is an array`, () => {
      expect(this.component.isExternalLink(['foo', '/bar'])).toEqual(false);
    });

  });

});
