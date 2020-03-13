import { TsTitleCasePipe } from './title-case.pipe';

describe(`TsSentenceCasePipe`, function() {
  let pipeClass: TsTitleCasePipe;
  let pipe: Function;

  beforeEach(() => {
    pipeClass = new TsTitleCasePipe();
    pipe = pipeClass.transform;
  });

  test(`should return undefined if no value is passed in`, () => {
    expect(pipe(null)).toEqual(undefined);
    expect(pipe('')).toEqual(undefined);
  });

  test(`should format a string`, () => {
    expect(pipe('HELLO THERE')).toEqual('Hello There');
    expect(pipe('hi there friend')).toEqual('Hi There Friend');
    expect(pipe('i Am A hAcKeR')).toEqual('I Am A Hacker');
  });
});
