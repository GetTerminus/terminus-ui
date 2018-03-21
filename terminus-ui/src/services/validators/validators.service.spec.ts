import { TsValidatorsService } from './validators.service';


describe(`TsValidatorsService`, () => {

  beforeEach(() => {
    this.service = new TsValidatorsService();
  });


  it(`should exist`, () => {
    expect(this.service).toBeTruthy();
  });


  describe(`creditCard()`, () => {

    test(`should exist`, () => {
      expect(this.service.creditCard).toBeTruthy();
    });

  });


  describe(`email()`, () => {

    test(`should exist`, () => {
      expect(this.service.email).toBeTruthy();
    });

  });


  describe(`password()`, () => {

    test(`should exist`, () => {
      expect(this.service.password).toBeTruthy();
    });

  });


  describe(`url()`, () => {

    test(`should exist`, () => {
      expect(this.service.url).toBeTruthy();
    });

  });

});
