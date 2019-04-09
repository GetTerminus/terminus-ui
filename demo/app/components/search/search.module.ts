import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TsCardModule } from '@terminus/ui/card';
import { TsSearchModule } from '@terminus/ui/search';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [CommonModule, FormsModule, SearchRoutingModule, TsCardModule, TsSearchModule, TsSpacingModule],
  declarations: [SearchComponent],
})
export class SearchModule {}
