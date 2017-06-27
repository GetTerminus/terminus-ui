import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'demo-button',
  template: `
    <ts-input [ngModel]="myModel" [label]="myLabel"></ts-input>
  `,
})
export class DemoInputComponent implements OnInit {
  myModel = '';
  label = 'My Input';

  ngOnInit() {
  }

}
