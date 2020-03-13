import { TsValidatorsService } from './validators.service';

describe(`TsValidatorsService`, function() {
  let service: TsValidatorsService;

  beforeEach(() => {
    service = new TsValidatorsService();
  });

  it(`should exist`, () => {
    expect(service).toBeTruthy();
  });

  describe(`creditCard()`, () => {
    test(`should exist`, () => {
      expect(service.creditCard).toBeTruthy();
    });
  });

  describe(`email()`, () => {
    test(`should exist`, () => {
      expect(service.email).toBeTruthy();
    });
  });

  describe(`inCollection()`, () => {
    test(`should exist`, () => {
      expect(service.inCollection).toBeTruthy();
    });
  });

  describe(`isInRange()`, () => {
    test(`should exist`, () => {
      expect(service.isInRange).toBeTruthy();
    });
  });

  describe(`password()`, () => {
    test(`should exist`, () => {
      expect(service.password).toBeTruthy();
    });
  });

  describe(`url()`, () => {
    test(`should exist`, () => {
      expect(service.url).toBeTruthy();
    });
  });
});
