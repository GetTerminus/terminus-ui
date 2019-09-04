import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  ComponentFixture,
  tick,
} from '@angular/core/testing';
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
    [format]="format"
    [theme]="theme"
    (clicked)="clicked($event)"
    collapseDelay="collapseDelay"
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

  @ViewChild(TsButtonComponent, { static: true })
  public buttonComponent!: TsButtonComponent;

  public changed = jest.fn();
  public clicked = jest.fn();
  private COLLAPSE_DEFAULT_DELAY = undefined;
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


  describe(`when format === collapsable`, function() {

    test(`should set isCollapsed to false if a delay is set and the value is FALSE`, () => {
      buttonComponent.collapseWithDelay = jest.fn();
      buttonComponent.collapseDelay = 400;
      buttonComponent.collapsed = false;
      fixture.detectChanges();

      expect(buttonComponent.collapseWithDelay).toHaveBeenCalled();
      expect(buttonComponent.isCollapsed).toEqual(false);
      expect(button.classList).not.toContain('c-button--collapsed');
    });


    test(`should not call collapseWithDelay if no delay is set and the value is FALSE`, () => {
      component.collapseWithDelay = jest.fn();
      component.collapsed = false;

      expect(component.collapseWithDelay).not.toHaveBeenCalled();
      expect(button.classList).not.toContain('c-button--collapsed');
    });


    test(`should not call collapseWithDelay if delay is set and the value is TRUE`, () => {
      component.collapseWithDelay = jest.fn();
      component.collapseDelay = 400;
      component.collapsed = true;

      expect(component.collapseWithDelay).not.toHaveBeenCalled();
      expect(button.classList).not.toContain('c-button--collapsed');
    });

  });


  describe(`when format !== collapsable`, () => {

    test(`should not call collapseWithDelay if the type is not collapsable`, () => {
      component.collapseWithDelay = jest.fn();
      component.buttonComponent.format = 'filled';
      component.collapsed = false;

      expect(component.collapseWithDelay).not.toHaveBeenCalled();
      expect(button.classList).not.toContain('c-button--collapsed');
    });

  });


  describe(`set format`, () => {

    describe(`when format === collapsable`, () => {

      test(`should set the collapseDelay to default if unset`, () => {
        buttonComponent.format = 'collapsable';

        expect(component.collapseDelay).toEqual(component.COLLAPSE_DEFAULT_DELAY);
      });


      test(`should not set the collapseDelay to default if a value is passed in`, () => {
        component.collapseDelay = 1000;
        component.format = 'collapsable';
        fixture.detectChanges();

        expect(component.collapseDelay).toEqual(1000);
        expect(button.classList).toContain('c-button--collapsable');
      });

    });


    describe('when format !== collapsable', function() {

      test(`should remove any existing collapseDelay`, () => {
        buttonComponent.collapseDelay = 400;
        buttonComponent.format = 'filled';
        fixture.detectChanges();

        expect(buttonComponent.collapseDelay).toBeUndefined();
      });

    });


    test(`should not update classes if no value is passed in`, () => {
      component.updateClasses = jest.fn();
      component.format = null as any;

      expect(component.updateClasses).not.toHaveBeenCalled();
      expect(button.classList).toContain('c-button--filled');
    });


    test(`should log a warning if an invalid value was passed in`, () => {
      window.console.warn = jest.fn();
      buttonComponent.updateClasses = jest.fn();
      buttonComponent.format = 'foo' as any;
      fixture.detectChanges();

      expect(window.console.warn).toHaveBeenCalled();
      expect(buttonComponent.updateClasses).not.toHaveBeenCalled();
    });


    test(`should update classes if correct format is passed in`, () => {
      component.updateClasses = jest.fn();
      component.format = 'filled' as any;

      expect(component.updateClasses).not.toHaveBeenCalled();
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
      component.updateClasses = jest.fn();
      component.theme = null as any;

      expect(component.updateClasses).not.toHaveBeenCalled();
      expect(button.classList).toContain('c-button--primary');
      expect(button.classList).not.toContain('c-button--accent');
    });


    test(`should log a warning if an invalid value was passed in`, () => {
      window.console.warn = jest.fn();
      buttonComponent.updateClasses = jest.fn();
      buttonComponent.theme = 'foo' as any;
      fixture.detectChanges();

      expect(window.console.warn).toHaveBeenCalled();
      expect(buttonComponent.updateClasses).not.toHaveBeenCalled();
      expect(button.classList).toContain('c-button--primary');
      expect(button.classList).not.toContain('c-button--accent');
    });

  });


  describe(`ngOnInit()`, function() {

    test(`should call collapseWithDelay if collapseDelay is set`, () => {
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


    test(`should call not collapseWithDelay if collapseDelay is not set`, () => {
      component.collapseWithDelay = jest.fn();
      component.collapseDelay = undefined;
      component.ngOnInit();

      expect(component.collapseWithDelay).not.toHaveBeenCalled();
      expect(button.classList).not.toContain('c-button--collapsable');
    });


    describe(`when format === collapsable`, () => {

      beforeEach(() => {
        buttonComponent.format = 'collapsable';
        buttonComponent.collapseWithDelay = jest.fn();
        buttonComponent.collapseDelay = 500;
      });


      test(`should throw an error if the format is collapsable and no icon is set`, () => {
        expect(() => {
          buttonComponent.ngOnInit();
        }).toThrow();
      });


      test(`should not throw an error if the format is collapsable and there is an icon set`, () => {
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
      buttonComponent.format = 'collapsable';
      buttonComponent.iconName = 'home';
      buttonComponent.changeDetectorRef.detectChanges = jest.fn();
      buttonComponent.windowService.nativeWindow.clearTimeout = jest.fn();
      buttonComponent.windowService.nativeWindow.setTimeout = jest.fn().mockReturnValue(123);
    });


    test(`should clear any existing timeouts`, () => {
      buttonComponent.ngOnInit();
      expect(buttonComponent.collapseTimeoutId).toEqual(123);

      buttonComponent.ngOnDestroy();
      expect(buttonComponent.windowService.nativeWindow.clearTimeout).toHaveBeenCalledWith(123);
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


  describe(`collapseWithDelay()`, () => {

    beforeEach(() => {
      buttonComponent.format = 'collapsable';
      buttonComponent.windowService.nativeWindow.setTimeout = window.setTimeout;
    });


    test(`should set isCollapsed and trigger change detection after the delay`, () => {
      jest.useFakeTimers();

      const DELAY = 100;
      buttonComponent.collapseWithDelay(DELAY);
      jest.advanceTimersByTime(2000);
      fixture.detectChanges();

      expect(buttonComponent.isCollapsed).toEqual(true);
      jest.runAllTimers();
      expect(button.classList).toContain('c-button--collapsable');
    });

  });

});
