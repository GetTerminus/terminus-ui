import { TsWindowServiceMock } from '@terminus/ngx-tools/browser/testing';
import { ElementRefMock } from '@terminus/ngx-tools/testing';

import { TsLoadingOverlayDirective } from './loading-overlay.directive';

describe(`TsLoadingOverlayDirective`, function() {
  let directive: TsLoadingOverlayDirective;
  const componentFactoryResolver: any = null;
  const applicationRef: any = null;
  const injector: any = null;

  beforeEach(() => {
    directive = new TsLoadingOverlayDirective(
      new ElementRefMock(),
      new TsWindowServiceMock(),
      componentFactoryResolver,
      applicationRef,
      injector,
    );
  });

  describe(`tsLoadingOverlay`, () => {
    test(`should exist`, () => {
      expect(directive).toBeDefined();
      expect(directive['bodyPortalHost']).toBeDefined();
      expect(directive['loadingOverlayPortal']).toBeDefined();
    });
  });

  describe(`set tsLoadingOverlay()`, () => {
    beforeEach(() => {
      directive['bodyPortalHost'].attach = jest.fn();
      directive['bodyPortalHost'].detach = jest.fn();
    });

    test(`should attach to the host when TRUE`, () => {
      directive.tsLoadingOverlay = true;

      expect(directive['bodyPortalHost'].attach).toHaveBeenCalled();
      expect(directive['bodyPortalHost'].detach).not.toHaveBeenCalled();
    });

    test(`should detach from the host when FALSE`, () => {
      directive.tsLoadingOverlay = false;

      expect(directive['bodyPortalHost'].detach).toHaveBeenCalled();
      expect(directive['bodyPortalHost'].attach).not.toHaveBeenCalled();
    });
  });

  describe(`ngOnInit()`, () => {
    test(`should get the current position and pass to determinePosition()`, () => {
      directive['determinePosition'] = jest.fn();
      directive.ngOnInit();

      expect(directive['determinePosition']).toHaveBeenCalledWith('static');
    });
  });

  describe(`ngOnDestroy()`, () => {
    beforeEach(() => {
      directive['bodyPortalHost'].dispose = jest.fn();
    });

    test(`should dispose the bodyPortalHost if it exists`, () => {
      directive.ngOnDestroy();

      expect(directive['bodyPortalHost'].dispose).toHaveBeenCalled();
    });

    test(`should not throw an error if the bodyPortalHost doesn't exist`, () => {
      directive['bodyPortalHost'] = undefined as any;
      directive.ngOnDestroy();

      expect(() => {
        directive.ngOnDestroy();
      }).not.toThrow();
    });
  });

  describe(`determinePosition()`, () => {
    test(`should return the existing position if it is relative|absolute`, () => {
      expect(directive['determinePosition']('relative')).toEqual('relative');
      expect(directive['determinePosition']('absolute')).toEqual('absolute');
    });

    test(`should return relative if the position is anything other than relative|absolute`, () => {
      expect(directive['determinePosition']('fixed')).toEqual('relative');
      expect(directive['determinePosition']('static')).toEqual('relative');
    });
  });
});
