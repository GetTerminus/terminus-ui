import { TsCardComponent } from './card.component';


describe('TsCardComponent', () => {

  beforeEach(() => {
    this.component = new TsCardComponent();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`set aspectRatio()`, () => {

    it(`should convert the string aspect to a percentage`, () => {
      this.component.aspectRatio = '16:9';
      expect(this.component.aspectRatioPadding).toEqual('56.25%');

      this.component.aspectRatio = '3:4';
      expect(this.component.aspectRatioPadding).toEqual('133.33%');
    });

  });

});
