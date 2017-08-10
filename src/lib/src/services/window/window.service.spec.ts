import { TsWindowService } from './window.service';


describe(`TsWindowService`, () => {

  it(`should return the window object`, () => {
    const service = new TsWindowService();

    expect(service.nativeWindow.innerWidth).toBeTruthy();
  });

});
