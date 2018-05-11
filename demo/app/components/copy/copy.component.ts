import { Component } from '@angular/core';


@Component({
  selector: 'demo-copy',
  templateUrl: './copy.component.html',
})
export class CopyComponent {
  // tslint:disable: max-line-length
  fakeUrl = 'https://github.com/foo/bar/baz/bing/bang/boom/foo/bar/baz/bing/bang/boom/foo/bar/baz/bing/bang/boom/foo/bar/baz/bing/bang/boom/foo/bar/baz/bing/bang/boom/foo/bar/baz/bing/bang/boom';
  // tslint:enable: max-line-length
  canCopy = false;
}
