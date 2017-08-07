import { Component } from '@angular/core';

@Component({
  selector: 'demo-link',
  template: `
    <ts-link
      [destination]="localDestination"
      [text]="linkText1"
    ></ts-link>

    <br>
    <br>

    <ts-link
      [destination]="externalDestination"
      [isExternal]="external"
      [text]="linkText2"
      color="warn"
    >Content 2</ts-link>
  `,
})
export class LinkComponent {
  localDestination = ['/components/copy'];
  linkText1 = 'My link';

  externalDestination = `http://google.com`;
  external = true;
  linkText2 = 'My external link';
}
