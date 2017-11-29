import {
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  TsInputComponent,
  CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
} from './input.component';


describe(`TsInputComponent`, () => {

  beforeEach(() => {
    this.component = new TsInputComponent();
  });


  it(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });


  describe(`reset()`, () => {

    it(`should clear the value`, () => {
      const VALUE = 'foo';

      this.component.value = VALUE;
      expect(this.component.value).toEqual(VALUE);

      this.component.reset();
      expect(this.component.value).toEqual('');
    });

  });


  describe(`Custom select control value accessor`, () => {

    it(`should forward a reference to this component`, () => {
      expect(CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR.useExisting()).toEqual(TsInputComponent);
    });

  });


  describe(`ngAfterViewInit()`, () => {

    beforeEach(() => {
      this.component.input = {
        nativeElement: {
          focus: jasmine.createSpy('focus'),
        },
      };
    });


    it(`should focus the input in the next event loop if isFocused is true`, fakeAsync(() => {
      this.component.isFocused = true;
      this.component.ngAfterViewInit();

      tick();
      expect(this.component.input.nativeElement.focus).toHaveBeenCalled();
    }));


    it(`should do nothing if isFocused is false`, () => {
      this.component.ngAfterViewInit();

      expect(this.component.input.nativeElement.focus).not.toHaveBeenCalled();
    });

  });

});
