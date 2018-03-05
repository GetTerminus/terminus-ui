import { TsLinkComponent } from './link.component';


describe(`TsLinkComponent`, () => {

  beforeEach(() => {
    this.component = new TsLinkComponent();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  it(`should log a warning if the color parameter is set`, () => {
    window.console.warn = jest.fn();
    this.component.color = 'primary';

    expect(window.console.warn).toHaveBeenCalled();
  });

});
