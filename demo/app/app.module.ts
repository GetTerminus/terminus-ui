import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';


/**
 * Start amCharts config
 */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/animated';
export function amChartsFactory(): TsAmChartsToken {
  return {
    core: am4core,
    charts: am4charts,
    maps: am4maps,
    themes: [am4themes_animated, am4themes_material],
  };
}
/**
 * End amCharts config
 */



// Native Material modules only needed for demo shell
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
} from '@angular/material';


import { TsAutocompleteModule } from '@terminus/ui/autocomplete';
import { TsAutofocusModule } from '@terminus/ui/autofocus';
import { TsButtonModule } from '@terminus/ui/button';
import { TsCardModule } from '@terminus/ui/card';
import { TsChartModule, TS_AMCHARTS_TOKEN, TsAmChartsToken } from '@terminus/ui/chart';
import { TsCheckboxModule } from '@terminus/ui/checkbox';
import { TsConfirmationModule } from '@terminus/ui/confirmation';
import { TsCopyModule } from '@terminus/ui/copy';
import { TsCSVEntryModule } from '@terminus/ui/csv-entry';
import { TsDateRangeModule } from '@terminus/ui/date-range';
import { TsFileUploadModule } from '@terminus/ui/file-upload';
import { TsIconButtonModule } from '@terminus/ui/icon-button';
import { TsIconModule } from '@terminus/ui/icon';
import { TsInputModule } from '@terminus/ui/input';
import { TsLinkModule } from '@terminus/ui/link';
import { TsLoadingOverlayModule } from '@terminus/ui/loading-overlay';
import { TsLoginFormModule } from '@terminus/ui/login-form';
import { TsMenuModule } from '@terminus/ui/menu';
import { TsNavigationModule } from '@terminus/ui/navigation';
import { TsPaginatorModule } from '@terminus/ui/paginator';
import { TsPipesModule } from '@terminus/ui/pipes';
import { TsRadioGroupModule } from '@terminus/ui/radio-group';
import { TsScrollbarsModule } from '@terminus/ui/scrollbars';
import { TsSearchModule } from '@terminus/ui/search';
import { TsSelectModule } from '@terminus/ui/select';
import { TsSortModule } from '@terminus/ui/sort';
import { TsSpacingModule } from '@terminus/ui/spacing';
import { TsTableModule } from '@terminus/ui/table';
import { TsToggleModule } from '@terminus/ui/toggle';
import { TsTooltipModule } from '@terminus/ui/tooltip';
// INJECT: Add new UI component to demo UI imports
// NB! The above line is required for our yeoman generator and should not be changed.

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
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { IconComponent } from './components/icon/icon.component';
import { InputComponent } from './components/input/input.component';
import { LinkComponent } from './components/link/link.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PipesComponent } from './components/pipes/pipes.component';
import { RadioComponent } from './components/radio/radio.component';
import { ScrollbarsComponent } from './components/scrollbars/scrollbars.component';
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
    FlexLayoutModule.withConfig({useColumnBasisZero: false}),
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
    TsFileUploadModule,
    TsIconButtonModule,
    TsIconModule,
    TsInputModule,
    TsLinkModule,
    TsLoadingOverlayModule,
    TsLoginFormModule,
    TsMenuModule,
    TsNavigationModule,
    TsPaginatorModule,
    TsPipesModule,
    TsRadioGroupModule,
    TsScrollbarsModule,
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
    // Use the factory function to overwrite the `TS_AMCHARTS_TOKEN` injectable:
    {
      provide: TS_AMCHARTS_TOKEN,
      useFactory: amChartsFactory,
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
    FileUploadComponent,
    IconButtonComponent,
    IconComponent,
    InputComponent,
    LinkComponent,
    LoadingOverlayComponent,
    LoginFormComponent,
    MenuComponent,
    NavigationComponent,
    PaginatorComponent,
    PipesComponent,
    RadioComponent,
    ScrollbarsComponent,
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
