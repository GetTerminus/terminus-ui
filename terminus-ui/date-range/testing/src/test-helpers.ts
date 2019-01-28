import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';




export function createDateRangeGroup(startDate: null | Date = null, endDate: null | Date = null): FormGroup {
  const formBuilder = new FormBuilder();

  return formBuilder.group({
    startDate: [
      startDate,
      [Validators.required],
    ],
    endDate: [
      endDate,
      [Validators.required],
    ],
  });
}
