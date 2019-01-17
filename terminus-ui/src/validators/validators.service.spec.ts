import { TsValidatorsService } from './validators.service';


describe(`TsValidatorsService`, function() {
  let service: TsValidatorsService;
  const validators = [
    'creditCard',
    'email',
    'equalToControl',
    'greaterThan',
    'inCollection',
    'isInRange',
    'lessThan',
    'lowercase',
    'maxDate',
    'minDate',
    'numbers',
    'password',
    'uppercase',
    'url',
  ];

  beforeEach(() => {
    service = new TsValidatorsService();
  });


  test(`should exist`, () => {
    expect(service).toBeTruthy();
  });


  test(`should have all validators exposed`, function() {
    for (const validator of validators) {
      expect(service[validator]).toBeTruthy();
    }
    expect.assertions(validators.length);
  });

});
