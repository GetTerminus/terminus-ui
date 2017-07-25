import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  async,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TsDateRangeComponent } from './date-range.component';

@Component({
  template: `
    <div>
      <ts-date-range>
      </ts-date-range>
    </div>
  `,
})
class TestHostComponent {
  @ViewChild(TsDateRangeComponent)
  public dateRange: TsDateRangeComponent;
}

describe(`TsDateRangeComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        TsDateRangeComponent,
        TestHostComponent,
      ],
    })
      .overrideComponent(TsDateRangeComponent, {
        set: {
          template: '',
          templateUrl: null,
        }
      })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.hostComponent = this.fixture.componentInstance;
        this.component = this.hostComponent.dateRange;
      });
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });

});
