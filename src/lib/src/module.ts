// Angular imports
import { NgModule } from '@angular/core';

// Components
import { TsButtonModule } from './button/button.module';
import { TsInputModule } from './input/input.module';
import { TsInputMessagesModule } from './input-messages/input-messages.module';
import { TsMenuModule } from './menu/menu.module';
import { TsSelectModule } from './select/select.module';
import { TsToggleModule } from './toggle/toggle.module';
import { TsSearchModule } from './search/search.module';
import { TsPaginationModule } from './pagination/pagination.module';
// YEOMAN_IMPORT_HOOK
// NB! The above line is required for our yeoman generator and should not be changed.

@NgModule({
  imports: [
    TsButtonModule,
    TsInputModule,
    TsInputMessagesModule,
    TsMenuModule,
    TsSelectModule,
    TsToggleModule,
    TsSearchModule,
    TsPaginationModule,
    // YEOMAN_IMPORTS_HOOK
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
  declarations: [
  ],
  providers: [
  ],
  exports: [
    TsButtonModule,
    TsInputModule,
    TsInputMessagesModule,
    TsMenuModule,
    TsSelectModule,
    TsToggleModule,
    TsSearchModule,
    TsPaginationModule,
    // YEOMAN_EXPORTS_HOOK
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
})
export class TerminusUIModule { }
