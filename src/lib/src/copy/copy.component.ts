import {
  Component,
  Input,
  Output,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';

/**
 * TODO: Fill this section out
 * This is the TsCopyComponent UI Component
 *
 * @example
 * <copy
 *              item="Value"
 * ></copy>
 */
@Component({
  selector: 'ts-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss'],
})
export class TsCopyComponent implements OnInit {
  /**
   * Define the copy icon
   */
  private icon: string = 'content_copy';

  /**
   * Internal flag to track if the contents have been selected
   */
  private hasSelected: boolean = false;

  /**
   * Store a reference to the clipboard
   */
  private clipboard: any;

  /**
   * Define access to the wrapper around the content to be copied
   */
  @ViewChild('content') content: ElementRef;

  /**
   * Define if the copy icon should be included
   */
  @Input() showIcon: boolean = true;

  /**
   * Define if the initial click should select the contents
   */
  @Input() disableInitialSelection: boolean = false;



  ngOnInit(): void {
  }


}
