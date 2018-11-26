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

  describe(`tooltipPosition`, () => {

    test(`should set below if no position is declared`, () => {
      expect(component.tooltipPosition).toEqual('below');

    });

    test(`should set correct position`, () => {
      component.tooltipPosition = 'above';
      expect(component.tooltipPosition).toEqual('above');

    });

    test(`should log a warning if 'left' or 'right' are selected`, () => {
      window.console.warn = jest.fn();
      component.tooltipPosition = 'left';

      expect(window.console.warn).toHaveBeenCalled();
      expect(component.tooltipPosition).toEqual('left');
    });

  });

});
