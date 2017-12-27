import { TsWindowService } from '@services/window/window.service';


describe(`TsWindowService`, () => {

  it(`should return the window object`, () => {
    const service = new TsWindowService();

    expect(service.nativeWindow.innerWidth).toBeTruthy();
  });

});
