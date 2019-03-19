import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { MatRippleModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  TsTabBodyComponent,
  TsTabBodyHostDirective,
  TsTabsModule,
} from '@terminus/ui/tabs';
import * as testComponents from '@terminus/ui/tabs/testing';




describe(`TsTabBodyComponent`, function() {
  let fixture: ComponentFixture<testComponents.TabBody>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        PortalModule,
        MatRippleModule,
        NoopAnimationsModule,
        TsTabsModule,
      ],
      declarations: [
        testComponents.TabBody,
      ],
    });

    TestBed.compileComponents();
  }));


  describe(`when initialized as center`, () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(testComponents.TabBody);
    });


    test(`should be center position if origin is unchanged`, () => {
      fixture.detectChanges();
      fixture.componentInstance.position = 0;
      fixture.detectChanges();

      expect(fixture.componentInstance.tabBody.positionState).toEqual('center');
    });


    test(`should be center position if origin is explicitly set to null`, () => {
      fixture.componentInstance.position = 0;

      // It can happen that the `origin` is explicitly set to null through the Angular input binding. This test should ensure that the body
      // does properly such origin value. The `TsTabComponent` class sets the origin by default to null.
      // See related issue: https://github.com/angular/material2/issues/12455
      fixture.componentInstance.origin = null;
      fixture.detectChanges();

      expect(fixture.componentInstance.tabBody.positionState).toEqual('center');
    });


    test(`should be left-origin-center position with negative or zero origin`, () => {
      fixture.componentInstance.position = 0;
      fixture.componentInstance.origin = 0;
      fixture.detectChanges();

      expect(fixture.componentInstance.tabBody.positionState).toEqual('left-origin-center');
    });


    test(`should be right-origin-center position with positive nonzero origin`, () => {
      fixture.componentInstance.position = 0;
      fixture.componentInstance.origin = 1;
      fixture.detectChanges();

      expect(fixture.componentInstance.tabBody.positionState).toEqual('right-origin-center');
    });


    test(`should be left position with negative position`, () => {
      fixture.detectChanges();
      fixture.componentInstance.position = -1;
      fixture.detectChanges();

      expect(fixture.componentInstance.tabBody.positionState).toEqual('left');
    });


    test(`should be center position with zero position`, () => {
      fixture.detectChanges();
      fixture.componentInstance.position = 0;
      fixture.detectChanges();

      expect(fixture.componentInstance.tabBody.positionState).toEqual('center');
    });


    test(`should be left position with positive position`, () => {
      fixture.detectChanges();
      fixture.componentInstance.position = 1;
      fixture.detectChanges();

      expect(fixture.componentInstance.tabBody.positionState).toEqual('right');
    });

  });



});
