import {
  Version,
  VERSION,
} from './version';

describe(`Version`, function() {
  test(`should expose a Version object`, () => {
    const version = new Version('9.8.7-beta.1');
    expect(version.full).toEqual('9.8.7-beta.1');
    expect(version.major).toEqual('9');
    expect(version.minor).toEqual('8');
    expect(version.patch).toEqual('7-beta.1');
  });
});

describe(`VERSION`, () => {
  test(`should have full version object`, () => {
    expect(VERSION.full).toEqual('0.0.0-PLACEHOLDER');
    expect(VERSION.major).toEqual('0');
  });
});
