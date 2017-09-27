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

      it(`should call _collapseWithDelay if a delay is set and the value is FALSE`, () => {
        this.component._collapseWithDelay = jasmine.createSpy('_collapseWithDelay');
        this.component.collapseDelay = this.component._COLLAPSE_DEFAULT_DELAY;
        this.component.collapsed = false;

        expect(this.component._collapseWithDelay).toHaveBeenCalled();
        expect(this.component.isCollapsed).toEqual(false);
      });


      it(`should not call _collapseWithDelay if no delay is set and the value is FALSE`, () => {
        this.component._collapseWithDelay = jasmine.createSpy('_collapseWithDelay');
        this.component.collapsed = false;

        expect(this.component._collapseWithDelay).not.toHaveBeenCalled();
      });


      it(`should not call _collapseWithDelay if delay is set and the value is TRUE`, () => {
        this.component._collapseWithDelay = jasmine.createSpy('_collapseWithDelay');
        this.component.collapseDelay = this.component._COLLAPSE_DEFAULT_DELAY;
        this.component.collapsed = true;

        expect(this.component._collapseWithDelay).not.toHaveBeenCalled();
      });

    });


    describe(`when format !== collapsable`, () => {

      it(`should not call _collapseWithDelay if the type is not collapsable`, () => {
        this.component._collapseWithDelay = jasmine.createSpy('_collapseWithDelay');
        this.component.format = 'filled';
        this.component.collapsed = false;

        expect(this.component._collapseWithDelay).not.toHaveBeenCalled();
      });

    });


    describe(`set format`, () => {

      describe('when format === collapsable', () => {

        it(`should set the collapseDelay`, () => {
          this.component.format = 'collapsable';

          expect(this.component.collapseDelay).not.toBeUndefined(1);
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

      it(`should call _collapseWithDelay if collapseDelay is set`, () => {
        this.component._collapseWithDelay = jasmine.createSpy('_collapseWithDelay');
        this.component.format = 'collapsable';
        this.component.iconName = 'home';
        this.component.collapseDelay = 500;
        this.component.ngOnInit();

        expect(this.component._collapseWithDelay).toHaveBeenCalled();
      });


      describe(`when format === collapsable`, () => {

        beforeEach(() => {
          this.component.definedFormat = 'collapsable';
          this.component._collapseWithDelay = jasmine.createSpy('_collapseWithDelay');
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


    describe(`_collapseWithDelay()`, () => {

      it(`should set isCollapsed and trigger change detection after the delay`, (done) => {
        const DELAY = 100;
        this.component._collapseWithDelay(DELAY);

        setTimeout(() => {
          expect(this.component.changeDetectorRef.detectChanges).toHaveBeenCalled();
          expect(this.component.isCollapsed).toEqual(true);
          done();
        }, DELAY + 1);
      });

    });

  });

});
