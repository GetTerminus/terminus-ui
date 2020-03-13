import { TsSentenceCasePipe } from './sentence-case.pipe';

describe(`TsSentenceCasePipe`, function() {
  let pipeClass: TsSentenceCasePipe;
  let pipe: Function;

  beforeEach(() => {
    pipeClass = new TsSentenceCasePipe();
    pipe = pipeClass.transform;
  });

  test(`should return undefined if no value is passed in`, () => {
    expect(pipe(null)).toEqual(undefined);
    expect(pipe('')).toEqual(undefined);
  });

  test(`should format a string`, () => {
    const strings: string[] = [
      'HELLO THERE',
      'hi there friend',
      'i Am A hAcKeR',
    ];

    expect(pipe(strings[0])).toEqual('Hello there');
    expect(pipe(strings[1])).toEqual('Hi there friend');
    expect(pipe(strings[2])).toEqual('I am a hacker');
  });
});
