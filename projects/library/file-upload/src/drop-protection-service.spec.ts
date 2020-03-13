import { TsWindowService } from '@terminus/ngx-tools/browser';
import { createFakeEvent } from '@terminus/ngx-tools/testing';

import { TsDropProtectionService } from './drop-protection.service';

describe(`TsDropProtectionService`, function() {
  let service: TsDropProtectionService;
  let myWindow: Window;
  const eventDrop = createFakeEvent('drop');
  Object.defineProperty(eventDrop, 'preventDefault', { value: jest.fn() });
  const eventDrag = createFakeEvent('dragover');
  Object.defineProperty(eventDrag, 'preventDefault', { value: jest.fn() });

  beforeEach(() => {
    service = new TsDropProtectionService(new TsWindowService());
    myWindow = service['windowService'].nativeWindow;
  });

  describe(`add`, () => {
    test(`should add drop protection`, () => {
      service.add();
      myWindow.dispatchEvent(eventDrop);
      myWindow.dispatchEvent(eventDrag);

      expect(eventDrop.preventDefault).toHaveBeenCalled();
      expect(eventDrag.preventDefault).toHaveBeenCalled();
      expect(service['hasProtection']).toEqual(true);
    });

    test(`should do nothing if protection is already added`, () => {
      service.add();
      myWindow.addEventListener = jest.fn();

      expect(myWindow.addEventListener).not.toHaveBeenCalled();
    });
  });

  describe(`remove`, () => {
    test(`should remove drop protection`, () => {
      service.add();
      myWindow.dispatchEvent(eventDrag);
      expect(eventDrag.preventDefault).toHaveBeenCalledTimes(1);
      expect(service['hasProtection']).toEqual(true);

      service.remove();
      myWindow.dispatchEvent(eventDrag);
      expect(eventDrag.preventDefault).toHaveBeenCalledTimes(1);
      expect(service['hasProtection']).toEqual(false);
    });

    test(`should do nothing if it has already been removed`, () => {
      myWindow.removeEventListener = jest.fn();
      service.remove();

      expect(myWindow.removeEventListener).not.toHaveBeenCalled();
    });
  });
});
