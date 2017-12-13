/**
 * Return an object containing arrays split by property
 *
 * @example
 * const arr = [{a: 'foo', b: 1}, {a: 'bar', b: 6}, {a: 'foo', b: 6}];
 * const result = groupBy(arr, 'a');
 * // Return is `{foo: [{a: 'foo', b: 1}, {a: 'foo', b: 6}], bar: [{a: 'bar', b: 6}]}`
 *
 * @param array - The array to split
 * @param property - The object property to split by
 * @return An object containing arrays separated by property value
 */
export function groupBy<T, K extends (keyof T & (number | string))>(array: T[], key: K):
  { [id: string]: T[] } {

  const initalValue: { [id: string]: T[] } = {};

  return array.reduce((accumulator, x) => {
    const idx: string = x[key] as any;

    // Create an array for the property if one does not exist
    if (!accumulator[idx]) {
      accumulator[idx] = [];
    }

    // Add the item to the property array
    accumulator[idx].push(x);

    return accumulator;
  }, initalValue);
}
