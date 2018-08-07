// Angular imports
import { NgModule } from '@angular/core';

// Components
import { TsAutocompleteModule } from './autocomplete/autocomplete.module';
import { TsAutofocusModule } from './autofocus/autofocus.module';
import { TsButtonModule } from './button/button.module';
import { TsCardModule } from './card/card.module';
import { TsChartModule } from './chart/chart.module';
import { TsCheckboxModule } from './checkbox/checkbox.module';
import { TsConfirmationModule } from './confirmation/confirmation.module';
import { TsCopyModule } from './copy/copy.module';
import { TsCSVEntryModule } from './csv-entry/csv-entry.module';
import { TsDateRangeModule } from './date-range/date-range.module';
import { TsDatepickerModule } from './datepicker/datepicker.module';
import { TsFileUploadModule } from './file-upload/file-upload.module';
import { TsIconButtonModule } from './icon-button/icon-button.module';
import { TsIconModule } from './icon/icon.module';
import { TsInputModule } from './input/input.module';
import { TsLinkModule } from './link/link.module';
import { TsLoadingOverlayModule } from './loading-overlay/loading-overlay.module';
import { TsLoginFormModule } from './login-form/login-form.module';
import { TsMaskModule } from './mask/mask.module';
import { TsMenuModule } from './menu/menu.module';
import { TsNavigationModule } from './navigation/navigation.module';
import { TsPaginatorModule } from './paginator/paginator.module';
import { TsPipesModule } from './pipes/pipes.module';
import { TsRadioGroupModule } from './radio-group/radio-group.module';
import { TsScrollbarsModule } from './scrollbars/scrollbars.module';
import { TsSearchModule } from './search/search.module';
import { TsSelectModule } from './select/select.module';
import { TsSortModule } from './sort/sort.module';
import { TsSpacingModule } from './spacing/spacing.module';
import { TsTableModule } from './table/table.module';
import { TsToggleModule } from './toggle/toggle.module';
import { TsTooltipModule } from './tooltip/tooltip.module';
import { TsValidationMessagesModule } from './validation-messages/validation-messages.module';
// INJECT: UI component to UI module
// NB! The above line is required for our yeoman generator and should not be changed.

import { TsValidatorsService } from './validators/validators.service';
import { TsReactiveFormBaseComponent } from './utilities/reactive-form-base.component';

@NgModule({
  imports: [
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
    TsScrollbarsModule,
    TsSearchModule,
    TsSelectModule,
    TsSortModule,
    TsSpacingModule,
    TsTableModule,
    TsToggleModule,
    TsTooltipModule,
    TsValidationMessagesModule,
    // INJECT: Add UI component module to imports
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
  declarations: [
    TsReactiveFormBaseComponent,
  ],
  providers: [
    TsValidatorsService,
  ],
  exports: [
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
    TsScrollbarsModule,
    TsSearchModule,
    TsSelectModule,
    TsSortModule,
    TsSpacingModule,
    TsTableModule,
    TsToggleModule,
    TsTooltipModule,
    TsValidationMessagesModule,
    // INJECT: Add UI component to module exports
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
})
export class TerminusUIModule {}
