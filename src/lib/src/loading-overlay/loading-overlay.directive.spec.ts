import {
  Component,
  Injectable,
} from '@angular/core';
import {
  TestBed,
  async,
} from '@angular/core/testing';

import {
  createTestComponent,
  TestHostComponent,
} from './../utilities/testing/createTestComponent';
import { queryFor } from './../utilities/testing/queryFor';

import { TsLoadingOverlayModule } from './loading-overlay.module';
import { TsWindowService } from './../services/window/window.service';
import { TsWindowServiceMock } from './../services/window/window.service.mock';

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
    }
  }));


  describe(`tsLoadingOverlay`, () => {

    beforeEach(() => {
      this.create();
    });


    it(`should exist`, () => {
      const fixture = createTestComponent(templateString);

      expect(fixture).toBeDefined();
    });

  });


  describe(`@HostBinding`, () => {

    describe(`if position is static`, () => {

      beforeEach(() => {
        this.create(TsWindowServiceMockStatic);
      });


      it(`should set the position to relative`, () => {
        const fixture = createTestComponent(templateString);
        fixture.detectChanges();
        const element = queryFor(fixture, '[tsLoadingOverlay]').nativeElement;
        const position = element.style['position'];

        expect(position).toEqual('relative');
      });

    });


    describe(`if position is unset`, () => {

      beforeEach(() => {
        this.create(TsWindowServiceMockUnset);
      });


      it(`should set the position to relative`, () => {
        const fixture = createTestComponent(templateString);
        fixture.detectChanges();
        const element = queryFor(fixture, '[tsLoadingOverlay]').nativeElement;
        const position = element.style['position'];

        expect(position).toEqual('relative');
      });

    });


    describe(`if position is relative`, () => {

      beforeEach(() => {
        this.create(TsWindowServiceMockRelative);
      });


      it(`should not change the position`, () => {
        const fixture = createTestComponent(templateString);
        fixture.detectChanges();
        const element = queryFor(fixture, '[tsLoadingOverlay]').nativeElement;
        const position = element.style['position'];

        expect(position).toEqual('relative');
      });

    });


    describe(`if position is absolute`, () => {

      beforeEach(() => {
        this.create(TsWindowServiceMockAbsolute);
      });


      it(`should not change the position`, () => {
        const fixture = createTestComponent(templateString);
        fixture.detectChanges();
        const element = queryFor(fixture, '[tsLoadingOverlay]').nativeElement;
        const position = element.style['position'];

        expect(position).toEqual('absolute');
      });

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
        getPropertyValue: jasmine.createSpy('getPropertyValue').and.returnValue('static');
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
        getPropertyValue: jasmine.createSpy('getPropertyValue').and.returnValue('');
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
        getPropertyValue: jasmine.createSpy('getPropertyValue').and.returnValue('absolute');
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
        getPropertyValue: jasmine.createSpy('getPropertyValue').and.returnValue('relative');
      }),
    };
  }
}
