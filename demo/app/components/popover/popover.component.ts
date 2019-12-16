import {
  Component,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  TsPopoverComponent,
  TsPopoverPosition,
} from '@terminus/ui/popover';

@Component({
  selector: 'demo-popover',
  templateUrl: './popover.component.html',
})
export class PopoverComponent {
  public myform = new FormControl('bottom');
  public positions = ['bottom', 'top', 'left', 'right'];
  public myId = 'custom-id';
  example1select: TsPopoverPosition = 'right';
  public popoverOnShown(event) {
    console.log('popper on shown emitted event: ', event);
  }
  public popoverOnHidden(event) {
    console.log('popover on hidden emitted event: ', event);
  }

  constructor(private elem: ElementRef) {
  }

  public change() {
    setTimeout(() => {
      this.elem.nativeElement.querySelector('.ts-popover-trigger').dispatchEvent(new Event('click'));
    }, 100);

  }
}
