import { Component } from '@angular/core';


@Component({
  selector: 'demo-card',
  template: `
    <ts-card>My card!</ts-card>

    <br>
    <br>

    <ts-card style="height: 500px" [centeredContent]="isCentered">
      Ooooh...
      <br>
      <br>
      My centered card....
    </ts-card>

    <br>
    <br>

    <ts-card>A final card...</ts-card>
  `,
})
export class CardComponent {
  isCentered = true;

}
