import { Component } from '@angular/core';

@Component({
  selector: 'demo-link',
  template: `
    <ts-link
      [destination]="localDestination"
    >Foo Bar</ts-link>

    <br>
    <br>

    <ts-link
      [destination]="externalDestination"
      [isExternal]="external"
      color="warn"
    >Bing Baz</ts-link>
  `,
})
export class LinkComponent {
  localDestination = ['/components/copy'];
  externalDestination = `http://google.com`;
  external = true;
}
