import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { queryFor } from './queryFor';
import { createTestComponent } from './createTestComponent';

/**
 * Create component instance using custom template, the query for the native DOM node
 * based on the query selector
 */
export function expectDomForQuery(template: string, selector: string): any {
  const fixture = createTestComponent(template);
  fixture.detectChanges();

  // Return response of `expect(...)`
  return expect(queryFor(fixture, selector).nativeElement);
};
