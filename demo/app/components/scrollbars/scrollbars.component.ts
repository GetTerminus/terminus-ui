import {
  AfterContentChecked,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { TsScrollbarsComponent } from '@terminus/ui/scrollbars';


@Component({
  selector: 'demo-scrollbars',
  templateUrl: './scrollbars.component.html',
  styleUrls: ['./scrollbars.component.scss'],
})
export class ScrollbarsComponent implements AfterContentChecked {
  @ViewChild(TsScrollbarsComponent)
  public scrollbars!: TsScrollbarsComponent;

  isDisabled = false;
  nowrap = false;

  constructor(private elementRef: ElementRef) {}

  ngAfterContentChecked() {
    console.log('DEMO: geometry: ', this.scrollbars.geometry);
    console.log('DEMO: position: ', this.scrollbars.position);
    console.log('DEMO: is x-axis scrollable?: ', this.scrollbars.scrollable('x'));
    console.log('DEMO: is y-axis scrollable?: ', this.scrollbars.scrollable('y'));
  }

  scrollBottom() {
    this.scrollbars.scrollToBottom();
  }

  scrollLeft() {
    this.scrollbars.scrollToLeft();
  }

  scrollRight() {
    this.scrollbars.scrollToRight();
  }

  scrollTop() {
    this.scrollbars.scrollToTop();
  }

  scrollToElement() {
    this.scrollbars.scrollToElement('.p1');
  }

  myScrollDown(e) { console.log('DEMO: scrollDown: ', e); }
  myScrollLeft(e) { console.log('DEMO: scrollLeft: ', e); }
  myScrollRight(e) { console.log('DEMO: scrollRight: ', e); }
  myScrollUp(e) { console.log('DEMO: scrollUp: ', e); }

}
