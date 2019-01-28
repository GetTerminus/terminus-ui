import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TsValidatorsService } from '@terminus/ui/validators';
import { TsInputModule } from '@terminus/ui/input';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsButtonModule } from '@terminus/ui/button';
import { TsSpacingModule } from '@terminus/ui/spacing';
import { TsLinkModule } from '@terminus/ui/link';

import { TsLoginFormComponent } from './login-form.component';

export * from './login-form.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TsButtonModule,
    TsCheckboxModule,
    TsInputModule,
    TsLinkModule,
    TsSpacingModule,
  ],
  providers: [
    TsValidatorsService,
  ],
  exports: [
    TsLoginFormComponent,
  ],
  declarations: [
    TsLoginFormComponent,
  ],
})
export class TsLoginFormModule {}
