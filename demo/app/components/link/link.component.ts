import { Component } from '@angular/core';


@Component({
  selector: 'demo-link',
  templateUrl: './link.component.html',
})
export class LinkComponent {
  localDestination = ['/components/copy'];
  externalDestination = `http://google.com`;
  external = true;
}
