import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TsButtonModule } from '@terminus/ui/button';
import { TsCardModule } from '@terminus/ui/card';
import { TsSpacingModule } from '@terminus/ui/spacing';

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
