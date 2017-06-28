import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-button',
  template: `
    <ts-button [buttonStyle]="style" [isDisabled]="isDisabled">Click Me</ts-button>
  `,
})
export class DemoButtonComponent implements OnInit {
  style = 'accent';
  isDisabled = false;

  ngOnInit() {
  }

}


