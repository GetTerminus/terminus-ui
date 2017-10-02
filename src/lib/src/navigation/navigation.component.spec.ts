import { fakeAsync, tick } from '@angular/core/testing';

import { TsNavigationComponent } from './navigation.component';
import { TsNavigationItem } from './../utilities/interfaces/';

const NAV_ITEMS_MOCK: TsNavigationItem[] = [
  {
    name: 'NAV_ITEM_ONE',
    action: 'navigate',
    destination: ['/foo'],
    onlyHidden: false,
  },
  {
    name: 'NAV_ITEM_TWO',
    action: 'navigate',
    destination: ['/foo/bar'],
    onlyHidden: false,
  },
  {
    name: 'NAV_ITEM_THREE',
    action: 'navigate',
    destination: ['/foo/bar/baz'],
    onlyHidden: true,
  },
  {
    name: 'NAV_ITEM_FOUR',
    action: 'navigate',
    destination: ['/foo/bar/baz/bing'],
    onlyHidden: false,
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
    offsetWidth: 100,
  },
};


describe(`TsNavigationComponent`, () => {

  beforeEach(() => {
    this.component = new TsNavigationComponent();
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


  describe(`@Input('items')`, () => {

    beforeEach(() => {
      this.component.items = NAV_ITEMS_MOCK;
    });


    it(`should filter out any disabled items and save the array to _pristineItems`, () => {
      // Expect one item to be filtered out
      expect(this.component._pristineItems.length).toEqual(3);
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

    describe(`when there is not enough space`, () => {

      beforeEach(() => {
        this.component.visibleItemsList = visibleItemsListMock;
        this.component.visibleLinkElement = visibleLinkElementMock;
        this.component.items = NAV_ITEMS_MOCK;
        this.component.ngOnInit();
        this.component.ngAfterViewInit();
      });


      it(`should move an item to hiddenItems`, () => {
        expect(this.component.visibleItems.getValue().length).toEqual(2);
        expect(this.component.hiddenItems.getValue().length).toEqual(1);

        this.component.updateLists();

        expect(this.component.visibleItems.getValue().length).toEqual(1);
        expect(this.component.hiddenItems.getValue().length).toEqual(2);
      });

    });


    describe(`when there is enough space`, () => {

      beforeEach(() => {
        this.component.visibleItemsList = visibleItemsListMock;
        this.component.visibleLinkElement = visibleLinkElementMock;
        this.component.items = NAV_ITEMS_MOCK;
        this.component.ngOnInit();
        this.component.ngAfterViewInit();
      });


      it(`should move an item to visibleItems if there is enough space`, () => {
        this.component.updateLists();

        expect(this.component.visibleItems.getValue().length).toEqual(1);
        expect(this.component.hiddenItems.getValue().length).toEqual(2);

        this.component.visibleItemsList.nativeElement.offsetWidth = 200;
        this.component.updateLists();

        expect(this.component.visibleItems.getValue().length).toEqual(2);
        expect(this.component.hiddenItems.getValue().length).toEqual(1);
      });

    });

  });

});
