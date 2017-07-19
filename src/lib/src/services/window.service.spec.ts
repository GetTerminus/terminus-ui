import { WindowService } from './window.service';


describe(`WindowService`, () => {

  it(`should return the window object`, () => {
    const service = new WindowService();

    expect(service.nativeWindow.innerWidth).toBeTruthy();
  });

});
