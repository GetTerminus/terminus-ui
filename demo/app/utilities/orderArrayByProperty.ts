/**
 * Order an array alphabetically by property
 *
 * @param {Array} items The array of objects to sort
 * @param {String} property The property to sort by
 * @param {Boolean} isDescending A flag determining if the array should be sorted ascending or
 * descending
 * @return {Array} sortedArray The sorted array
 */
export function orderArrayByProperty(items: any[], property: string, isDescending: boolean = true): any[] {
  return items.sort((a: any, b: any) => {
    const nonAlphaRegex = /\W+/g;

    // Check for existence and lowercase
    const aProp: string | null = a[property] ? a[property].toLowerCase().replace(nonAlphaRegex, '') : null;
    const bProp: string | null = b[property] ? b[property].toLowerCase().replace(nonAlphaRegex, '') : null;

    // Sort ascending or descending
    const aIsFirstReturn = isDescending ? -1 : 1;
    const bIsFirstReturn = isDescending ? 1 : -1;

    if (!aProp || !bProp) {
      return 0;
    } else if (aProp < bProp) {
      // Sort ascending
      return aIsFirstReturn;
    } else if (aProp > bProp) {
      // Sort descending
      return bIsFirstReturn;
    } else {
      // Do not sort
      return 0;
    }
  });
}
