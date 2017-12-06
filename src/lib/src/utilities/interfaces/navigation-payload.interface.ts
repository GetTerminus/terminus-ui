import { TsNavigationItem } from './navigation-item.interface';


/**
 * Define the expected response from the {@link TsNavigationComponent} emitter
 */
export interface TsNavigationPayload {
  /**
   * The mouse click event
   */
  event: MouseEvent;

  /**
   * The selected item
   */
  action: {
    type: string;
  };
}
