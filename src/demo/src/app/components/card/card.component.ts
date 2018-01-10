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
      [utilityMenuTemplate]="myTemplate"
      aspectRatio="4:3"
    >
      Standard card with utility menu and aspect ratio
    </ts-card>

    <ng-template #myTemplate>
      <ts-menu
        triggerType="utility"
        menuPositionX="before"
        [menuItemsTemplate]="utilityButtons"
      ></ts-menu>


      <ng-template #utilityButtons>
        <ts-button>
          My menu item
        </ts-button>
      </ng-template>
    </ng-template>

    <hr>
    <br>

    <ts-card aspectRatio="16:9">
      16:9 aspect ratio
    </ts-card>
  `,
})
export class CardComponent {
  supportsInteraction = false;
  centered = false;
}
