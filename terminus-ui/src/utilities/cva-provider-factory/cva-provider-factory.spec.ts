import { ControlValueAccessorProviderFactory } from './cva-provider-factory';


describe(`ControlValueAccessorProviderFactory`, () => {

  test(`should forward a reference to this component`, () => {
    class Foo {}
    const provider = ControlValueAccessorProviderFactory(Foo);
    expect(provider.useExisting()).toEqual(Foo);
  });

});
