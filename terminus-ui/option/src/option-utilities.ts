import { QueryList } from '@angular/core';

import { TsOptgroupComponent } from './optgroup.component';
import { TsOptionComponent } from './option.component';


/**
 * Determine if all options are selected
 *
 * @param options - The list of options
 * @return If all are selected
 */
export function allOptionsAreSelected(options: QueryList<TsOptionComponent>): boolean {
  if (!options || options.toArray().length < 1) {
    return false;
  }

  // Return false if at least one options is not selected
  return !options.toArray().some((option) => !option.selected);
}


/**
 * Counts the amount of option group labels that precede the specified option
 *
 * @param optionIndex - Index of the option at which to start counting
 * @param options - Flat list of all of the options
 * @param optionGroups - Flat list of all of the option groups
 * @return The number of labels
 */
export function countGroupLabelsBeforeOption(
  optionIndex: number,
  options: QueryList<TsOptionComponent>,
  optionGroups: QueryList<TsOptgroupComponent>,
): number {

  if (optionGroups.length) {
    const optionsArray = options.toArray();
    const groups = optionGroups.toArray();
    let groupCounter = 0;

    for (let i = 0; i < optionIndex + 1; i++) {
      // istanbul ignore else
      if (optionsArray[i].group && optionsArray[i].group === groups[groupCounter]) {
        groupCounter++;
      }
    }

    return groupCounter;
  }

  return 0;
}


/**
 * Determine the position to scroll a panel in order for an option to be in view
 *
 * @param optionIndex - Index of the option to be scrolled into view
 * @param optionHeight - Height of the options
 * @param currentScrollPosition - Current scroll position of the panel
 * @param panelHeight - Height of the panel
 * @return The scroll position
 */
export function getOptionScrollPosition(
  optionIndex: number,
  optionHeight: number,
  currentScrollPosition: number,
  panelHeight: number,
): number {
  const optionOffset = optionIndex * optionHeight;

  if (optionOffset < currentScrollPosition) {
    return optionOffset;
  }

  if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
    return Math.max(0, optionOffset - panelHeight + optionHeight);
  }

  return currentScrollPosition;
}


/**
 * Determine if one or more options are selected but not all
 *
 * @param options - The list of options
 * @return If some are selected
 */
export function someOptionsAreSelected(options: QueryList<TsOptionComponent>): boolean {
  if (!options || options.toArray().length < 1) {
    return false;
  }
  const someSelected = options.toArray().some((option) => option.selected);
  const allSelected = allOptionsAreSelected(options);

  // Return true if at least one option is selected but not all
  return someSelected && !allSelected;
}


/**
 * Toggle the selected state of all options
 *
 * If at least one option is selected this will deselect all selected options.
 * If no options are selected this will select all options.
 *
 * @param options - The list of options
 */
export function toggleAllOptions(options: QueryList<TsOptionComponent>): void {
  if (!options || options.toArray().length < 1) {
    return;
  }
  const optionsArray = options.toArray();
  // If at least one option is selected, we should deselect all
  const shouldDeselectAll = options.some((option) => option.selected);

  for (const option of optionsArray) {
    // If it is selected and should be deselected
    if (shouldDeselectAll && option.selected && !option.isDisabled) {
      option.deselect();
    }

    if (!shouldDeselectAll && !option.selected && !option.isDisabled) {
      option.select();
    }
  }
}
