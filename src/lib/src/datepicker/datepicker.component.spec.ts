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
      <ts-datepicker
        [(ngModel)]="myModel"
      ></ts-datepicker>
    </div>
  `,
})
class TestHostComponent {
  @ViewChild(TsDatepickerComponent)
  public datepicker: TsDatepickerComponent;

  myModel: any = 'foo';
}

fdescribe(`TsDatepickerComponent`, () => {

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


  describe(`resetValue()`, () => {

    it(`should reset the input value`, () => {
      this.fixture.detectChanges();
      expect(this.component.value).toEqual('foo');

      this.component.reset();

      expect(this.component.value).toEqual(null);
    });

  });
});
