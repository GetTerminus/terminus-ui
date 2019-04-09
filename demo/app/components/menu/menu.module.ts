import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TsButtonModule } from '@terminus/ui/button';
import { TsCardModule } from '@terminus/ui/card';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsLinkModule } from '@terminus/ui/link';
import { TsMenuModule } from '@terminus/ui/menu';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [CommonModule, FormsModule, MenuRoutingModule, ReactiveFormsModule, TsButtonModule, TsCardModule, TsCheckboxModule, TsLinkModule, TsMenuModule, TsSpacingModule],
  declarations: [MenuComponent],
})
export class MenuModule {}
