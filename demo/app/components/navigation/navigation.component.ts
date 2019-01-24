import { Component } from '@angular/core';
import {
  Observable,
  of,
} from 'rxjs';
import {
  TsNavigationItem,
  TsNavigationPayload,
} from '@terminus/ui/navigation';


const NAV_ITEMS_MOCK: TsNavigationItem[] = [
  {
    name: '1 Components',
    destination: '/components',
    alwaysHidden: false,
  },
  {
    name: '2 Nav',
    destination: '/components/navigation',
    alwaysHidden: false,
  },
  {
    name: '3 Buttons',
    destination: ['/components/button'],
    alwaysHidden: false,
  },
  {
    name: '4 Action',
    action: {
      type: 'Do:thing',
    },
    alwaysHidden: false,
  },
  {
    name: '5 Menus',
    destination: ['/components/menu'],
    alwaysHidden: false,
  },
  {
    name: '7 External',
    destination: 'https://google.com',
    alwaysHidden: true,
  },
  {
    name: '8 Hidden',
    action: {
      type: 'Do:another:thing',
    },
    alwaysHidden: true,
  },
];

const NEW_NAV_ITEM: TsNavigationItem = {
  name: '0 Foo',
  action: {
    type: 'my:action',
  },
  alwaysHidden: false,
};


@Component({
  selector: 'demo-navigation',
  styleUrls: ['./navigation.component.scss'],
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  public currentUser$: Observable<any> = of({
    id: 1,
    email: 'max@roadwarrior.com',
    firstname: 'Max',
    lastname: 'Rockatansky',
    fullName: 'Max Rockatansky',
  });
  public navigationItems$: Observable<any> = of(NAV_ITEMS_MOCK);
  public myMessage = 'Hello, this message is 37 characters.';


  /**
   * Trigger the action defined for the navigation item
   *
   * @param {Object} item The navigation item
   */
  triggerAction(payload: TsNavigationPayload): void {
    console.log('DEMO: triggerAction: ', payload);

    if (payload.event.metaKey) {
      // open the link in a new window
      console.log('DEMO: meta key was used');
    } else {
      // redirect in app
      console.log('DEMO: meta key was NOT used');
    }

  }

  updateNav(): void {
    const newNav = NAV_ITEMS_MOCK.slice(0);
    newNav.unshift(NEW_NAV_ITEM);
    this.navigationItems$ = of(newNav);
  }
}
