import {
  Component,
  OnInit,
} from '@angular/core';
import {
  TestBed,
  ComponentFixture,
} from '@angular/core/testing';


@Component({
  selector: 'ts-test-host',
  template: `<span>PlaceHolder HTML to be Replaced</span>`,
})
export class TestHostComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}


/*
 * Custom Helper function to quickly create a `fixture` instance based on
 * the 'TestLayoutComponent' class
 */
export function createTestComponent(template: string): ComponentFixture<TestHostComponent> {
  return TestBed
    .overrideComponent(TestHostComponent, {set: {template: template}})
    .createComponent(TestHostComponent);
}
