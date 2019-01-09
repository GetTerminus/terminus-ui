import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatChip } from '@angular/material/chips';

import { TsSelectOptgroupComponent } from './../select.module';
import { TsSelectComponent } from './../select.component';
import { TsSelectOptionComponent } from './../option/option.component';




export function getSelectInstance(fixture: ComponentFixture<any>): TsSelectComponent {
  return fixture.debugElement.query(By.css('ts-select')).componentInstance;
}

export function getSelectElement(fixture: ComponentFixture<any>): HTMLElement {
  const instance = getSelectInstance(fixture);
  return instance['elementRef'].nativeElement as HTMLElement;
}

export function getSelectTriggerElement(fixture: ComponentFixture<any>): HTMLElement {
  return fixture.debugElement.query(By.css('.ts-select-trigger')).nativeElement as HTMLElement;
}

export function getToggleAllElement(fixture: ComponentFixture<any>): HTMLElement {
  return fixture.debugElement.query(By.css('.ts-select-panel__toggle-all')).nativeElement as HTMLElement;
}

export function getPanelElement(fixture: ComponentFixture<any>): HTMLElement {
  return fixture.debugElement.query(By.css('.ts-select-panel')).nativeElement as HTMLElement;
}

export function getAllOptionInstances(fixture: ComponentFixture<any>): TsSelectOptionComponent[] {
  const instance = getSelectInstance(fixture);
  return instance.options.toArray();
}

export function getOptionInstance(fixture: ComponentFixture<any>, index = 0): TsSelectOptionComponent | null {
  const options = getAllOptionInstances(fixture);
  return options[index] ? options[index] : null;
}

export function getOptionElement(fixture: ComponentFixture<any>, index = 0): HTMLElement | null {
  const option = getOptionInstance(fixture, index);
  return option ? option.elementRef.nativeElement as HTMLElement : null;
}

export function getAllOptgroups(fixture: ComponentFixture<any>): TsSelectOptgroupComponent[] {
  return fixture.debugElement.queryAll(By.css('ts-select-optgroup')).map((i) => i.componentInstance);
}

export function getOptgroup(fixture: ComponentFixture<any>, index = 0): TsSelectOptgroupComponent | null {
  const groups = getAllOptgroups(fixture);
  return groups && groups[index] ? groups[index] : null;
}

export function getOptgroupElement(fixture: ComponentFixture<any>, index = 0): HTMLElement | null {
  const group = getOptgroup(fixture, index);
  return group ? group['elementRef'].nativeElement as HTMLElement : null;
}

export function getAutocompleteInput(fixture: ComponentFixture<any>): HTMLInputElement {
  return fixture.debugElement.query(By.css('.ts-select__autocomplete-input')).nativeElement as HTMLInputElement;
}

export function getAllChipInstances(fixture: ComponentFixture<any>): MatChip[] | null {
  const instance = getSelectInstance(fixture);
  const chipList = instance.chipList;
  return chipList ? chipList.chips.toArray() : null;
}

export function getChipInstance(fixture: ComponentFixture<any>, index = 0): MatChip | null {
  const chips = getAllChipInstances(fixture);
  return chips && chips[index] ? chips[index] : null;
}

export function getChipElement(fixture: ComponentFixture<any>, index = 0): HTMLElement | null {
  const chip = getChipInstance(fixture, index);
  return chip ? chip._elementRef.nativeElement : null;
}

export function getFilterInputElement(fixture: ComponentFixture<any>): HTMLInputElement {
  return fixture.debugElement.query(By.css('.ts-select-panel__filter-input .c-input__text')).nativeElement as HTMLInputElement;
}

