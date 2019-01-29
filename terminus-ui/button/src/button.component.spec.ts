import { ElementRef } from '@angular/core';
import {
  ChangeDetectorRefMock,
  createMouseEvent,
  Renderer2Mock,
  TsWindowServiceMock,
} from '@terminus/ngx-tools/testing';

import { TsButtonComponent } from './button.component';


describe(`TsButtonComponent`, function() {
  let component: TsButtonComponent;

  beforeEach(() => {
    component = new TsButtonComponent(
      new ChangeDetectorRefMock(),
      new TsWindowServiceMock(),
      new Renderer2Mock(),
    );
    component['changeDetectorRef'].detectChanges = jest.fn();
    component.button = {
      _elementRef: new ElementRef({}),
    } as any;
    component['renderer'].addClass = jest.fn();
    component['renderer'].removeClass = jest.fn();
  });


  it(`should exist`, () => {
    expect(component).toBeTruthy();
  });

  describe(`showProgress`, () => {
    test(`should set and retrieve`, () => {
      component.showProgress = true;
      expect(component.showProgress).toEqual(true);
    });
  });

  describe(`set collapsed`, () => {

    describe(`when format === collapsable`, () => {

      it(`should call collapseWithDelay if a delay is set and the value is FALSE`, () => {
        component['collapseWithDelay'] = jest.fn();
        component.collapseDelay = component['COLLAPSE_DEFAULT_DELAY'];
        component.collapsed = false;

        expect(component['collapseWithDelay']).toHaveBeenCalled();
        expect(component.isCollapsed).toEqual(false);
      });


      it(`should not call collapseWithDelay if no delay is set and the value is FALSE`, () => {
        component['collapseWithDelay'] = jest.fn();
        component.collapsed = false;

        expect(component['collapseWithDelay']).not.toHaveBeenCalled();
      });


      it(`should not call collapseWithDelay if delay is set and the value is TRUE`, () => {
        component['collapseWithDelay'] = jest.fn();
        component.collapseDelay = component['COLLAPSE_DEFAULT_DELAY'];
        component.collapsed = true;

        expect(component['collapseWithDelay']).not.toHaveBeenCalled();
      });

    });


    describe(`when format !== collapsable`, () => {

      it(`should not call collapseWithDelay if the type is not collapsable`, () => {
        component['collapseWithDelay'] = jest.fn();
        component.format = 'filled';
        component.collapsed = false;

        expect(component['collapseWithDelay']).not.toHaveBeenCalled();
      });

    });


    describe(`set format`, () => {

      describe('when format === collapsable', () => {

        it(`should set the collapseDelay to default if unset`, () => {
          component.format = 'collapsable';

          expect(component.collapseDelay).toEqual(component['COLLAPSE_DEFAULT_DELAY']);
        });


        it(`should not set the collapseDelay to default if a value is passed in`, () => {
          component.collapseDelay = 1000;
          component.format = 'collapsable';

          expect(component.collapseDelay).toEqual(1000);
        });

      });


      describe('when format === collapsable', () => {

        it(`should remove any existing collapseDelay`, () => {
          component.collapseDelay = 500;
          component.format = 'filled';

          expect(component.collapseDelay).toBeUndefined();
        });

      });


      test(`should not update classes if no value is passed in`, () => {
        component['updateClasses'] = jest.fn();
        component.format = null as any;

        expect(component['updateClasses']).not.toHaveBeenCalled();
      });


      test(`should log a warning if an invalid value was passed in`, () => {
        window.console.warn = jest.fn();
        component['updateClasses'] = jest.fn();
        component.format = 'foo' as any;

        expect(window.console.warn).toHaveBeenCalled();
        expect(component['updateClasses']).not.toHaveBeenCalled();
      });

    });


    describe(`set theme`, () => {

      test(`should not update classes if no value is passed in`, () => {
        component['updateClasses'] = jest.fn();
        component.theme = null as any;

        expect(component['updateClasses']).not.toHaveBeenCalled();
      });


      test(`should log a warning if an invalid value was passed in`, () => {
        window.console.warn = jest.fn();
        component['updateClasses'] = jest.fn();
        component.theme = 'foo' as any;

        expect(window.console.warn).toHaveBeenCalled();
        expect(component['updateClasses']).not.toHaveBeenCalled();
      });

    });


    describe(`ngOnInit()`, () => {

      it(`should call collapseWithDelay if collapseDelay is set`, () => {
        component['collapseWithDelay'] = jest.fn();
        component.collapseDelay = 500;
        component.ngOnInit();

        expect(component['collapseWithDelay']).toHaveBeenCalled();
      });


      it(`should call not collapseWithDelay if collapseDelay is not set`, () => {
        component['collapseWithDelay'] = jest.fn();
        component.collapseDelay = undefined;
        component.ngOnInit();

        expect(component['collapseWithDelay']).not.toHaveBeenCalled();
      });


      describe(`when format === collapsable`, () => {

        beforeEach(() => {
          component.format = 'collapsable';
          component['collapseWithDelay'] = jest.fn();
          component.collapseDelay = 500;
        });


        it(`should throw an error if the format is collapsable and no icon is set`, () => {
          expect(() => {component.ngOnInit(); }).toThrow();
        });


        it(`should not throw an error if the format is collapsable and there is an icon set`, () => {
          component.iconName = 'home';

          expect(() => {component.ngOnInit(); }).not.toThrow();
        });
      });

    });


    describe(`ngOnDestroy()`, () => {

      beforeEach(() => {
        component.format = 'collapsable';
        component.iconName = 'home';
        component['changeDetectorRef'].detectChanges();
        component['windowService'].nativeWindow.clearTimeout = jest.fn();
        component['windowService'].nativeWindow.setTimeout = jest.fn().mockReturnValue(123);
      });


      it(`should clear any existing timeouts`, () => {
        component.ngOnInit();
        expect(component['collapseTimeoutId']).toEqual(123);

        component.ngOnDestroy();
        expect(component['windowService'].nativeWindow.clearTimeout).toHaveBeenCalledWith(123);
      });

    });


    describe(`clicked()`, () => {
      let mouseEvent: MouseEvent;

      beforeEach(() => {
        component.clickEvent.emit = jest.fn();
        mouseEvent = createMouseEvent('click');
      });


      test(`should emit the click when interceptClick is false`, () => {
        component.clicked(mouseEvent);

        expect(component.clickEvent.emit).toHaveBeenCalledWith(mouseEvent);
      });


      test(`should not emit the click when interceptClick is true`, () => {
        component.interceptClick = true;
        component.clicked(mouseEvent);

        expect(component.clickEvent.emit).not.toHaveBeenCalledWith();
        expect(component.originalClickEvent).toEqual(mouseEvent);
      });

    });


    describe(`collapseWithDelay()`, () => {

      test(`should set isCollapsed and trigger change detection after the delay`, () => {
        jest.useFakeTimers();
        component['windowService'].nativeWindow.setTimeout = window.setTimeout;
        const DELAY = 100;
        component['collapseWithDelay'](DELAY);
        jest.advanceTimersByTime(2000);

        expect(component['changeDetectorRef'].detectChanges).toHaveBeenCalled();
        expect(component.isCollapsed).toEqual(true);
        jest.runAllTimers();
      });

    });

  });

});
