import { ControlValueAccessorProviderFactory } from './cva-provider-factory';

describe(`ControlValueAccessorProviderFactory`, function() {
  test(`should forward a reference to this component`, () => {
    class Foo {}
    const provider = ControlValueAccessorProviderFactory<Foo>(Foo);
    expect(provider.useExisting()).toEqual(Foo);
  });
});
