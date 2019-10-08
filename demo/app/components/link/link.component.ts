import { Component } from '@angular/core';


@Component({
  selector: 'demo-link',
  templateUrl: './link.component.html',
})
export class LinkComponent {
  localDestination = ['/components/copy'];
  emailDestination = 'mailto:support@terminus.com';
  phoneDestination = 'tel: 1800-423-4562';
  externalDestination = `http://google.com`;
  external = true;
}
