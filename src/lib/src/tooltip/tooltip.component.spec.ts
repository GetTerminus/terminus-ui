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

import { TsTooltipComponent } from './tooltip.component';

@Component({
  template: `
    <div>
      <ts-tooltip>
      </ts-tooltip>
    </div>
  `,
})
class TestHostComponent {
  @ViewChild(TsTooltipComponent)
  public tooltip: TsTooltipComponent;
}

describe(`TsTooltipComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        TsTooltipComponent,
        TestHostComponent,
      ],
    })
      .overrideComponent(TsTooltipComponent, {
        set: {
          template: '',
          templateUrl: null,
        }
      })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.hostComponent = this.fixture.componentInstance;
        this.component = this.hostComponent.tooltip;
      });
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });

});
