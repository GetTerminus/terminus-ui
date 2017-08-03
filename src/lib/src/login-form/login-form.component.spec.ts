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

import { TsLoginFormComponent } from './login-form.component';

@Component({
  template: `
    <div>
      <ts-login-form>
      </ts-login-form>
    </div>
  `,
})
class TestHostComponent {
  @ViewChild(TsLoginFormComponent)
  public loginForm: TsLoginFormComponent;
}

describe(`TsLoginFormComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        TsLoginFormComponent,
        TestHostComponent,
      ],
    })
      .overrideComponent(TsLoginFormComponent, {
        set: {
          template: '',
          templateUrl: null,
        }
      })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.hostComponent = this.fixture.componentInstance;
        this.component = this.hostComponent.loginForm;
      });
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });

});
