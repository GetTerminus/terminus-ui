
import { TsMenuComponent } from './menu.component';


describe(`TsMenuComponent`, function() {
  let component: TsMenuComponent;

  beforeEach(() => {
    component = new TsMenuComponent();
  });


  it(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`isUtilityMenu()`, () => {

    it(`should return true if the menu is a utility menu`, () => {
      component.triggerType = 'utility';
      expect(component.isUtilityMenu).toEqual(true);

      component.triggerType = 'default';
      expect(component.isUtilityMenu).toEqual(false);
    });

  });


  describe(`ngOnInit()`, () => {

    it(`should set the correct trigger icon`, () => {
      component.triggerType = 'default';
      component.ngOnInit();

      expect(component.triggerIcon).toEqual(component.TRIGGER_ICON_DEFAULT);

      component.triggerType = 'utility';
      component.ngOnInit();

      expect(component.triggerIcon).toEqual(component.TRIGGER_ICON_UTILITY);
    });

  });


  describe(`ngAfterViewInit()`, () => {

    it(`should not open the menu when 'defaultOpened' is FALSE`, () => {
      component.trigger = { openMenu: jest.fn() } as any;
      component.ngAfterViewInit();

      expect(component.trigger.openMenu).not.toHaveBeenCalled();
    });


    it(`should open the menu when 'defaultOpened' is TRUE`, () => {
      component.defaultOpened = true;
      component.trigger = { openMenu: jest.fn() } as any;
      component.ngAfterViewInit();

      expect(component.trigger.openMenu).toHaveBeenCalled();
    });

  });

});
