import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DebugElement } from '@angular/core';
import { TsInputComponent } from '@terminus/ui/input';




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


export function getDebugRangeInputs(fixture: ComponentFixture<any>): DebugElement[] {
  return fixture.debugElement.queryAll(By.css('ts-input'));
}

export function getRangeInputInstances(fixture: ComponentFixture<any>): TsInputComponent[] {
  return fixture.debugElement.queryAll(By.css('ts-input')).map((v) => {
    return v.componentInstance;
  });
}

export function getRangeInputElements(fixture: ComponentFixture<any>): HTMLInputElement[] {
  return fixture.debugElement.queryAll(By.css('ts-input')).map((v) => {
    return v.nativeElement;
  });
}
