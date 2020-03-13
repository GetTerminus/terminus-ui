import { TsUILibraryError } from './ui-error';

describe(`TsUILibraryError`, () => {
  let error: TsUILibraryError;

  beforeEach(() => {
    error = new TsUILibraryError('Foo bar baz');
  });

  test(`should return our error`, () => {
    expect(error.name).toEqual('TsUILibraryError');
    expect(error.message).toEqual('Foo bar baz');
    expect(error.stack).toEqual(expect.stringContaining('Error: Foo bar baz'));
    expect(error.stack).toEqual(expect.stringContaining('at new TsUILibraryError'));
  });
});
