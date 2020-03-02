import { NgModule } from '@angular/core';

import { TsValidatorsService } from './validators.service';

export * from './validators.service';


@NgModule({
  providers: [
    TsValidatorsService,
  ],
})
export class TsValidatorsModule {}
