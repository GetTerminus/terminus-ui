import { Type } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KEYS } from '@terminus/ngx-tools/keycodes';
import {
  createComponent as createComponentInner,
  createFakeEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  typeInElement,
} from '@terminus/ngx-tools/testing';
import * as testComponents from '@terminus/ui/autocomplete/testing';
// eslint-disable-next-line no-duplicate-imports
import {
  getAllChipInstances,
  getAutocompleteElement,
  getAutocompleteInput,
  getAutocompleteInstance,
  getAutocompleteTriggerElement,
  getChipElement,
  getOptionElement,
  getOptionInstance,
} from '@terminus/ui/autocomplete/testing';
import { TsOptionModule } from '@terminus/ui/option';
import { getValidationMessageElement } from '@terminus/ui/validation-messages/testing';

import {
  TsAutocompleteModule,
  TsAutocompletePanelComponent,
  TsAutocompletePanelSelectedEvent,
} from './autocomplete.module';

function createComponent<T>(component: Type<T>): ComponentFixture<T> {
  const moduleImports = [
    FormsModule,
    ReactiveFormsModule,
    TsAutocompleteModule,
    TsOptionModule,
    NoopAnimationsModule,
  ];

  return createComponentInner(component, undefined, moduleImports);
}


describe(`TsAutocompleteComponent`, function() {

  test(`should exist`, function() {
    const fixture = createComponent(testComponents.Autocomplete);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.ts-autocomplete'))).toBeTruthy();
  });

});
