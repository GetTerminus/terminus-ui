import { Component } from '@angular/core';


@Component({
  selector: 'demo-card',
  template: `
    <label>
      Supports interaction:
      <input type="checkbox" [(ngModel)]="supportsInteraction">
    </label>


    <label>
      Centered content:
      <input type="checkbox" [(ngModel)]="centered">
    </label>

    <hr>
    <br>

    <ts-card
      [supportsInteraction]="supportsInteraction"
      [centeredContent]="centered"
      style="height: 200px;"
    >
      Standard card

      <ng-container *ngIf="centered">
        (centered content)
      </ng-container>

      <ng-container *ngIf="supportsInteraction">
        (with interaction)
      </ng-container>
    </ts-card>

    <hr>
    <br>

    <ts-card
      supportsInteraction="true"
      centeredContent="true"
      style="height: 300px;"
      [utilityMenuTemplate]="myTemplate"
    >
      Standard card with utility menu
    </ts-card>

    <ng-template #myTemplate>
      <ts-menu
        triggerType="utility"
        menuPositionX="before"
        [menuItemsTemplate]="utilityButtons"
      ></ts-menu>


      <ng-template #utilityButtons>
        <ts-link [destination]="['foo/', 'bar/']">
          My link
        </ts-link>
      </ng-template>
    </ng-template>
  `,
})
export class CardComponent {
  supportsInteraction = false;
  centered = false;

}
