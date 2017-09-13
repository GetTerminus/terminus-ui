import { Injectable } from '@angular/core';


@Injectable()
export class ChangeDetectorRefMock {

  markForCheck = jasmine.createSpy('markForCheck');

  detach = jasmine.createSpy('detach');

  detectChanges = jasmine.createSpy('detectChanges');

  checkNoChanges = jasmine.createSpy('checkNoChanges');

  reattach = jasmine.createSpy('reattach');

}
