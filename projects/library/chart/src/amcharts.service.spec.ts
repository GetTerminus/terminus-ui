import {
  TsAmChartsService,
  TsAmChartsToken,
} from './amcharts.service';

const AM_CHARTS_TOKEN_MOCK = {
  core: { useTheme: jest.fn() },
  themes: ['foo', null, 'bar'],
} as TsAmChartsToken;

describe(`TsAmChartsService`, function() {
  let service: TsAmChartsService;

  beforeEach(() => {
    service = new TsAmChartsService(AM_CHARTS_TOKEN_MOCK);
  });

  test(`should set the theme if passed in`, () => {
    expect(service.amCharts.core.useTheme).toHaveBeenCalledWith('foo');
    expect(service.amCharts.core.useTheme).not.toHaveBeenCalledWith(null);
    expect(service.amCharts.core.useTheme).toHaveBeenCalledWith('bar');
    expect.assertions(3);
  });
});
