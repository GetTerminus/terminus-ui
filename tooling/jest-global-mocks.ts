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
