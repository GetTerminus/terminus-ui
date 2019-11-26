import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
} from '@angular/core';

/**
 * The drawer header UI Component
 *
 * @example
 * <ts-drawer-header>
 *              THIS IS MY HEADER
 * </ts-drawer-header>
 *
 * <example-url>https://getterminus.github.io/ui-demos-release/components/drawer</example-url>
 */
@Component({
  selector: 'ts-drawer-header',
  templateUrl: './drawer-header-footer.component.html',
  styleUrls: ['./drawer.component.scss'],
  host: { class: 'ts-drawer-header' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'tsDrawerHeader',
})
export class TsDrawerHeaderComponent { }
