import { TsInputComponent } from './input.component';


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

});
