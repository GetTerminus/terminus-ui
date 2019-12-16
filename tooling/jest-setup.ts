import 'jest-preset-angular';
import './jest-global-mocks';

global.window.document.createRange = function createRange() {
  return {
    setEnd: () => {},
    setStart: () => {},
    getBoundingClientRect: () => {
      return { right: 0 };
    },
    getClientRects: () => [],
    commonAncestorContainer: document.createElement('div'),
  };
};
