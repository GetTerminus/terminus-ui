import { createMouseEvent } from '@terminus/ngx-tools/testing';

import { TsChartEvent } from './chart.event';


describe(`TsChartEvent`, () => {

  test(`should expose the event and original context`, () => {
    const eventMock = createMouseEvent('click');
    const contextMock = {baz: 'bing'};
    const newEvent = new TsChartEvent(
      eventMock,
      contextMock as any,
    );
    expect(newEvent.originalEvent).toEqual(eventMock);
    expect(newEvent.context).toEqual(contextMock);
  });

});
