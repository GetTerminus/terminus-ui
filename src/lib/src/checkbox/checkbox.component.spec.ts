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

import { TsCheckboxComponent } from './checkbox.component';

@Component({
  template: `
    <div>
      <ts-checkbox>
        My checkbox!
      </ts-checkbox>
    </div>
  `,
})
class TestHostComponent {
  @ViewChild(TsCheckboxComponent)
  public checkbox: TsCheckboxComponent;
}

describe(`TsCheckboxComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        TsCheckboxComponent,
        TestHostComponent,
      ],
    })
      .overrideComponent(TsCheckboxComponent, {
        set: {
          template: '',
          templateUrl: null,
        }
      })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.hostComponent = this.fixture.componentInstance;
        this.component = this.hostComponent.checkbox;
      });
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });

});
