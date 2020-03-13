import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';


/**
 * The footer component for the {@link TsDrawerComponent}
 *
 * @example
 * <ts-drawer-footer>
 *              My content.
 * </ts-drawer-footer>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/drawer</example-url>
 */
@Component({
  selector: 'ts-drawer-footer',
  templateUrl: './drawer-header-footer.component.html',
  styleUrls: ['./drawer.component.scss'],
  host: { class: 'ts-drawer-footer' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsDrawerFooter',
})
export class TsDrawerFooterComponent { }
