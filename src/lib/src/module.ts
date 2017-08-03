// Angular imports
import { NgModule } from '@angular/core';

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
// INJECT: UI component to UI module
// NB! The above line is required for our yeoman generator and should not be changed.

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
    // INJECT: Add UI component module to imports
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
  declarations: [
  ],
  providers: [
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
    // INJECT: Add UI component to module exports
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
})
export class TerminusUIModule { }
