// Angular imports
import { NgModule } from '@angular/core';

// Components (atoms)
import { TsButtonModule } from './button/button.module';
import { TsInputModule } from './input/input.module';
import { TsInputMessagesModule } from './input-messages/input-messages.module';
import { TsMenuModule } from './menu/menu.module';

// Components (compound)
import { TsSearchModule } from './search/search.module';


@NgModule({
  imports: [
    TsButtonModule,
    TsInputModule,
    TsInputMessagesModule,
    TsMenuModule,

    TsSearchModule,
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

    TsSearchModule,
  ],
})
export class TerminusUIModule { }
