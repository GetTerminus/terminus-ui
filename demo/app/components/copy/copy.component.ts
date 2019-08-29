import { Component } from '@angular/core';
import { TsStyleThemeTypes } from '@terminus/ui/utilities';


@Component({
  selector: 'demo-copy',
  templateUrl: './copy.component.html',
})
export class CopyComponent {
  // eslint-disable-next-line max-len
  public fakeUrl = 'https://github.com/foo/bar/baz/bing/bang/boom/foo/bar/baz/bing/bang/boom/foo/bar/baz/bing/bang/boom/foo/bar/baz/bing/bang/boom/foo/bar/baz/bing/bang/boom/foo/bar/baz/bing/bang/boom';
  public canCopy = true;
  public format = 'standard';
  public theme: TsStyleThemeTypes = 'primary';
  public themes: TsStyleThemeTypes[] = ['primary', 'accent', 'warn'];
}
