import { Injectable } from '@angular/core';
import { TsWindowService } from '@terminus/ngx-tools/browser';


@Injectable()
export class TsDropProtectionService {
  private hasProtection = false;

  constructor(
    private windowService: TsWindowService,
  ) { }

  /**
   * Add drop protection
   */
  public add(): void {
    if (!this.hasProtection) {
      this.windowService.nativeWindow.addEventListener('dragover', this.prevent, false);
      this.windowService.nativeWindow.addEventListener('drop', this.prevent, false);
      this.hasProtection = true;
    }
  }

  /**
   * Remove drop protection
   */
  public remove(): void {
    if (this.hasProtection) {
      this.windowService.nativeWindow.removeEventListener('dragover', this.prevent, false);
      this.windowService.nativeWindow.removeEventListener('drop', this.prevent, false);
      this.hasProtection = false;
    }
  }

  /**
   * Prevent default
   *
   * NOTE: In order to remove an event listener we need a reference to a method that does not change.
   *
   * @param e - The event
   */
  public prevent(e: Event): void {
    e.preventDefault();
  }

}
