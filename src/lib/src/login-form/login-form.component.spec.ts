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
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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


  // TODO: Fully test


});
