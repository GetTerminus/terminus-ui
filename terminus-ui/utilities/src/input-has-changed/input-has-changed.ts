import { SimpleChanges } from '@angular/core';


/**
 * Helper function to determine if a specific value has changed
 *
 * @param changes - The object of changes
 * @param key - The object key in question
 * @return True if the value has changed
 */
export function inputHasChanged(changes: SimpleChanges, key: string): boolean | undefined {
  if (!changes || !key) {
    return undefined;
  }

  if (changes[key] && (changes[key].currentValue !== changes[key].previousValue)) {
    return true;
  }

  return false;
}
