import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TsCardModule } from '@terminus/ui/card';
import { TsNavigationModule } from '@terminus/ui/navigation';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { NavigationRoutingModule } from './navigation-routing.module';
import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, NavigationRoutingModule, TsCardModule, TsNavigationModule, TsSpacingModule],
  declarations: [NavigationComponent],
})
export class NavigationModule {}
