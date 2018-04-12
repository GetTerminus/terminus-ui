import { TsCardComponent } from './card.component';


describe('TsCardComponent', () => {
  let component: TsCardComponent;

  beforeEach(() => {
    component = new TsCardComponent();
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

});
