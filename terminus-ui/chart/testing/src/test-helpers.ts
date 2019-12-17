import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TsChartComponent } from '@terminus/ui/chart';


/**
 * Get the DebugElement for {@link TsChartComponent}
 *
 * @param fixture - The component fixture
 * @return The DebugElement
 */
export function getChartDebugElement(fixture: ComponentFixture<any>): DebugElement {
  return fixture.debugElement.query(By.directive(TsChartComponent));
}

/**
 * Get the component instance for a {@link TsChartComponent}
 *
 * @param fixture - The component fixture
 * @return The instance
 */
export function getChartInstance(fixture: ComponentFixture<any>): TsChartComponent {
  const debugElement = getChartDebugElement(fixture);
  return debugElement.componentInstance;
}
