import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatSortModule,
} from '@angular/material';

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
  TsPaginatorModule,
  TsRadioGroupModule,
  TsSearchModule,
  TsSelectModule,
  TsSortModule,
  TsSpacingModule,
  TsToggleModule,
  TsTooltipModule,
  TsTableModule,
  // INJECT: Add new UI component to demo UI imports
  // NB! The above line is required for our yeoman generator and should not be changed.
} from '@terminus/ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';

import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CopyComponent } from './components/copy/copy.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { InputComponent } from './components/input/input.component';
import { LinkComponent } from './components/link/link.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { RadioComponent } from './components/radio/radio.component';
import { SearchComponent } from './components/search/search.component';
import { SelectComponent } from './components/select/select.component';
import { SpacingComponent } from './components/spacing/spacing.component';
import { SpacingStylesComponent } from './components/spacing/spacing-styles.component';
import { TableComponent } from './components/table/table.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TypographyComponent } from './components/typography/typography.component';
import { ValidationComponent } from './components/validation/validation.component';
import { WindowServiceComponent } from './components/services/window-service.component';
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
    HttpClientModule,

    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,

    TsButtonModule,
    TsCardModule,
    TsCheckboxModule,
    TsCopyModule,
    TsDateRangeModule,
    TsDatepickerModule,
    TsInputModule,
    TsLinkModule,
    TsLoadingOverlayModule,
    TsLoginFormModule,
    TsMenuModule,
    TsNavigationModule,
    TsPaginatorModule,
    TsRadioGroupModule,
    TsSearchModule,
    TsSelectModule,
    TsSortModule,
    TsSpacingModule,
    TsTableModule,
    TsToggleModule,
    TsTooltipModule,
    // INJECT: Add new UI component to demo module imports array
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
  declarations: [
    AppComponent,
    ComponentsComponent,

    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    CopyComponent,
    DateRangeComponent,
    DatepickerComponent,
    InputComponent,
    LinkComponent,
    LoadingOverlayComponent,
    LoginFormComponent,
    MenuComponent,
    NavigationComponent,
    PaginatorComponent,
    RadioComponent,
    SearchComponent,
    SelectComponent,
    SpacingComponent,
    SpacingStylesComponent,
    TableComponent,
    ToggleComponent,
    TooltipComponent,
    TypographyComponent,
    ValidationComponent,
    WindowServiceComponent,
    // INJECT: Add demo component to declarations
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
