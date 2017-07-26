import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TsDatepickerComponent } from './datepicker.component';

@Component({
  template: `
    <div>
      <ts-datepicker
        [initialDate]="myDate"
      ></ts-datepicker>
    </div>
  `,
})
class TestHostComponent {
  @ViewChild(TsDatepickerComponent)
  public datepicker: TsDatepickerComponent;

  myDate = new Date(Date.UTC(2017, 4, 1, 1, 1, 1));
}

describe(`TsDatepickerComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
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


  describe(`resetValue()`, () => {

    it(`should reset the input value`, fakeAsync(() => {
      this.fixture.detectChanges();
      const date = new Date(Date.UTC(2017, 4, 1, 1, 1, 1));
      tick();

      expect(this.component.value.toString()).toEqual('Sun Apr 30 2017 21:01:01 GMT-0400 (EDT)');

      this.component.resetValue();

      expect(this.component.value).toEqual(null);
    }));

  });
});
