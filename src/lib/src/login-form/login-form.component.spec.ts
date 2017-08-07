import {
  Component,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  TestBed,
  ComponentFixture,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TsInputModule } from './../input/input.module';
import { TsCheckboxModule } from './../checkbox/checkbox.module';
import { TsButtonModule } from './../button/button.module';
import { TsSpacingModule } from './../spacing/spacing.module';
import { TsLinkModule } from './../link/link.module';
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
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        TsInputModule,
        TsCheckboxModule,
        TsButtonModule,
        TsSpacingModule,
        TsLinkModule,
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


  describe(`getControl()`, () => {

    it(`should return a form control`, () => {
      this.fixture.detectChanges();
      // Seed the value so that we can verify we grabbed the correct control below
      this.component.loginForm.patchValue({
        password: 'foo',
      });
      const control = this.component.getControl('password', this.component.loginForm);

      expect(control.value).toEqual('foo');
    });

  });


  describe(`resetForm()`, () => {

    it(`should reset all inputs to their initial value`, fakeAsync(() => {
      this.fixture.detectChanges();
      this.component.loginForm.patchValue({
        email: 'foo',
        password: 'bar',
      });

      const emailValueBefore = this.component.getControl('email', this.component.loginForm).value;
      expect(emailValueBefore).toEqual('foo');

      const passwordValueBefore = this.component.getControl('password', this.component.loginForm).value;
      expect(passwordValueBefore).toEqual('bar');

      this.component._resetForm();
      tick();

      const emailValueAfter = this.component.getControl('email', this.component.loginForm).value;
      expect(emailValueAfter).toEqual(null);

      const passwordValueAfter = this.component.getControl('password', this.component.loginForm).value;
      expect(passwordValueAfter).toEqual(null);
    }));

  });


});
