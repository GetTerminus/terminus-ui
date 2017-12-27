import {
  createTestComponent,
  TestHostComponent,
} from '@testing/createTestComponent';
import { ElementRefMock } from '@testing/mocks/elementRef.mock';
import { TsWindowServiceMock } from '@services/window/window.service.mock';
import { TsLoadingOverlayDirective } from '@loading-overlay/loading-overlay.directive';

const componentFactoryResolver: any = null;
const applicationRef: any = null;
const injector: any = null;


describe(`TsLoadingOverlayDirective`, () => {

  beforeEach(() => {
    this.directive = new TsLoadingOverlayDirective(
      new ElementRefMock(),
      new TsWindowServiceMock(),
      componentFactoryResolver,
      applicationRef,
      injector,
    );
  });


  describe(`tsLoadingOverlay`, () => {

    it(`should exist`, () => {
      expect(this.directive).toBeDefined();
      expect(this.directive.bodyPortalHost).toBeDefined();
      expect(this.directive.loadingOverlayPortal).toBeDefined();
    });

  });


  describe(`set tsLoadingOverlay()`, () => {

    beforeEach(() => {
      this.directive.bodyPortalHost.attach = jasmine.createSpy('attach');
      this.directive.bodyPortalHost.detach = jasmine.createSpy('detach');
    });

    it(`should attach to the host when TRUE`, () => {
      this.directive.tsLoadingOverlay = true;

      expect(this.directive.bodyPortalHost.attach).toHaveBeenCalled();
      expect(this.directive.bodyPortalHost.detach).not.toHaveBeenCalled();
    });


    it(`should detach from the host when FALSE`, () => {
      this.directive.tsLoadingOverlay = false;

      expect(this.directive.bodyPortalHost.detach).toHaveBeenCalled();
      expect(this.directive.bodyPortalHost.attach).not.toHaveBeenCalled();
    });

  });


  describe(`ngOnInit()`, () => {

    it(`should get the current position and pass to determinePosition()`, () => {
      this.directive.determinePosition = jasmine.createSpy('determinePosition');
      this.directive.ngOnInit();

      expect(this.directive.determinePosition).toHaveBeenCalledWith('static');
    });

  });


  describe(`ngOnDestroy()`, () => {

    beforeEach(() => {
      this.directive.bodyPortalHost.dispose = jasmine.createSpy('dispose');
    });


    it(`should dispose the bodyPortalHost if it exists`, () => {
      this.directive.ngOnDestroy();

      expect(this.directive.bodyPortalHost.dispose).toHaveBeenCalled();
    });


    it(`should not throw an error if the bodyPortalHost doesn't exist`, () => {
      this.directive.bodyPortalHost = undefined;
      this.directive.ngOnDestroy();

      expect(() => {this.directive.ngOnDestroy()}).not.toThrow();
    });

  });


  describe(`determinePosition()`, () => {

    it(`should return the existing position if it is relative|absolute`, () => {
      expect(this.directive.determinePosition('relative')).toEqual('relative');
      expect(this.directive.determinePosition('absolute')).toEqual('absolute');
    });


    it(`should return relative if the position is anything other than relative|absolute`, () => {
      expect(this.directive.determinePosition('fixed')).toEqual('relative');
      expect(this.directive.determinePosition('static')).toEqual('relative');
    });

  });

});
