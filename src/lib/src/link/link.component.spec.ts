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

import { TsLinkComponent } from './link.component';

@Component({
  template: `
    <div>
      <ts-link>
      </ts-link>
    </div>
  `,
})
class TestHostComponent {
  @ViewChild(TsLinkComponent)
  public link: TsLinkComponent;
}

describe(`TsLinkComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        TsLinkComponent,
        TestHostComponent,
      ],
    })
      .overrideComponent(TsLinkComponent, {
        set: {
          template: '',
          templateUrl: null,
        }
      })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.hostComponent = this.fixture.componentInstance;
        this.component = this.hostComponent.link;
      });
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });

});
