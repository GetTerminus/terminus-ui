import { TsCardComponent } from './card.component';


describe('TsCardComponent', () => {
  let component: TsCardComponent;
  let component2: TsCardComponent;

  beforeEach(() => {
    component = new TsCardComponent();
    component2 = new TsCardComponent();
  });


  it(`should exist`, () => {
    expect(component).toBeTruthy();
  });


  describe(`set aspectRatio()`, () => {

    it(`should convert the string aspect to a percentage`, () => {
      component.aspectRatio = '16:9';
      expect(component.aspectRatioPadding).toEqual('56.25%');

      component.aspectRatio = '4:3';
      expect(component.aspectRatioPadding).toEqual('75.00%');
    });

  });


  describe(`id`, () => {

    test(`should set a unique ID and be overwritable and default to UUID if no value is passed in`, () => {
      expect(component.id).toBeTruthy();
      expect(component2.id).toBeTruthy();
      expect(component.id).not.toEqual(component2.id);

      component.id = 'foo';
      expect(component.id).toEqual('foo');

      component.id = null as any;
      expect(component.id).toEqual(component['_uid']);
    });

  });

  describe(`flat`, () => {

    test(`should set flat flag correctly`, () => {
      component.flat = true;
      expect(component.flat).toEqual(true);
    });

  });

  describe(`disabled`, () => {

    test(`should set disabled flag correctly`, () => {
      component.disabled = true;
      expect(component.disabled).toEqual(true);
    });

  });


  describe(`theme`, () => {

    test(`should set a default and allow overrides`, () => {
      expect(component.theme).toEqual('primary');
      component.theme = 'warn';
      expect(component.theme).toEqual('warn');
    });


    test(`should do nothing if no value is passed in`, () => {
      component.theme = '' as any;
      expect(component.theme).toEqual('primary');
    });

  });


  describe(`border`, () => {

    test(`should do nothing if no value is passed in`, () => {
      component.border = '' as any;
      expect(component.border).toEqual('none');
    });

  });


  describe(`get borderClass`, () => {

    test(`should return a string representation of the needed class`, () => {
      expect(component.borderClass).toEqual('');
      component.border = 'top';
      expect(component.borderClass).toEqual('c-card--border-top');
    });

  });

});
