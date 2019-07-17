import { APP_BASE_HREF } from '@angular/common';
import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { createComponent } from '@terminus/ngx-tools/testing';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';

import { TsLinkComponent } from './link.component';
import { TsLinkModule } from './link.module';


@Component({
  template: `
  <ts-link
    [destination]="destination"
    [isExternal]="isExternal"
    [tabIndex]="tabIndex"
    [theme]="theme"
  >
  My Link Text
  </ts-link>
  `,
})
class TestHostComponent {
  public destination!: any;
  public isExternal!: boolean;
  public tabIndex!: number | undefined;
  public theme: TsStyleThemeTypes = 'primary';

  @ViewChild(TsLinkComponent, {static: true})
  public linkComponent!: TsLinkComponent;
}


describe(`TsLinkComponent`, function() {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let link: HTMLElement;
  let linkComponent: TsLinkComponent;

  beforeEach(() => {
    fixture = createComponent(
      TestHostComponent,
      [{
        provide: APP_BASE_HREF,
        useValue: '/my/app',
      }],
      [TsLinkModule, RouterModule.forRoot([])],
    );
    component = fixture.componentInstance;
    linkComponent = component.linkComponent;
    fixture.detectChanges();
  });


  test(`should exist`, () => {
    expect(linkComponent).toBeTruthy();
  });


  describe(`isInternal`, () => {

    test(`should default and retrieve`, () => {
      link = fixture.debugElement.query(By.css('.c-link')).nativeElement as HTMLElement;
      component.isExternal = false;
      component.destination = ['/#'];

      expect(link.classList).toContain('qa-link-internal');
    });

  });


  describe(`isExternal`, () => {

    test(`should set and retrieve`, () => {
      component.destination = 'www.google.com';
      component.isExternal = true;
      fixture.detectChanges();
      link = fixture.debugElement.query(By.css('.c-link')).nativeElement as HTMLElement;

      expect(link.classList).toContain('qa-link-external');
      expect(link.children[0].textContent).toContain('open_in_new');
    });

  });


  describe(`tabIndex`, () => {

    test(`should default to 0 and be set`, () => {
      expect(link.tabIndex).toEqual(0);

      component.tabIndex = 9;
      fixture.detectChanges();
      link = fixture.debugElement.query(By.css('.c-link')).nativeElement as HTMLElement;

      expect(link.tabIndex).toEqual(9);
    });

  });


  describe(`theme`, function() {

    test(`should set the appropriate class`, function() {
      link = fixture.debugElement.query(By.css('.ts-link')).nativeElement as HTMLElement;

      expect(link.classList).toContain('ts-link--primary');

      component.theme = 'accent';
      fixture.detectChanges();
      link = fixture.debugElement.query(By.css('.ts-link')).nativeElement as HTMLElement;

      expect(link.classList).not.toContain('ts-link--primary');
      expect(link.classList).toContain('ts-link--accent');
      expect.assertions(3);
    });

  });

});
