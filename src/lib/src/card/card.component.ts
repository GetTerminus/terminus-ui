import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

/**
 * The card UI Component
 *
 * @example
 * <ts-card
 *              centeredContent="true"
 *              hasInteraction="true"
 *              (clicked)="myMethod($event)
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

  @Input()
  public hasInteraction: boolean = false;

  @Output()
  clicked: EventEmitter<boolean> = new EventEmitter();

}
