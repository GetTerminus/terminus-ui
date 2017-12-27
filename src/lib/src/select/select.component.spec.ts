import {
  TsSelectComponent,
  CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR,
} from '@select/select.component';


describe(`TsSelectComponent`, () => {

  beforeEach(() => {
    this.component = new TsSelectComponent();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`getValueKey()`, () => {

    it(`should return the item if no valueKey was passed in`, () => {
      const items = ['a', 'b'];

      expect(this.component.getValueKey(items[0])).toEqual('a');
      expect(this.component.getValueKey(items[1])).toEqual('b');
    });


    it(`should return the correct value for the valueKey`, () => {
      const items = [
        {
          name: 'AAA',
          thing: 'aaa',
        },
        {
          name: 'BBB',
          thing: 'bbb',
        },
      ];

      expect(this.component.getValueKey(items[0], 'thing')).toEqual('aaa');
    });

  });


  describe(`Custom select control value accessor`, () => {

    it(`should forward a reference to this component`, () => {
      expect(CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsSelectComponent);
    });

  });

});
