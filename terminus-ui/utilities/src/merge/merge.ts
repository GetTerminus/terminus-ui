/**
 * Merge two objects.
 *
 * @example
 * const merged = merge(objA, objB);
 *
 * @param obj1 - The first object to merge
 * @param obj2 - The second object to merge
 * @return A new object
 */
export function merge(obj1: object, obj2: object): object {
  const freshObject: object = {...obj1};

  for (const n in obj2) {
    if (typeof freshObject[n] !== 'object') {
      freshObject[n] = obj2[n];
    } else if (typeof obj2[n] === 'object') {
      freshObject[n] = merge(freshObject[n], obj2[n]);
    }
  }

  return freshObject;
}
