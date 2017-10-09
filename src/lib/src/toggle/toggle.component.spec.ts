import {
  Component,
} from '@angular/core';
import {
  TestBed,
  async,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material';

import { TsToggleComponent } from './toggle.component';


@Component({
  template: `
    <div>
      <ts-toggle>
        My checkbox!
      </ts-toggle>
    </div>
  `,
})
class TestHostComponent {}


describe(`ToggleComponent`, () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatSlideToggleModule,
      ],
      declarations: [
        TsToggleComponent,
        TestHostComponent,
      ],
    })
      .overrideComponent(TsToggleComponent, {
        set: {
          template: '',
          templateUrl: null,
        }
      })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TsToggleComponent);
        this.component = this.fixture.componentInstance;
      });
  }));


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });

});
