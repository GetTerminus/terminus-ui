import { Injectable } from '@angular/core';
import { TsWindowService } from '@terminus/ngx-tools';


@Injectable()
export class TsDropProtectionService {
  hasProtection = false;

  constructor(
    private windowService: TsWindowService,
  ) { }


  /**
   * Add drop protection
   */
  add(): void {
    if (!this.hasProtection) {
      this.windowService.nativeWindow.addEventListener('dragover', (e) => {
        e.preventDefault();
      }, false);

      this.windowService.nativeWindow.addEventListener('drop', (e) => {
        e.preventDefault();
      }, false);

      this.hasProtection = true;
    }
  }


  /**
   * Remove drop protection
   */
  remove(): void {
    if (this.hasProtection) {
      this.windowService.nativeWindow.removeEventListener('dragover', (e) => {
        e.preventDefault();
      }, false);

      this.windowService.nativeWindow.removeEventListener('drop', (e) => {
        e.preventDefault();
      }, false);
    }
  }

}
