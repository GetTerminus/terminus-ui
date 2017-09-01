import {
  Component,
} from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  async,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TsLoadingOverlayDirective } from './loading-overlay.directive';


@Component({
  template: `
    <div [tsLoadingOverlay]>
      Foo
    </div>
  `,
})
class TestHostComponent {
}


describe(`TsLoadingOverlayDirective`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        TsLoadingOverlayDirective,
        TestHostComponent,
      ],
    })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.testComponent = this.fixture.componentInstance;
      });
  }));


  describe(`tsLoadingOverlay`, () => {

    it(`should ...`, () => {
      this.fixture.detectChanges();

      expect(true).toEqual(false);
    });

  });

});

