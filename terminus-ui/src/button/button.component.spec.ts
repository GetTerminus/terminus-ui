import { ElementRef } from '@angular/core';
import {
  TsWindowServiceMock,
  ChangeDetectorRefMock,
  Renderer2Mock,
} from '@terminus/ngx-tools/testing';

import { TsButtonComponent } from './button.component';


describe(`TsButtonComponent`, () => {

  beforeEach(() => {
    this.component = new TsButtonComponent(
      new ChangeDetectorRefMock(),
      new TsWindowServiceMock(),
      new Renderer2Mock(),
    );
    this.component.changeDetectorRef.detectChanges = jest.fn();
    this.component.button = {
      _elementRef: new ElementRef({}),
    };
    this.component.renderer.addClass = jest.fn();
    this.component.renderer.removeClass = jest.fn();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`set collapsed`, () => {

    describe(`when format === collapsable`, () => {

      it(`should call collapseWithDelay if a delay is set and the value is FALSE`, () => {
        this.component.collapseWithDelay = jest.fn();
        this.component.collapseDelay = this.component.COLLAPSE_DEFAULT_DELAY;
        this.component.collapsed = false;

        expect(this.component.collapseWithDelay).toHaveBeenCalled();
        expect(this.component.isCollapsed).toEqual(false);
      });


      it(`should not call collapseWithDelay if no delay is set and the value is FALSE`, () => {
        this.component.collapseWithDelay = jest.fn();
        this.component.collapsed = false;

        expect(this.component.collapseWithDelay).not.toHaveBeenCalled();
      });


      it(`should not call collapseWithDelay if delay is set and the value is TRUE`, () => {
        this.component.collapseWithDelay = jest.fn();
        this.component.collapseDelay = this.component.COLLAPSE_DEFAULT_DELAY;
        this.component.collapsed = true;

        expect(this.component.collapseWithDelay).not.toHaveBeenCalled();
      });

    });


    describe(`when format !== collapsable`, () => {

      it(`should not call collapseWithDelay if the type is not collapsable`, () => {
        this.component.collapseWithDelay = jest.fn();
        this.component.format = 'filled';
        this.component.collapsed = false;

        expect(this.component.collapseWithDelay).not.toHaveBeenCalled();
      });

    });


    describe(`set format`, () => {

      describe('when format === collapsable', () => {

        it(`should set the collapseDelay to default if unset`, () => {
          this.component.format = 'collapsable';

          expect(this.component.collapseDelay).toEqual(this.component.COLLAPSE_DEFAULT_DELAY);
        });


        it(`should not set the collapseDelay to default if a value is passed in`, () => {
          this.component.collapseDelay = 1000;
          this.component.format = 'collapsable';

          expect(this.component.collapseDelay).toEqual(1000);
        });

      });


      describe('when format === collapsable', () => {

        it(`should remove any existing collapseDelay`, () => {
          this.component.collapseDelay = 500;
          this.component.format = 'filled';

          expect(this.component.collapseDelay).toBeUndefined();
        });

      });


      test(`should not update classes if no value is passed in`, () => {
        this.component.updateClasses = jest.fn();
        this.component.format = null as any;

        expect(this.component.updateClasses).not.toHaveBeenCalled();
      });


      test(`should log a warning if an invalid value was passed in`, () => {
        window.console.warn = jest.fn();
        this.component.updateClasses = jest.fn();
        this.component.format = 'foo' as any;

        expect(window.console.warn).toHaveBeenCalled();
        expect(this.component.updateClasses).not.toHaveBeenCalled();
      });

    });


    describe(`set theme`, () => {

      test(`should not update classes if no value is passed in`, () => {
        this.component.updateClasses = jest.fn();
        this.component.theme = null as any;

        expect(this.component.updateClasses).not.toHaveBeenCalled();
      });


      test(`should log a warning if an invalid value was passed in`, () => {
        window.console.warn = jest.fn();
        this.component.updateClasses = jest.fn();
        this.component.theme = 'foo' as any;

        expect(window.console.warn).toHaveBeenCalled();
        expect(this.component.updateClasses).not.toHaveBeenCalled();
      });

    });


    describe(`ngOnInit()`, () => {

      it(`should call collapseWithDelay if collapseDelay is set`, () => {
        this.component.collapseWithDelay = jest.fn();
        this.component.collapseDelay = 500;
        this.component.ngOnInit();

        expect(this.component.collapseWithDelay).toHaveBeenCalled();
      });


      it(`should call not collapseWithDelay if collapseDelay is not set`, () => {
        this.component.collapseWithDelay = jest.fn();
        this.component.collapseDelay = undefined;
        this.component.ngOnInit();

        expect(this.component.collapseWithDelay).not.toHaveBeenCalled();
      });


      describe(`when format === collapsable`, () => {

        beforeEach(() => {
          this.component.format = 'collapsable';
          this.component.collapseWithDelay = jest.fn();
          this.component.collapseDelay = 500;
        });


        it(`should throw an error if the format is collapsable and no icon is set`, () => {
          expect(() => {this.component.ngOnInit(); }).toThrow();
        });


        it(`should not throw an error if the format is collapsable and there is an icon set`, () => {
          this.component.iconName = 'home';

          expect(() => {this.component.ngOnInit(); }).not.toThrow();
        });
      });

    });


    describe(`ngOnDestroy()`, () => {

      beforeEach(() => {
        this.component.format = 'collapsable';
        this.component.iconName = 'home';
        this.component.changeDetectorRef.detectChanges();
        this.component.windowService.nativeWindow.clearTimeout = jest.fn();
        this.component.windowService.nativeWindow.setTimeout = jest.fn().mockReturnValue(123);
      });


      it(`should clear any existing timeouts`, () => {
        this.component.ngOnInit();
        expect(this.component.collapseTimeoutId).toEqual(123);

        this.component.ngOnDestroy();
        expect(this.component.windowService.nativeWindow.clearTimeout).toHaveBeenCalledWith(123);
      });

    });


    describe(`collapseWithDelay()`, () => {

      it(`should set isCollapsed and trigger change detection after the delay`, (done) => {
        this.component.windowService.nativeWindow.setTimeout = window.setTimeout;
        const DELAY = 100;
        this.component.collapseWithDelay(DELAY);

        setTimeout(() => {
          expect(this.component.changeDetectorRef.detectChanges).toHaveBeenCalled();
          expect(this.component.isCollapsed).toEqual(true);
          done();
        }, DELAY + 1);
      });

    });

  });

});
