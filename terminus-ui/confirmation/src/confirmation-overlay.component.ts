import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { TS_SPACING } from '@terminus/ui/spacing';
import { Subject } from 'rxjs';


/**
 * The confirmation overlay used by {@link TsConfirmationDirective}
 */
@Component({
  selector: 'ts-confirmation-overlay',
  styleUrls: ['./confirmation-overlay.component.scss'],
  templateUrl: './confirmation-overlay.component.html',
  host: { class: 'ts-confirmation' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsConfirmation',
})
export class TsConfirmationOverlayComponent {
  /**
   * Stream confirmation choices
   */
  public confirm: Subject<boolean> = new Subject<boolean>();

  /**
   * Define the space between the buttons
   */
  public gap: string = TS_SPACING.large[0];

  /**
   * Text for confirmation button
   */
  public confirmationButtonTxt: string | undefined;

  /**
   * Text for cancel button
   */
  public cancelButtonTxt: string | undefined;

  /**
   * Text for explanation
   */
  public explanationTxt: string | undefined;

}
