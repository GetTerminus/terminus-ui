/**
 * Return an object containing arrays split by property
 *
 * @param {Array} array The array to split
 * @param {String} property The object property to split by
 * @return {Object} An object containing arrays separated by property value
 */
export function groupBy(array: any[], property: string) {

  return array.reduce((accumulator, x) => {
    // Create an array for the property if one does not exist
    if (!accumulator[x[property]]) {
      accumulator[x[property]] = [];
    }

    // Add the item to the property array
    accumulator[x[property]].push(x);

    return accumulator;
  }, {});

}
