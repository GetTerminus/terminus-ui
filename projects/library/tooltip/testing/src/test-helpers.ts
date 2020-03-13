import { ComponentFixture } from '@angular/core/testing';

/**
 * Helper function to display the tooltip
 *
 * @param fixture - the fixture with a tooltip
 */
export function getTooltipText(fixture: ComponentFixture<any>): string | null {
  fixture.componentInstance.tooltipComponent.showTooltip();
  fixture.detectChanges();
  const matTooltipEl = document.querySelector('.mat-tooltip');
  return matTooltipEl!.textContent;
}
