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

import { TsDatepickerComponent } from './datepicker.component';

@Component({
  template: `
    <div>
      <ts-datepicker>
      </ts-datepicker>
    </div>
  `,
})
class TestHostComponent {
  @ViewChild(TsDatepickerComponent)
  public datepicker: TsDatepickerComponent;
}

describe(`TsDatepickerComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        TsDatepickerComponent,
        TestHostComponent,
      ],
    })
      .overrideComponent(TsDatepickerComponent, {
        set: {
          template: '',
          templateUrl: null,
        }
      })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.hostComponent = this.fixture.componentInstance;
        this.component = this.hostComponent.datepicker;
      });
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });

});
