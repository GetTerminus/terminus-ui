export function getSortDuplicateSortableIdError(id: string): Error {
  return Error(`Cannot have two TsSortables with the same id (${id}).`);
}

export function getSortHeaderNotContainedWithinSortError(): Error {
  return Error(`TsSortHeader must be placed within a parent element with the TsSort directive.`);
}

export function getSortHeaderMissingIdError(): Error {
  return Error(`TsSortHeader must be provided with a unique id.`);
}

export function getSortInvalidDirectionError(direction: string): Error {
  return Error(`${direction} is not a valid sort direction ('asc' or 'desc').`);
}
