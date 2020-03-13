import {
  TestBed,
  async,
} from '@angular/core/testing';
import {
  TsButtonModule,
  TsCardModule,
  TsSpacingModule,
} from '@terminus/ui';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TsCardModule,
        TsSpacingModule,
        TsButtonModule,
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  }));

  test('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  test(`should have as title 'visual-regression'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Visual Regression');
  });
});
