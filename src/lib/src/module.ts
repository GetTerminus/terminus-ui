// Angular imports
import { NgModule } from '@angular/core';
import './utilities/rxjs-lift-hack';

// Components
import { TsButtonModule } from './button/button.module';
import { TsCardModule } from './card/card.module';
import { TsCheckboxModule } from './checkbox/checkbox.module';
import { TsCopyModule } from './copy/copy.module';
import { TsDateRangeModule } from './date-range/date-range.module';
import { TsDatepickerModule } from './datepicker/datepicker.module';
import { TsIconModule } from './icon/icon.module';
import { TsIconButtonModule } from './icon-button/icon-button.module';
import { TsInputModule } from './input/input.module';
import { TsLinkModule } from './link/link.module';
import { TsLoadingOverlayModule } from './loading-overlay/loading-overlay.module';
import { TsLoginFormModule } from './login-form/login-form.module';
import { TsMenuModule } from './menu/menu.module';
import { TsNavigationModule } from './navigation/navigation.module';
import { TsPaginatorModule } from './paginator/paginator.module';
import { TsPipesModule } from './pipes/pipes.module';
import { TsRadioGroupModule } from './radio-group/radio-group.module';
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

import { TsWindowService } from './services/window/window.service';
import { TsDocumentService } from './services/document/document.service';
import { TsValidatorsService } from './services/validators/validators.service';
import { TsReactiveFormBaseComponent } from './utilities/reactive-form-base.component';

@NgModule({
  imports: [
    TsButtonModule,
    TsCardModule,
    TsCheckboxModule,
    TsCopyModule,
    TsDateRangeModule,
    TsDatepickerModule,
    TsIconModule,
    TsIconButtonModule,
    TsInputModule,
    TsLinkModule,
    TsLoadingOverlayModule,
    TsLoginFormModule,
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
    TsValidationMessagesModule,
    // INJECT: Add UI component module to imports
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
  declarations: [
    TsReactiveFormBaseComponent,
  ],
  providers: [
    TsWindowService,
    TsDocumentService,
    TsValidatorsService,
  ],
  exports: [
    TsButtonModule,
    TsCardModule,
    TsCheckboxModule,
    TsCopyModule,
    TsDateRangeModule,
    TsDatepickerModule,
    TsIconModule,
    TsIconButtonModule,
    TsInputModule,
    TsLinkModule,
    TsLoadingOverlayModule,
    TsLoginFormModule,
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
    TsValidationMessagesModule,
    // INJECT: Add UI component to module exports
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
})
export class TerminusUIModule {}
