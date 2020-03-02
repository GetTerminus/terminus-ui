import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TsButtonModule } from '@terminus/ui/button';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsInputModule } from '@terminus/ui/input';
import { TsLinkModule } from '@terminus/ui/link';
import { TsSpacingModule } from '@terminus/ui/spacing';
import { TsValidatorsService } from '@terminus/ui/validators';

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
