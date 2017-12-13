/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered. The
 * function will be called after it stops being called for N milliseconds.
 *
 * @param func - The function to call after the debounce period
 * @param wait - The length of time to wait between calls (ms)
 * @return The debounced function
 */
export function debounce(func: Function, wait: number): Function {
  let timer: number | null = null;

  return function() {
    const context = this;
    const args = arguments;

    clearTimeout(timer);

    timer = window.setTimeout(function() {
      func.apply(context, args);
    }, wait);
  };
};
