import 'hammerjs';


const mock = () => {
  let storage: {[key: string]: any} = {};
  return {
    getItem: (key: string) => key in storage ? storage[key] : null,
    setItem: (key: string, value: any) => storage[key] = value || '',
    removeItem: (key: string) => delete storage[key],
    clear: () => storage = {},
  };
};

Object.defineProperty(window, 'localStorage', {value: mock()});
Object.defineProperty(window, 'sessionStorage', {value: mock()});
Object.defineProperty(window, 'CSS', {value: () => ({})});


/**
 * Patches for Material
 */
const WARN_SUPPRESSING_PATTERNS = [
/Could not find Angular Material core theme/,
/Could not find HammerJS/,
];
const warn = console.warn;
Object.defineProperty(console, 'warn', {
 value: (...params: string[]) => {
   if (!WARN_SUPPRESSING_PATTERNS.some((pattern) => pattern.test(params[0]))) {
     warn(...params);
   }
 },
});

Object.defineProperty(window, 'matchMedia', {
  value: () => (
    {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    }
  ),
});

Object.defineProperty(document.body.style, 'transform', {
  value: () =>
    ({
      enumerable: true,
      configurable: true,
    }),
});

/**
 * This allows us to test Angular animation states
 *
 * ISSUE: https://github.com/thymikee/jest-preset-angular/issues/170
 * Workaround: https://github.com/angular/angular/issues/24094
 */
 if (document.body.style.animation === undefined && CSSStyleDeclaration) {
   CSSStyleDeclaration.prototype.animation = '';
 }

 if (document.body.style['animation-name'] === undefined && CSSStyleDeclaration) {
   CSSStyleDeclaration.prototype['animation-name'] = '';
   CSSStyleDeclaration.prototype['animationName'] = '';
 }

 if (document.body.style['animation-duration'] === undefined && CSSStyleDeclaration) {
   CSSStyleDeclaration.prototype['animation-duration'] = '';
   CSSStyleDeclaration.prototype['animationDuration'] = '';
 }

 if (document.body.style['animation-play-state'] === undefined && CSSStyleDeclaration) {
   CSSStyleDeclaration.prototype['animation-play-state'] = '';
   CSSStyleDeclaration.prototype['animationPlayState'] = '';
 }

