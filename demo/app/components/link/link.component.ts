import { Component } from '@angular/core';


@Component({
  selector: 'demo-link',
  templateUrl: './link.component.html',
})
export class LinkComponent {
  localDestination: string[] = ['/components/copy'];
  externalDestination: string = `http://google.com`;
  external = true;
}
