import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';

/**
 * The drawer footer UI Component
 *
 * @example
 * <ts-drawer-footer>
 *              THIS IS MY FOOTER
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
