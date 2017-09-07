import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/pairs';
import 'rxjs/add/observable/from';

import { TsNavigationItem, TsNavigationPayload } from '@terminus/ui';


const NAV_ITEMS_MOCK: TsNavigationItem[] = [
  {
    name: 'Components',
    action: 'navigate',
    destination: ['/components'],
    onlyHidden: false,
  },
  {
    name: 'Buttons',
    action: 'navigate',
    destination: ['/components/button'],
    onlyHidden: false,
  },
  {
    name: 'Menus',
    action: 'navigate',
    destination: ['/components/menu'],
    onlyHidden: false,
  },
  {
    name: 'Fake Link',
    action: 'navigate',
    destination: ['/creatives'],
    onlyHidden: false,
  },
  {
    name: 'Fake Link',
    action: 'navigate',
    destination: ['/settings'],
    onlyHidden: false,
  },
  {
    name: 'External',
    action: 'navigate',
    destination: 'https://google.com',
    onlyHidden: false,
  },
  {
    name: 'Action: Log Out',
    action: 'log-out',
    onlyHidden: false,
  },
  {
    name: 'Fake Link',
    action: 'navigate',
    destination: ['/admin'],
    onlyHidden: true,
  },
  {
    name: 'Action: Log In As',
    action: 'log-in-as',
    onlyHidden: true,
    isDisabled: true,
  },
];



@Component({
  selector: 'demo-navigation',
  styleUrls: ['./navigation.component.scss'],
  template: `
    <div class="outer" fxLayout="row" fxLayoutAlign="space-between stretch">
      <div fxLayout="row" fxLayoutAlign="center center" fxFlex="none">
        <span>
          Logo
        </span>
      </div>

      <ts-navigation
        [items]="navigationItems$ | async"
        [user]="currentUser$ | async"
        [welcomeMessage]="myMessage"
        (itemSelected)="triggerAction($event)"
      ></ts-navigation>
    </div>
  `,
})
export class NavigationComponent implements OnInit {
  public currentUser$: Observable<any> = Observable.from([{
    id: 1,
    email: 'max@roadwarrior.com',
    firstname: 'Max',
    lastname: 'Rockatansky',
    fullName: 'Max Rockatansky',
  }]);
  public navigationItems$: Observable<any> = Observable.from([NAV_ITEMS_MOCK]);
  public myMessage = 'Hello dear';


  ngOnInit(): void {
    /*
     *this.currentUser$.subscribe((v: any) => {
     *  console.log('currentUser$: ', v);
     *})
     */
  }


  /**
   * Trigger the action defined for the navigation item
   *
   * @param {Object} item The navigation item
   */
  triggerAction(payload: TsNavigationPayload): void {
    console.log('triggerAction: ', payload);

    if (payload.event.metaKey) {
      // open the link in a new window
      console.log('meta key was used');
    } else {
      // redirect in app
      console.log('meta key was NOT used');
    }

  }

}
