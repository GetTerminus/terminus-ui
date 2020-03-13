import { TsSortDirective } from './sort.directive';

// NOTE: These tests were added to cover areas missed by the TsTable integration tests
describe(`TsSortDirective`, function() {
  let directive: TsSortDirective;

  beforeEach(() => {
    directive = new TsSortDirective();
  });

  describe(`getNextSortDirection()`, () => {
    it(`should return an empty string if no 'sortable' was passed in`, () => {
      expect(directive.getNextSortDirection(null as any)).toEqual('');
    });
  });
});
