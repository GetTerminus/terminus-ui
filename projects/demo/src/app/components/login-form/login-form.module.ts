import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TsCardModule } from '@terminus/ui/card';
import { TsLoginFormModule } from '@terminus/ui/login-form';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { LoginFormRoutingModule } from './login-form-routing.module';
import { LoginFormComponent } from './login-form.component';


@NgModule({
  imports: [
    CommonModule,
    LoginFormRoutingModule,
    TsCardModule,
    TsLoginFormModule,
    TsSpacingModule,
  ],
  declarations: [
    LoginFormComponent,
  ],
})
export class LoginFormModule {}
