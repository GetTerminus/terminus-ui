import { TsTooltipComponent } from './tooltip.component';


describe(`TsTooltipComponent`, () => {
  let component: TsTooltipComponent;

  beforeEach(() => {
    component = new TsTooltipComponent();
  });


  it(`should exist`, () => {
    expect(component).toBeTruthy();
  });

  describe(`hasUnderline`, () => {
    test(`should set and retrieve`, () => {
      component.hasUnderline = true;
      expect(component.hasUnderline).toEqual(true);
    });
  });

});
