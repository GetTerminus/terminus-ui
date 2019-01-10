import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';

import { TS_SPACING } from './../spacing/spacing.constant';


/**
 * The confirmation modal used by {@link TsConfirmationDirective}
 */
@Component({
  selector: 'ts-confirmation-modal',
  styleUrls: ['./confirmation-modal.component.scss'],
  templateUrl: './confirmation-modal.component.html',
  host: {
    class: 'ts-confirmation',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsConfirmation',
})
export class TsConfirmationModalComponent {
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
