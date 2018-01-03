// Angular imports
import { NgModule } from '@angular/core';
import './utilities/rxjs-lift-hack';

// Components
import { TsButtonModule } from './button/button.module';
import { TsInputModule } from './input/input.module';
import { TsValidationMessagesModule } from './validation-messages/validation-messages.module';
import { TsMenuModule } from './menu/menu.module';
import { TsSelectModule } from './select/select.module';
import { TsToggleModule } from './toggle/toggle.module';
import { TsSearchModule } from './search/search.module';
import { TsPaginationModule } from './pagination/pagination.module';
import { TsCopyModule } from './copy/copy.module';
import { TsTooltipModule } from './tooltip/tooltip.module';
import { TsDatepickerModule } from './datepicker/datepicker.module';
import { TsDateRangeModule } from './date-range/date-range.module';
import { TsSpacingModule } from './spacing/spacing.module';
import { TsCheckboxModule } from './checkbox/checkbox.module';
import { TsLoginFormModule } from './login-form/login-form.module';
import { TsLinkModule } from './link/link.module';
import { TsNavigationModule } from './navigation/navigation.module';
import { TsLoadingOverlayModule } from './loading-overlay/loading-overlay.module';
import { TsCardModule } from './card/card.module';
import { TsRadioGroupModule } from './radio-group/radio-group.module';
// INJECT: UI component to UI module
// NB! The above line is required for our yeoman generator and should not be changed.

import { TsWindowService } from './services/window/window.service';
import { TsDocumentService } from './services/document/document.service';
import { TsValidatorsService } from './services/validators/validators.service';
import { TsReactiveFormBaseComponent } from './utilities/reactive-form-base.component';

@NgModule({
  imports: [
    TsButtonModule,
    TsInputModule,
    TsValidationMessagesModule,
    TsMenuModule,
    TsSelectModule,
    TsToggleModule,
    TsSearchModule,
    TsPaginationModule,
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
    TsCardModule,
    TsRadioGroupModule,
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
    TsInputModule,
    TsValidationMessagesModule,
    TsMenuModule,
    TsSelectModule,
    TsToggleModule,
    TsSearchModule,
    TsPaginationModule,
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
    TsCardModule,
    TsRadioGroupModule,
    // INJECT: Add UI component to module exports
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
})
export class TerminusUIModule {}
