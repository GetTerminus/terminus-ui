// Angular imports
import { NgModule } from '@angular/core';

// Components (atoms)
import { TsButtonModule } from './button/button.module';
import { TsInputModule } from './input/input.module';
import { TsInputMessagesModule } from './input-messages/input-messages.module';
import { TsMenuModule } from './menu/menu.module';
import { TsSelectModule } from './select/select.module';
import { TsToggleModule } from './toggle/toggle.module';

// Components (compound)
import { TsSearchModule } from './search/search.module';
import { TsPaginationModule } from './pagination/pagination.module';


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
  ],
})
export class TerminusUIModule { }
