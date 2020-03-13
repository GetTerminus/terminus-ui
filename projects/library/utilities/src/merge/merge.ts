/**
 * Merge two objects.
 *
 * @example
 * const merged = merge(objA, objB);
 *
 * @param obj1 - The first object to merge
 * @param obj2 - The second object to merge
 * @returns A new object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function merge(obj1: Record<string, any>, obj2: Record<string, any>): Record<string, any> {
  const freshObject: object = { ...obj1 };

  for (const n in obj2) {
    if (typeof freshObject[n] !== 'object') {
      freshObject[n] = obj2[n];
    } else if (typeof obj2[n] === 'object') {
      freshObject[n] = merge(freshObject[n], obj2[n]);
    }
  }

  return freshObject;
}
