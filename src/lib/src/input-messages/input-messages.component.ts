import { Component, Input } from '@angular/core';

/**
 * A presentational component to render input validation messages
 *
 * @example
 * <t-input-messages
 *             [messages]="myMessages"
 * ></t-input-messages>
 */
@Component({
  selector: 'ts-input-messages',
  templateUrl: './input-messages.component.html',
  styleUrls: ['./input-messages.component.scss'],
})
export class TsInputMessagesComponent {
  /**
   * Accept an array of messages
   */
  @Input() messages: Array<string>;
}

