import { Component } from '@angular/core';
import { 
  async, 
  ComponentFixture 
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponent } from '@terminus/ngx-tools/testing';

import { AppComponent } from './app.component';

@Component({
  template: `
  <demo-root></demo-root>
  `,
})
class TestHostComponent {
}

describe('AppComponent', () => {

  let fixture: ComponentFixture<TestHostComponent>;

  it('should create the app', async(() => {
    fixture = createComponent(AppComponent, [], [RouterTestingModule]);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    expect(app).toBeTruthy();
  }));

});
