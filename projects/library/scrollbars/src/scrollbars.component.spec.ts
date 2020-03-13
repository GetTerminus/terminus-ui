import { TsScrollbarsComponent } from './scrollbars.component';

// eslint-disable-next-line deprecation/deprecation
const divMock = document.createElement('div');
Object.defineProperties(divMock, {
  scrollHeight: { get: () => 300 },
  scrollWidth: { get: () => 200 },
});

class PerfectScrollbarDirectiveMock {
  geometry = jest.fn().mockImplementation(() => ({
    x: this.elementRef.nativeElement.scrollLeft,
    y: this.elementRef.nativeElement.scrollTop,
    h: this.elementRef.nativeElement.scrollHeight,
    w: this.elementRef.nativeElement.scrollWidth,
  }));
  position = jest.fn().mockImplementation(() => ({
    x: this.elementRef.nativeElement.scrollLeft,
    y: this.elementRef.nativeElement.scrollTop,
  }));
  elementRef = { nativeElement: divMock };
  scrollable = jest.fn().mockImplementation(() => true);
  scrollTo = jest.fn();
  scrollToElement = jest.fn();
  scrollToBottom = jest.fn();
  scrollToLeft = jest.fn();
  scrollToRight = jest.fn();
  scrollToTop = jest.fn();
  update = jest.fn();
}

describe(`TsScrollbarsComponent`, function() {
  let component: TsScrollbarsComponent;

  beforeEach(() => {
    component = new TsScrollbarsComponent();
    component.scrollbar = new PerfectScrollbarDirectiveMock() as any;
  });

  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });

  describe(`id`, () => {
    test(`should get/set the id`, () => {
      expect(component.id).toEqual(expect.stringContaining('ts-scrollbars-'));
      component.id = 'foo';
      expect(component.id).toEqual('foo');
      component.id = '';
      expect(component.id).toEqual(expect.stringContaining('ts-scrollbars-'));
    });
  });

  describe(`isDisabled`, () => {
    test(`should set the disabled flag`, () => {
      expect(component.isDisabled).toEqual(false);
      component.isDisabled = true;
      expect(component.isDisabled).toEqual(true);
    });
  });

  /*
   * NOTE: jsDom does not size elements as the browser would. So scrollHeight and scrollWidth are always 0.
   */
  describe(`get geometry()`, () => {
    test(`should return an object representing the position`, () => {
      expect(component.geometry).toEqual({
        x: 0,
        y: 0,
        h: 300,
        w: 200,
      });
    });

    test(`should return null if no scrollbar exists`, () => {
      component.scrollbar = undefined as any;
      expect(component.geometry).toEqual(null);
    });
  });

  describe(`get position()`, () => {
    test(`should return an object representing the current position`, () => {
      expect(component.position).toEqual({
        x: 0,
        y: 0,
      });
    });

    test(`should return null if no scrollbar exists`, () => {
      component.scrollbar = undefined as any;
      expect(component.position).toEqual(null);
    });
  });

  describe(`scrollable`, () => {
    test(`should call the underlying implmentation`, () => {
      expect(component.scrollable('x')).toEqual(true);
      expect(component.scrollbar.scrollable).toHaveBeenCalledWith('x');
    });

    test(`should pass a default value`, () => {
      expect(component.scrollable()).toEqual(true);
      expect(component.scrollbar.scrollable).toHaveBeenCalledWith('any');
    });

    test(`should return null if no scrollbar exists`, () => {
      component.scrollbar = undefined as any;
      expect(component.scrollable('x')).toEqual(null);
    });
  });

  describe(`scrollTo`, () => {
    test(`should call the underlying implementation`, () => {
      component.scrollTo(100);
      expect(component.scrollbar.scrollTo).toHaveBeenCalledWith(100, undefined, undefined);

      component.scrollTo(100, 100, 100);
      expect(component.scrollbar.scrollTo).toHaveBeenCalledWith(100, 100, 100);
    });
  });

  describe(`scrollToElement`, () => {
    test(`should call the underlying implementation`, () => {
      component.scrollToElement('.foo');
      expect(component.scrollbar.scrollToElement).toHaveBeenCalledWith('.foo', undefined, component['scrollSpeed']);

      component.scrollToElement('.foo', 100, 10);
      expect(component.scrollbar.scrollToElement).toHaveBeenCalledWith('.foo', 10, 100);
    });
  });

  describe(`scrollToBottom`, () => {
    test(`should call the underlying implementation`, () => {
      component.scrollToBottom();
      expect(component.scrollbar.scrollToBottom).toHaveBeenCalledWith(undefined, component['scrollSpeed']);

      component.scrollToBottom(100, 10);
      expect(component.scrollbar.scrollToBottom).toHaveBeenCalledWith(10, 100);
    });
  });

  describe(`scrollToLeft`, () => {
    test(`should call the underlying implementation`, () => {
      component.scrollToLeft();
      expect(component.scrollbar.scrollToLeft).toHaveBeenCalledWith(undefined, component['scrollSpeed']);

      component.scrollToLeft(100, 10);
      expect(component.scrollbar.scrollToLeft).toHaveBeenCalledWith(10, 100);
    });
  });

  describe(`scrollToRight`, () => {
    test(`should call the underlying implementation`, () => {
      component.scrollToRight();
      expect(component.scrollbar.scrollToRight).toHaveBeenCalledWith(undefined, component['scrollSpeed']);

      component.scrollToRight(100, 10);
      expect(component.scrollbar.scrollToRight).toHaveBeenCalledWith(10, 100);
    });
  });

  describe(`scrollToTop`, () => {
    test(`should call the underlying implementation`, () => {
      component.scrollToTop();
      expect(component.scrollbar.scrollToTop).toHaveBeenCalledWith(undefined, component['scrollSpeed']);

      component.scrollToTop(100, 10);
      expect(component.scrollbar.scrollToTop).toHaveBeenCalledWith(10, 100);
    });
  });

  describe(`update`, () => {
    test(`should call the underlying implementation`, () => {
      component.update();
      expect(component.scrollbar.update).toHaveBeenCalled();
    });
  });
});
