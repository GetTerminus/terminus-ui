import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';


/**
 * The loading overlay component. Implemented by {@link TsLoadingOverlayDirective}
 *
 * @example
 * See {@link TsLoadingOverlayDirective}
 */
@Component({
  selector: 'ts-loading-overlay',
  styleUrls: ['./loading-overlay.component.scss'],
  host: { class: 'ts-loading-overlay' },
  templateUrl: './loading-overlay.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsLoadingOverlay',
})
export class TsLoadingOverlayComponent {}
