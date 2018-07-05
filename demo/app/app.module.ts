import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

// Import highcharts and all highcharts extension modules
import * as Highcharts from 'highcharts';
import * as loadMore from 'highcharts/highcharts-more.src';
import * as loadStock from 'highcharts/modules/stock.src';
import * as loadMap from 'highcharts/modules/map.src';
import * as loadDrilldown from 'highcharts/modules/drilldown.src';
import * as loadExporting from 'highcharts/modules/exporting.src';

// Define a function that extends the Highcharts library with all needed functionality:
export function highchartsFactory() {
  loadMore(Highcharts);
  loadStock(Highcharts);
  loadMap(Highcharts);
  loadDrilldown(Highcharts);
  loadExporting(Highcharts);

  return Highcharts;
}


// Native Material modules only needed for demo shell
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
} from '@angular/material';

import {
  HIGHCHARTS,
  TsAutocompleteModule,
  TsAutofocusModule,
  TsButtonModule,
  TsCardModule,
  TsChartModule,
  TsCheckboxModule,
  TsConfirmationModule,
  TsCopyModule,
  TsCSVEntryModule,
  TsDateRangeModule,
  TsDatepickerModule,
  TsFileUploadModule,
  TsIconButtonModule,
  TsIconModule,
  TsInputModule,
  TsLinkModule,
  TsLoadingOverlayModule,
  TsLoginFormModule,
  TsMaskModule,
  TsMenuModule,
  TsNavigationModule,
  TsPaginatorModule,
  TsPipesModule,
  TsRadioGroupModule,
  TsSearchModule,
  TsSelectModule,
  TsSortModule,
  TsSpacingModule,
  TsTableModule,
  TsToggleModule,
  TsTooltipModule,
  // INJECT: Add new UI component to demo UI imports
  // NB! The above line is required for our yeoman generator and should not be changed.
} from '@terminus/ui';

import {
  TsWindowService,
  TsDocumentService,
} from '@terminus/ngx-tools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';

import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutofocusComponent } from './components/autofocus/autofocus.component';
import { BreakpointsComponent } from './components/breakpoints/breakpoints.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { ChartComponent } from './components/chart/chart.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { CopyComponent } from './components/copy/copy.component';
import { CSVEntryComponent } from './components/csv-entry/csv-entry.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { IconComponent } from './components/icon/icon.component';
import { InputComponent } from './components/input/input.component';
import { LinkComponent } from './components/link/link.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MaskComponent } from './components/mask/mask.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PipesComponent } from './components/pipes/pipes.component';
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

    // Native Material modules only needed for demo shell
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,

    TsAutocompleteModule,
    TsAutofocusModule,
    TsButtonModule,
    TsCardModule,
    TsChartModule,
    TsCheckboxModule,
    TsConfirmationModule,
    TsCopyModule,
    TsCSVEntryModule,
    TsDateRangeModule,
    TsDatepickerModule,
    TsFileUploadModule,
    TsIconButtonModule,
    TsIconModule,
    TsInputModule,
    TsLinkModule,
    TsLoadingOverlayModule,
    TsLoginFormModule,
    TsMaskModule,
    TsMenuModule,
    TsNavigationModule,
    TsPaginatorModule,
    TsPipesModule,
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
  providers: [
    TsDocumentService,
    TsWindowService,
    // Use the factory function to overwrite the `HIGHCHARTS` injectable:
    {
      provide: HIGHCHARTS,
      useFactory: highchartsFactory,
    },
  ],
  declarations: [
    AppComponent,
    ComponentsComponent,

    AutocompleteComponent,
    AutofocusComponent,
    BreakpointsComponent,
    ButtonComponent,
    CardComponent,
    ChartComponent,
    CheckboxComponent,
    ConfirmationComponent,
    CopyComponent,
    CSVEntryComponent,
    DateRangeComponent,
    DatepickerComponent,
    FileUploadComponent,
    IconButtonComponent,
    IconComponent,
    InputComponent,
    LinkComponent,
    LoadingOverlayComponent,
    LoginFormComponent,
    MaskComponent,
    MenuComponent,
    NavigationComponent,
    PaginatorComponent,
    PipesComponent,
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
    // INJECT: Add demo component to declarations
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
