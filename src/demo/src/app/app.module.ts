import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  TsButtonModule,
  TsCardModule,
  TsCheckboxModule,
  TsCopyModule,
  TsDatepickerModule,
  TsDateRangeModule,
  TsInputModule,
  TsLinkModule,
  TsLoadingOverlayModule,
  TsLoginFormModule,
  TsMenuModule,
  TsNavigationModule,
  TsPaginationModule,
  TsSearchModule,
  TsSelectModule,
  TsSpacingModule,
  TsToggleModule,
  TsTooltipModule,
  // INJECT: Add new UI component to demo UI imports
  // NB! The above line is required for our yeoman generator and should not be changed.
} from '@terminus/ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';

import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { MenuComponent } from './components/menu/menu.component';
import { SelectComponent } from './components/select/select.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { CopyComponent } from './components/copy/copy.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { SpacingComponent } from './components/spacing/spacing.component';
import { TypographyComponent } from './components/typography/typography.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LinkComponent } from './components/link/link.component';
import { WindowServiceComponent } from './components/services/window-service.component';
import { SpacingStylesComponent } from './components/spacing/spacing-styles.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { SearchComponent } from './components/search/search.component';
import { CardComponent } from './components/card/card.component';
import { ValidationComponent } from './components/validation/validation.component';
// INJECT: Import demo component file
// NB! The above line is required for our yeoman generator and should not be changed.

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

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
    TsNavigationModule,
    TsLoadingOverlayModule,
    TsSearchModule,
    TsCardModule,
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
    NavigationComponent,
    LoadingOverlayComponent,
    SearchComponent,
    CardComponent,
    ValidationComponent,
    // INJECT: Add demo component to declarations
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
