export const getSortDuplicateSortableIdError =
  (id: string): Error => Error(`Cannot have two TsSortables with the same id (${id}).`);

export const getSortHeaderNotContainedWithinSortError =
  (): Error => Error(`TsSortHeader must be placed within a parent element with the TsSort directive.`);

export const getSortHeaderMissingIdError =
  (): Error => Error(`TsSortHeader must be provided with a unique id.`);

export const getSortInvalidDirectionError =
  (direction: string): Error => Error(`${direction} is not a valid sort direction ('asc' or 'desc').`);
