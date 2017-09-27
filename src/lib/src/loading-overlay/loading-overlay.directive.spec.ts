import { Injectable } from '@angular/core';
import {
  TestBed,
  async,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  createTestComponent,
  TestHostComponent,
} from './../utilities/testing/createTestComponent';
import { queryFor } from './../utilities/testing/queryFor';

import { TsLoadingOverlayModule } from './loading-overlay.module';
import { TsLoadingOverlayDirective } from './loading-overlay.directive';
import { TsWindowService } from './../services/window/window.service';
import { TsWindowServiceMock } from './../services/window/window.service.mock';
import { DebugElement } from '@angular/core/src/debug/debug_node';

const templateString = `<div tsLoadingOverlay="true"></div>`;


describe(`TsLoadingOverlayDirective`, () => {

  beforeEach(async(() => {
    this.create = function(windowServiceMock = TsWindowServiceMock) {
      TestBed.configureTestingModule({
        imports: [
          TsLoadingOverlayModule,
        ],
        providers: [
          {
            provide: TsWindowService,
            useClass: windowServiceMock,
          },
        ],
        declarations: [
          TestHostComponent,
        ],
      })

      this.fixture = createTestComponent(templateString);
      const inputElement: DebugElement =
        this.fixture.debugElement.query(By.directive(TsLoadingOverlayDirective));
      this.directive = inputElement.injector.get(TsLoadingOverlayDirective);
      this.fixture.detectChanges();
    }

  }));


  describe(`tsLoadingOverlay`, () => {

    beforeEach(() => {
      this.create();
    });


    it(`should exist`, () => {
      expect(this.fixture).toBeDefined();
    });

  });


  describe(`@HostBinding`, () => {

    describe(`if position is static`, () => {

      beforeEach(() => {
        this.create(TsWindowServiceMockStatic);
      });


      it(`should set the position to relative`, () => {
        const element = queryFor(this.fixture, '[tsLoadingOverlay]').nativeElement;
        const position = element.style['position'];

        expect(position).toEqual('relative');
      });

    });


    describe(`if position is unset`, () => {

      beforeEach(() => {
        this.create(TsWindowServiceMockUnset);
      });


      it(`should set the position to relative`, () => {
        const element = queryFor(this.fixture, '[tsLoadingOverlay]').nativeElement;
        const position = element.style['position'];

        expect(position).toEqual('relative');
      });

    });


    describe(`if position is relative`, () => {

      beforeEach(() => {
        this.create(TsWindowServiceMockRelative);
      });


      it(`should not change the position`, () => {
        const element = queryFor(this.fixture, '[tsLoadingOverlay]').nativeElement;
        const position = element.style['position'];

        expect(position).toEqual('relative');
      });

    });


    describe(`if position is absolute`, () => {

      beforeEach(() => {
        this.create(TsWindowServiceMockAbsolute);
      });


      it(`should not change the position`, () => {
        const element = queryFor(this.fixture, '[tsLoadingOverlay]').nativeElement;
        const position = element.style['position'];

        expect(position).toEqual('absolute');
      });

    });

  });


  describe(`tsLoadingOverlay()`, () => {

    beforeEach(() => {
      this.create();

      this.directive.bodyPortalHost.attach = jasmine.createSpy('attach');
      this.directive.bodyPortalHost.detach = jasmine.createSpy('detach');
    });

    it(`should attach to the host when TRUE`, () => {
      this.directive.tsLoadingOverlay = true;

      expect(this.directive.bodyPortalHost.attach).toHaveBeenCalled();
    });


    it(`should detach from the host when FALSE`, () => {
      this.directive.tsLoadingOverlay = false;

      expect(this.directive.bodyPortalHost.detach).toHaveBeenCalled();
    });

  });


  describe(`ngOnDestroy()`, () => {

    beforeEach(() => {
      this.create();

      this.directive.bodyPortalHost.dispose = jasmine.createSpy('dispose');
    });


    it(`should dispose the bodyPortalHost if it exists`, () => {
      this.directive.ngOnDestroy();

      expect(this.directive.bodyPortalHost.dispose).toHaveBeenCalled();
    });

  });

});




//
// Helper window mocks
//


/*
 * STATIC
 */
@Injectable()
export class TsWindowServiceMockStatic {
  get nativeWindow(): any {
    return {
      getComputedStyle: jasmine.createSpy('getComputedStyle').and.returnValue({
        getPropertyValue: jasmine.createSpy('getPropertyValue').and.returnValue('static'),
      }),
    };
  }
}

/*
 * UNSET
 */
@Injectable()
export class TsWindowServiceMockUnset {
  get nativeWindow(): any {
    return {
      getComputedStyle: jasmine.createSpy('getComputedStyle').and.returnValue({
        getPropertyValue: jasmine.createSpy('getPropertyValue').and.returnValue(''),
      }),
    };
  }
}

/*
 * ABSOLUTE
 */
@Injectable()
export class TsWindowServiceMockAbsolute {
  get nativeWindow(): any {
    return {
      getComputedStyle: jasmine.createSpy('getComputedStyle').and.returnValue({
        getPropertyValue: jasmine.createSpy('getPropertyValue').and.returnValue('absolute'),
      }),
    };
  }
}

/*
 * RELATIVE
 */
@Injectable()
export class TsWindowServiceMockRelative {
  get nativeWindow(): any {
    return {
      getComputedStyle: jasmine.createSpy('getComputedStyle').and.returnValue({
        getPropertyValue: jasmine.createSpy('getPropertyValue').and.returnValue('relative'),
      }),
    };
  }
}
