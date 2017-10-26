import { debounce } from './debounce';


describe(`debounce()`, () => {

  beforeEach(() => {
    this.func = jasmine.createSpy('func');
    this.debounced = debounce(this.func, 200);
  });


  it(`should debounce all calls for the 'wait' period`, (done) => {
    for (const i of [1, 2, 3]) {
      this.debounced();
    }

    setTimeout(() => {
      expect(this.func).toHaveBeenCalledTimes(1);
      done();
    }, 201);
  });


  it(`should allow multiple calls if called after the wait period`, (done) => {
    const TEST_DELAY = 210;

    for (const i of [1, 2, 3]) {
      this.debounced();
    }

    setTimeout(() => {
      this.debounced();
    }, TEST_DELAY);

    setTimeout(() => {
      expect(this.func).toHaveBeenCalledTimes(2);
      done();
    }, TEST_DELAY * 2);
  });

});
