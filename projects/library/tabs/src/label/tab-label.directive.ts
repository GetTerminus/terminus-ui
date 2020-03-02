import { CdkPortal } from '@angular/cdk/portal';
import { Directive } from '@angular/core';


/**
 * Used to flag tab labels for use with the portal directive
 */
@Directive({
  selector: '[tsTabLabel]',
  exportAs: 'tsTabLabel',
})
export class TsTabLabelDirective extends CdkPortal { }
