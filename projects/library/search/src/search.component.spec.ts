import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { createComponent } from '@terminus/ngx-tools/testing';
import { TsButtonComponent } from '@terminus/ui/button';
import { TsInputComponent } from '@terminus/ui/input';
import {
  getInputElement,
  sendInput,
} from '@terminus/ui/input/testing';

import { TsSearchComponent } from './search.component';
import { TsSearchModule } from './search.module';

@Component({
  template: `
      <ts-search
        [isDisabled]="isDisabled"
        [isSubmitting]="inProgress"
        [isFocused]="isFocused"
        [initialValue]="startingValue"
        [autoSubmit]="shouldAutoSubmit"
        [userCanClear]="userCanClear"
        (submitted)="onSubmit($event)"
        (cleared)="onClear()"
        (changed)="onChange($event)"
      ></ts-search>
  `,
})
class TestHostComponent implements OnInit {
  isDisabled = false;
  isFocused = true;
  inProgress = false;
  startingValue = '';
  shouldAutoSubmit = true;
  noValidationOrHint = false;
  userCanClear = true;

  @ViewChild(TsButtonComponent, { static: true })
  public buttonComponent!: TsButtonComponent;

  @ViewChild(TsInputComponent)
  public inputComponent!: TsInputComponent;

  @ViewChild(TsSearchComponent)
  public searchComponent!: TsSearchComponent;

  onSubmit(query: string): void { }

  onClear(): void { }

  onChange(value: string): void {
    console.log('DEMO: search input changed: ', value);
  }
  ngOnInit(): void { }
}

describe('TsSearchComponent', function() {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let search: HTMLElement;
  let searchComponent;

  beforeEach(() => {
    fixture = createComponent(TestHostComponent, [], [TsSearchModule]);
    component = fixture.componentInstance;
    fixture.detectChanges();
    search = fixture.debugElement.query(By.css('.ts-search')).nativeElement;
    searchComponent = component.searchComponent;
  });

  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });

  describe(`isDisabled`, () => {
    test(`should set and retrieve`, () => {
      component.isDisabled = true;
      const inputElement = getInputElement(fixture);
      expect(inputElement.disabled).toEqual(false);
    });
  });

  describe(`isFocused`, () => {
    test(`should set and retrieve`, () => {
      component.isFocused = true;
      expect(component.isFocused).toEqual(true);
    });
  });

  describe(`isSubmitting`, () => {
    test(`should set and retrieve`, () => {
      component.shouldAutoSubmit = false;
      component.inProgress = true;
      fixture.detectChanges();
      const button = fixture.debugElement.queryAll(By.css('.c-button'))[0].nativeElement as HTMLButtonElement;
      expect(button.getAttribute('disabled')).toEqual('true');
    });
  });

  describe(`userCanClear`, () => {
    test(`should set and retrieve`, () => {
      component.userCanClear = true;
      fixture.detectChanges();
      sendInput(fixture, 'foo');
      fixture.detectChanges();
      const clearButton = fixture.debugElement.query(By.css('.c-input__clear')).nativeElement;
      expect(clearButton).toBeTruthy();
    });
  });

  describe(`currentQuery`, () => {
    test(`should return the current query with no trailing or leading whitespace`, () => {
      searchComponent.initialValue = 'foo';
      searchComponent.ngOnInit();
      expect(searchComponent.currentQuery).toEqual('foo');

      searchComponent.searchForm.patchValue({ query: ' foo 23 ' });
      expect(searchComponent.currentQuery).toEqual('foo 23');

      searchComponent.searchForm.patchValue({ query: null });
      expect(searchComponent.currentQuery).toEqual('');
    });

    test(`should return empty string if current query length below required minimum`, () => {
      searchComponent.initialValue = 'a';
      searchComponent.ngOnInit();
      expect(searchComponent.currentQuery).toEqual('');
    });
  });

  describe(`ngOnInit()`, () => {
    test(`should seed the query with an initial value if one exists`, () => {
      const STRING = 'foo';
      searchComponent.initialValue = STRING;
      expect(searchComponent.query).toEqual('');

      searchComponent.ngOnInit();

      expect(searchComponent.searchForm.get('query')!.value).toEqual(STRING);
    });
  });

  describe(`keyup()`, () => {
    beforeEach(() => {
      searchComponent.changed.emit = jest.fn();
      searchComponent.debouncedEmit = jest.fn();
    });

    test(`should emit each change`, () => {
      searchComponent.initialValue = 'foo';
      searchComponent.autoSubmit = false;
      fixture.detectChanges();
      searchComponent.ngOnInit();
      searchComponent.keyup();

      expect(searchComponent.changed.emit).toHaveBeenCalledWith('foo');
      expect(searchComponent.debouncedEmit).not.toHaveBeenCalled();
    });

    describe(`with auto submit enabled`, () => {
      test(`should call the debounced emit if the form is valid`, () => {
        searchComponent.autoSubmit = true;
        searchComponent.initialValue = 'foo';
        searchComponent.ngOnInit();
        searchComponent.keyup();

        expect(searchComponent.debouncedEmit).toHaveBeenCalled();
      });

      test(`should NOT call the debounced emit if the form is NOT valid`, () => {
        searchComponent.autoSubmit = true;
        searchComponent.initialValue = 'foo&';
        searchComponent.ngOnInit();
        searchComponent.keyup();

        expect(searchComponent.debouncedEmit).not.toHaveBeenCalled();
      });
    });

    describe(`without auto submit enabled`, () => {
      test(`should NOT call the debounced emit even if the form is valid`, () => {
        searchComponent.autoSubmit = false;
        searchComponent.initialValue = 'foo';
        searchComponent.ngOnInit();
        searchComponent.keyup();

        expect(searchComponent.debouncedEmit).not.toHaveBeenCalled();
      });
    });
  });

  describe(`emitSubmit()`, () => {
    beforeEach(() => {
      searchComponent.submitted.emit = jest.fn();
      searchComponent.initialValue = 'foo';
      searchComponent.ngOnInit();
    });

    test(`should emit an event if the form is valid`, () => {
      searchComponent['emitSubmit']();
      expect(searchComponent.submitted.emit).toHaveBeenCalledWith({ query: 'foo' });
    });

    test(`should call emitSubmit via debouncedEmit`, () => {
      jest.useFakeTimers();
      searchComponent.debouncedEmit();
      jest.runAllTimers();

      expect(searchComponent.submitted.emit).toHaveBeenCalledWith({ query: 'foo' });
    });
  });

  describe(`get searchFormControl`, function() {
    test(`should return the control`, function() {
      expect(searchComponent.searchFormControl!.statusChanges).toBeTruthy();
    });

    test(`should return null if the control doesn't exist`, function() {
      searchComponent.searchForm = new FormGroup({});
      expect(searchComponent.searchFormControl).toEqual(null);
    });
  });
});
