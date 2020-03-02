import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  TsButtonModule, TsCardModule, TsSpacingModule,
} from '@terminus/ui';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TsCardModule,
    TsSpacingModule,
    TsButtonModule,
    TsButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
