import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TsButtonModule } from '@terminus/ui/button';
import { TsCardModule } from '@terminus/ui/card';
import { TsSpacingModule } from '@terminus/ui/spacing';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    TsCardModule,
    TsSpacingModule,
    TsButtonModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
