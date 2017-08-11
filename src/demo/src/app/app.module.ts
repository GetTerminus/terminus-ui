import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdButtonModule,
  MdIconModule,
  MdInputModule,
  MdSlideToggleModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LaddaModule } from 'angular2-ladda';
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  TsButtonModule,
  TsInputModule,
  TsMenuModule,
  TsSelectModule,
  TsPaginationModule,
  TsToggleModule,
  TsCopyModule,
  TsTooltipModule,
  TsDatepickerModule,
  TsDateRangeModule,
  TsSpacingModule,
  TsCheckboxModule,
  TsLoginFormModule,
  TsLinkModule,
  // INJECT: Add new UI component to demo UI imports
  // NB! The above line is required for our yeoman generator and should not be changed.
} from '@terminus/ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';

import { ButtonComponent } from './components/button.component';
import { InputComponent } from './components/input.component';
import { MenuComponent } from './components/menu.component';
import { SelectComponent } from './components/select.component';
import { PaginationComponent } from './components/pagination.component';
import { ToggleComponent } from './components/toggle.component';
import { CopyComponent } from './components/copy.component';
import { TooltipComponent } from './components/tooltip.component';
import { DatepickerComponent } from './components/datepicker.component';
import { DateRangeComponent } from './components/date-range.component';
import { SpacingComponent } from './components/spacing.component';
import { TypographyComponent } from './components/typography.component';
import { CheckboxComponent } from './components/checkbox.component';
import { LoginFormComponent } from './components/login-form.component';
import { LinkComponent } from './components/link.component';
import { WindowServiceComponent } from './components/window-service.component';
import { SpacingStylesComponent } from './components/spacing-styles.component';
// INJECT: Import demo component file
// NB! The above line is required for our yeoman generator and should not be changed.

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LaddaModule.forRoot({}),
    FlexLayoutModule,

    MdButtonModule,
    MdIconModule,
    MdSlideToggleModule,

    TsButtonModule,
    TsInputModule,
    TsMenuModule,
    TsSelectModule,
    TsPaginationModule,
    TsToggleModule,
    TsCopyModule,
    TsTooltipModule,
    TsDatepickerModule,
    TsDateRangeModule,
    TsSpacingModule,
    TsCheckboxModule,
    TsLoginFormModule,
    TsLinkModule,
    // INJECT: Add new UI component to demo module imports array
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
  declarations: [
    AppComponent,
    ComponentsComponent,
    ButtonComponent,
    InputComponent,
    MenuComponent,
    SelectComponent,
    PaginationComponent,
    ToggleComponent,
    CopyComponent,
    TooltipComponent,
    DatepickerComponent,
    DateRangeComponent,
    SpacingComponent,
    TypographyComponent,
    CheckboxComponent,
    LoginFormComponent,
    LinkComponent,
    WindowServiceComponent,
    SpacingStylesComponent,
    // INJECT: Add demo component to declarations
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
