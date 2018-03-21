import { TsWindowService } from './window.service';


describe(`TsWindowService`, () => {

  it(`should return the window object`, () => {
    window.console.warn = jest.fn();
    const service = new TsWindowService();

    expect(service.nativeWindow.innerWidth).toBeTruthy();
    expect(window.console.warn).toHaveBeenCalled();
  });

});
