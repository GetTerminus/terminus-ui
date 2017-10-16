import {
  Component,
  Input,
  Output,
} from '@angular/core';

/**
 * The card UI Component
 *
 * @example
 * <ts-card
 *              centeredContent="true"
 * >My card!</ts-card>
 */
@Component({
  selector: 'ts-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class TsCardComponent {

  @Input()
  public centeredContent: boolean = false;

}
