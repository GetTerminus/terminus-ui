import { Component } from '@angular/core';
import { async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponent } from '@terminus/ngx-tools/testing/public-api';

import { AppComponent } from './app.component';

@Component({
  template: `
  <demo-app></demo-app>
  `,
})
class TestHostComponent {
}

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    fixture = createComponent(TestHostComponent, [], [RouterTestingModule]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const fixture = createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));

});
