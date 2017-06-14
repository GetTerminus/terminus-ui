// Angular imports
import { NgModule } from '@angular/core';

// Components (atoms)
import { TsButtonModule } from './button/button.module';
import { TsInputModule } from './input/input.module';
import { TsInputMessagesModule } from './input-messages/input-messages.module';

// Components (compound)
import { TsSearchModule } from './search/search.module';

const TERMINUS_MODULES = [
  TsButtonModule,
  TsInputModule,
  TsInputMessagesModule,
  TsSearchModule,
];


@NgModule({
  imports: [
    TERMINUS_MODULES,
  ],
  declarations: [
  ],
  providers: [
  ],
  exports: [
    TERMINUS_MODULES,
  ],
})
export class TerminusUIModule { }
