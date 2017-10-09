import { Component } from '@angular/core';


/**
 * The loading overlay component. Implemented by {@link TsLoadingOverlayDirective}
 *
 * #### QA CSS CLASSES
 * - `qa-loading-overlay`: Placed on the div overlay containing the loading spinner
 *
 * @example
 * See {@link TsLoadingOverlayDirective}
 */
@Component({
  selector: 'ts-loading-overlay',
  styleUrls: ['./loading-overlay.component.scss'],
  template: `
    <div class="c-loading-overlay qa-loading-overlay">
      <svg
        class="c-loading-overlay__spinner"
        width="{{ size }}px"
        height="{{ size }}px"
        viewBox="0 0 {{ viewBoxSize }} {{ viewBoxSize }}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="path"
          fill="none"
          stroke-width="{{ strokeWidth }}"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
    </div>
  `,
})
export class TsLoadingOverlayComponent {
  public size: number = 65;
  public viewBoxSize: number = this.size + 1;
  public strokeWidth: number = 6;
}
