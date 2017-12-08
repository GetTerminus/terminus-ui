import {
  Component,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  async,
} from '@angular/core/testing';

import { ChangeDetectorRefMock } from './../utilities/testing/mocks/changeDetectorRef.mock';
import { TsButtonComponent } from './button.component';


describe(`ButtonComponent`, () => {

  beforeEach(() => {
    this.component = new TsButtonComponent(new ChangeDetectorRefMock());
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`set collapsed`, () => {

    describe(`when format === collapsable`, () => {

      it(`should call collapseWithDelay if a delay is set and the value is FALSE`, () => {
        this.component.collapseWithDelay = jasmine.createSpy('collapseWithDelay');
        this.component.collapseDelay = this.component.COLLAPSE_DEFAULT_DELAY;
        this.component.collapsed = false;

        expect(this.component.collapseWithDelay).toHaveBeenCalled();
        expect(this.component.isCollapsed).toEqual(false);
      });


      it(`should not call collapseWithDelay if no delay is set and the value is FALSE`, () => {
        this.component.collapseWithDelay = jasmine.createSpy('collapseWithDelay');
        this.component.collapsed = false;

        expect(this.component.collapseWithDelay).not.toHaveBeenCalled();
      });


      it(`should not call collapseWithDelay if delay is set and the value is TRUE`, () => {
        this.component.collapseWithDelay = jasmine.createSpy('collapseWithDelay');
        this.component.collapseDelay = this.component.COLLAPSE_DEFAULT_DELAY;
        this.component.collapsed = true;

        expect(this.component.collapseWithDelay).not.toHaveBeenCalled();
      });

    });


    describe(`when format !== collapsable`, () => {

      it(`should not call collapseWithDelay if the type is not collapsable`, () => {
        this.component.collapseWithDelay = jasmine.createSpy('collapseWithDelay');
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

    });


    describe(`ngOnInit()`, () => {

      it(`should call collapseWithDelay if collapseDelay is set`, () => {
        this.component.collapseWithDelay = jasmine.createSpy('collapseWithDelay');
        this.component.collapseDelay = 500;
        this.component.ngOnInit();

        expect(this.component.collapseWithDelay).toHaveBeenCalled();
      });


      it(`should call not collapseWithDelay if collapseDelay is not set`, () => {
        this.component.collapseWithDelay = jasmine.createSpy('collapseWithDelay');
        this.component.collapseDelay = undefined;
        this.component.ngOnInit();

        expect(this.component.collapseWithDelay).not.toHaveBeenCalled();
      });


      describe(`when format === collapsable`, () => {

        beforeEach(() => {
          this.component.definedFormat = 'collapsable';
          this.component.collapseWithDelay = jasmine.createSpy('collapseWithDelay');
          this.component.collapseDelay = 500;
        });


        it(`should throw an error if the format is collapsable and no icon is set`, () => {
          expect(() => {this.component.ngOnInit()}).toThrow();
        });


        it(`should not throw an error if the format is collapsable and there is an icon set`, () => {
          this.component.iconName = 'home';

          expect(() => {this.component.ngOnInit()}).not.toThrow();
        });
      });

    });


    describe(`ngOnDestroy()`, () => {

      beforeEach(() => {
        window.clearTimeout = jasmine.createSpy('clearTimeout');
        this.component.definedFormat = 'collapsable';
      });


      it(`should clear any existing timeouts`, () => {
        this.component.collapseWithDelay(this.component.collapseDelay);
        this.component.ngOnDestroy();

        expect(window.clearTimeout).toHaveBeenCalledWith(this.component.timeout);
      });

    });


    describe(`collapseWithDelay()`, () => {

      it(`should set isCollapsed and trigger change detection after the delay`, (done) => {
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
