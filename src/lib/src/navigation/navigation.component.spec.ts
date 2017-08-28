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

import { TsNavigationComponent } from './navigation.component';

@Component({
  template: `
    <div>
      <ts-navigation>
      </ts-navigation>
    </div>
  `,
})
class TestHostComponent {
  @ViewChild(TsNavigationComponent)
  public navigation: TsNavigationComponent;
}

describe(`TsNavigationComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        TsNavigationComponent,
        TestHostComponent,
      ],
    })
      .overrideComponent(TsNavigationComponent, {
        set: {
          template: '',
          templateUrl: null,
        }
      })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.hostComponent = this.fixture.componentInstance;
        this.component = this.hostComponent.navigation;
      });
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });

});
