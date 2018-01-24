import { Component } from '@angular/core';


@Component({
  selector: 'demo-menu',
  template: `
    <label>
      Disabled:
      <input type="checkbox" [(ngModel)]="disabled"/>
    </label>

    <hr>

    <div>
      <ts-menu
        [theme]="myTheme"
        [isDisabled]="disabled"
        [menuItemsTemplate]="myTemplate"
      >
        Select Item
      </ts-menu>
    </div>

    <div fxLayout="row" fxLayoutAlign="end center">
      <ts-menu
        [theme]="myTheme"
        triggerType="utility"
        [isDisabled]="disabled"
        [menuItemsTemplate]="myTemplate"
      ></ts-menu>
    </div>

    <ng-template #myTemplate>
      <ts-button (click)="customItemSelected('yup')">
        Roger, Roger.
      </ts-button>

      <ts-button (click)="customItemSelected('nope')">
        Don't call me Shirley.
      </ts-button>

      <ts-link [destination]="'foo/'">
        A tasty link
      </ts-link>

      <ts-button (click)="customItemSelected('nope')">
        And a final button
      </ts-button>
    </ng-template>
  `,
})
export class MenuComponent {
  disabled = false;
  myTheme = 'primary';


  customItemSelected(item: any): void {
    console.log('Item selected: ', item);
  }

}
