import { async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponent } from '@terminus/ngx-tools/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  test('should create the app', async(() => {
    const fixture = createComponent(AppComponent, [], [RouterTestingModule]);
    const app = fixture.debugElement.componentInstance;
    fixture.detectChanges();

    expect(app).toBeTruthy();
  }));
});
