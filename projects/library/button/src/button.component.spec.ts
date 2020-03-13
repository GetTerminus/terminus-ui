import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  createComponent,
  createMouseEvent,
} from '@terminus/ngx-tools/testing';

import { TsButtonComponent } from './button.component';
import { TsButtonModule } from './button.module';

@Component({
  template: `
    <ts-button
      [isDisabled]="disabled"
      [showProgress]="showProgress"
      [collapsed]="collapsed"
      [iconName]="iconName"
      [id]="myId"
      [format]="format"
      [theme]="theme"
      (clicked)="clicked($event)"
    >Click Me!</ts-button>
  `,
})
class TestHostComponent implements OnInit, OnDestroy {
  public disabled!: boolean;
  public collapsed!: boolean;
  public showProgress!: boolean;
  public collapseDelay!: number | undefined;
  public format!: string;
  public iconName!: string | undefined;
  public theme!: string;
  public myId = 'foo';

  @ViewChild(TsButtonComponent, { static: true })
  public buttonComponent!: TsButtonComponent;

  public changed = jest.fn();
  public clicked = jest.fn();
  public COLLAPSE_DEFAULT_DELAY = undefined;
  public ngOnInit() { }
  public ngOnDestroy() { }
}

describe(`TsButtonComponent`, function() {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let button: HTMLButtonElement;
  let buttonComponent: TsButtonComponent;

  beforeEach(() => {
    fixture = createComponent(TestHostComponent, [], [TsButtonModule]);
    component = fixture.componentInstance;
    buttonComponent = component.buttonComponent;
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('.c-button')).nativeElement as HTMLButtonElement;
  });

  describe(`isDisabled`, () => {
    test(`should not have button disabled`, () => {
      component.disabled = false;
      fixture.detectChanges();
      expect(buttonComponent.isDisabled).toEqual(false);
      expect(button.disabled).toEqual(false);
      button.click();
      expect(component.clicked).toHaveBeenCalled();
    });

    test(`should have button disabled`, () => {
      component.disabled = true;
      fixture.detectChanges();
      expect(buttonComponent.isDisabled).toEqual(true);
      expect(button.disabled).toEqual(true);
      expect(component.clicked).not.toHaveBeenCalled();
    });
  });

  test(`click`, () => {
    component.buttonComponent.clicked.emit = jest.fn();
    button.click();
    expect(buttonComponent.clicked.emit).toHaveBeenCalled();
  });

  describe(`showProgress`, () => {
    test(`should set disabled attribute if showProgress is true`, () => {
      component.showProgress = true;
      fixture.detectChanges();
      button = fixture.debugElement.query(By.css('.c-button')).nativeElement as HTMLButtonElement;
      expect(buttonComponent.showProgress).toEqual(true);
      expect(button.getAttribute('disabled')).toEqual('true');
    });

    test(`should not set disabled if showProgress and disabled are false`, () => {
      component.showProgress = false;
      component.disabled = false;
      fixture.detectChanges();
      expect(buttonComponent.showProgress).toEqual(false);
      expect(button.getAttribute('disabled')).toEqual(null);
    });
  });

  describe(`when collapsed is true`, function() {
    test(`should have button collapsed class set`, function() {
      component.collapsed = true;
      fixture.detectChanges();
      expect(buttonComponent.isCollapsed).toEqual(true);
      expect(button.classList).toContain('c-button--collapsed');
    });
  });

  describe(`when format === collapsible`, function() {
    test(`should set isCollapsed to false if a delay is set and the value is FALSE`, () => {
      buttonComponent['collapseWithDelay'] = jest.fn();
      buttonComponent.collapseDelay = 400;
      buttonComponent.collapsed = false;
      fixture.detectChanges();

      expect(buttonComponent['collapseWithDelay']).toHaveBeenCalled();
      expect(buttonComponent.isCollapsed).toEqual(false);
      expect(button.classList).not.toContain('c-button--collapsed');
    });

    test(`should not call collapseWithDelay if no delay is set and the value is FALSE`, () => {
      component['collapseWithDelay'] = jest.fn();
      component.collapsed = false;

      expect(component['collapseWithDelay']).not.toHaveBeenCalled();
      expect(button.classList).not.toContain('c-button--collapsed');
    });

    test(`should not call collapseWithDelay if delay is set and the value is TRUE`, () => {
      component['collapseWithDelay'] = jest.fn();
      component.collapseDelay = 400;
      component.collapsed = true;

      expect(component['collapseWithDelay']).not.toHaveBeenCalled();
      expect(button.classList).not.toContain('c-button--collapsed');
    });
  });

  describe(`when format !== collapsible`, () => {
    test(`should not call collapseWithDelay if the type is not collapsible`, () => {
      component['collapseWithDelay'] = jest.fn();
      component.buttonComponent.format = 'filled';
      component.collapsed = false;

      expect(component['collapseWithDelay']).not.toHaveBeenCalled();
      expect(button.classList).not.toContain('c-button--collapsed');
    });
  });

  describe(`set format`, () => {
    describe(`when format === collapsible`, () => {
      // Deprecated version
      test(`should set the collapseDelay to default if unset (deprecated version)`, () => {
        buttonComponent.format = 'collapsable';

        expect(component.collapseDelay).toEqual(component.COLLAPSE_DEFAULT_DELAY);
      });

      test(`should set the collapseDelay to default if unset`, () => {
        buttonComponent.format = 'collapsible';

        expect(component.collapseDelay).toEqual(component.COLLAPSE_DEFAULT_DELAY);
      });

      // Deprecated version
      test(`should not set the collapseDelay to default if a value is passed in (deprecated version)`, () => {
        component.collapseDelay = 1000;
        component.format = 'collapsable';
        fixture.detectChanges();

        expect(component.collapseDelay).toEqual(1000);
        expect(button.classList).toContain('c-button--collapsable');
      });

      test(`should not set the collapseDelay to default if a value is passed in`, () => {
        component.collapseDelay = 1000;
        component.format = 'collapsible';
        fixture.detectChanges();

        expect(component.collapseDelay).toEqual(1000);
        expect(button.classList).toContain('c-button--collapsible');
      });
    });

    describe('when format !== collapsible', function() {
      test(`should remove any existing collapseDelay`, () => {
        buttonComponent.collapseDelay = 400;
        buttonComponent.format = 'filled';
        fixture.detectChanges();

        expect(buttonComponent.collapseDelay).toBeUndefined();
      });
    });

    test(`should not update classes if no value is passed in`, () => {
      component['updateClasses'] = jest.fn();
      component.format = null as any;

      expect(component['updateClasses']).not.toHaveBeenCalled();
      expect(button.classList).toContain('c-button--filled');
    });

    test(`should log a warning if an invalid value was passed in`, () => {
      window.console.warn = jest.fn();
      buttonComponent['updateClasses'] = jest.fn();
      buttonComponent.format = 'foo' as any;
      fixture.detectChanges();

      expect(window.console.warn).toHaveBeenCalled();
      expect(buttonComponent['updateClasses']).not.toHaveBeenCalled();
    });

    test(`should update classes if correct format is passed in`, () => {
      component['updateClasses'] = jest.fn();
      component.format = 'filled' as any;

      expect(component['updateClasses']).not.toHaveBeenCalled();
      expect(button.classList).toContain('c-button--filled');
    });
  });

  describe(`set theme`, () => {
    test(`should set a custom theme`, () => {
      component.theme = 'accent';
      fixture.detectChanges();

      expect(button.classList).not.toContain('c-button--primary');
      expect(button.classList).toContain('c-button--accent');
    });

    test(`should not update classes if no value is passed in`, () => {
      component['updateClasses'] = jest.fn();
      component.theme = null as any;

      expect(component['updateClasses']).not.toHaveBeenCalled();
      expect(button.classList).toContain('c-button--primary');
      expect(button.classList).not.toContain('c-button--accent');
    });

    test(`should log a warning if an invalid value was passed in`, () => {
      window.console.warn = jest.fn();
      buttonComponent['updateClasses'] = jest.fn();
      buttonComponent.theme = 'foo' as any;
      fixture.detectChanges();

      expect(window.console.warn).toHaveBeenCalled();
      expect(buttonComponent['updateClasses']).not.toHaveBeenCalled();
      expect(button.classList).toContain('c-button--primary');
      expect(button.classList).not.toContain('c-button--accent');
    });
  });

  describe(`ngOnInit()`, function() {
    // Deprecated version
    test(`should call collapseWithDelay if collapseDelay is set (deprecated version)`, () => {
      jest.useFakeTimers();
      component.format = 'collapsable';
      component.iconName = 'search';
      component.collapseDelay = 500;
      fixture.detectChanges();
      buttonComponent.ngOnInit();
      jest.advanceTimersByTime(6000);
      fixture.detectChanges();

      expect(button.classList).toContain('c-button--collapsed');
      jest.runAllTimers();
    });

    test(`should call collapseWithDelay if collapseDelay is set`, () => {
      jest.useFakeTimers();
      component.format = 'collapsible';
      component.iconName = 'search';
      component.collapseDelay = 500;
      fixture.detectChanges();
      buttonComponent.ngOnInit();
      jest.advanceTimersByTime(6000);
      fixture.detectChanges();

      expect(button.classList).toContain('c-button--collapsed');
      jest.runAllTimers();
    });

    test(`should call not collapseWithDelay if collapseDelay is not set`, () => {
      buttonComponent['collapseWithDelay'] = jest.fn();
      buttonComponent.collapseDelay = undefined;
      buttonComponent.ngOnInit();

      expect(buttonComponent['collapseWithDelay']).not.toHaveBeenCalled();
      expect(button.classList).not.toContain('c-button--collapsable');
      expect(button.classList).not.toContain('c-button--collapsible');
    });

    // Deprecated version
    describe(`when format === collapsable (deprecated version)`, () => {
      beforeEach(() => {
        buttonComponent.format = 'collapsable';
        buttonComponent['collapseWithDelay'] = jest.fn();
        buttonComponent.collapseDelay = 500;
      });

      test(`should throw an error if the format is collapsible and no icon is set`, () => {
        expect(() => {
          buttonComponent.ngOnInit();
        }).toThrow();
      });

      test(`should not throw an error if the format is collapsible and there is an icon set`, () => {
        component.iconName = 'home';

        expect(() => {
          component.ngOnInit();
        }).not.toThrow();
        expect(button.classList).not.toContain('c-button__icon');
      });
    });

    describe(`when format === collapsible`, () => {
      beforeEach(() => {
        buttonComponent.format = 'collapsible';
        buttonComponent['collapseWithDelay'] = jest.fn();
        buttonComponent.collapseDelay = 500;
      });

      test(`should throw an error if the format is collapsible and no icon is set`, () => {
        expect(() => {
          buttonComponent.ngOnInit();
        }).toThrow();
      });

      test(`should not throw an error if the format is collapsible and there is an icon set`, () => {
        component.iconName = 'home';

        expect(() => {
          component.ngOnInit();
        }).not.toThrow();
        expect(button.classList).not.toContain('c-button__icon');
      });
    });
  });

  describe(`ngOnDestroy()`, () => {
    beforeEach(() => {
      buttonComponent.format = 'collapsible';
      buttonComponent.iconName = 'home';
      buttonComponent['changeDetectorRef'].detectChanges = jest.fn();
      buttonComponent['windowService'].nativeWindow.clearTimeout = jest.fn();
      buttonComponent['windowService'].nativeWindow.setTimeout = jest.fn().mockReturnValue(123);
    });

    test(`should clear any existing timeouts`, () => {
      buttonComponent.ngOnInit();
      expect(buttonComponent['collapseTimeoutId']).toEqual(123);

      buttonComponent.ngOnDestroy();
      expect(buttonComponent['windowService'].nativeWindow.clearTimeout).toHaveBeenCalledWith(123);
    });
  });

  describe(`clickedButton()`, () => {
    let mouseEvent: MouseEvent;

    beforeEach(() => {
      buttonComponent.clicked.emit = jest.fn();
      mouseEvent = createMouseEvent('click');
    });

    test(`should emit the click when interceptClick is false`, () => {
      buttonComponent.clickedButton(mouseEvent);

      expect(buttonComponent.clicked.emit).toHaveBeenCalledWith(mouseEvent);
    });

    test(`should not emit the click when interceptClick is true`, () => {
      buttonComponent.interceptClick = true;
      buttonComponent.clickedButton(mouseEvent);

      expect(buttonComponent.clicked.emit).not.toHaveBeenCalledWith();
      expect(buttonComponent.originalClickEvent).toEqual(mouseEvent);
    });
  });

  // Deprecated version
  describe(`collapseWithDelay() (deprecated version)`, () => {
    beforeEach(() => {
      buttonComponent.format = 'collapsable';
      buttonComponent['windowService'].nativeWindow.setTimeout = window.setTimeout;
    });

    test(`should set isCollapsed and trigger change detection after the delay`, () => {
      jest.useFakeTimers();

      const DELAY = 100;
      buttonComponent['collapseWithDelay'](DELAY);
      jest.advanceTimersByTime(2000);
      fixture.detectChanges();

      expect(buttonComponent.isCollapsed).toEqual(true);
      jest.runAllTimers();
      expect(button.classList).toContain('c-button--collapsable');
    });
  });

  describe(`collapseWithDelay()`, () => {
    beforeEach(() => {
      buttonComponent.format = 'collapsible';
      buttonComponent['windowService'].nativeWindow.setTimeout = window.setTimeout;
    });

    test(`should set isCollapsed and trigger change detection after the delay`, () => {
      jest.useFakeTimers();

      const DELAY = 100;
      buttonComponent['collapseWithDelay'](DELAY);
      jest.advanceTimersByTime(2000);
      fixture.detectChanges();

      expect(buttonComponent.isCollapsed).toEqual(true);
      jest.runAllTimers();
      expect(button.classList).toContain('c-button--collapsible');
    });
  });

  describe(`ID`, function() {
    test(`should support a custom ID`, () => {
      expect(button.getAttribute('id')).toEqual('foo');
    });

    test(`should fall back to the UID if no ID is passed in`, () => {
      component.myId = undefined as any;
      fixture.detectChanges();
      expect(button.getAttribute('id')).toContain('ts-button-');
    });
  });
});
