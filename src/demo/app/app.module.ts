import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TsButtonModule,
  TsInputModule,
  TsSearchModule,
  TsMenuModule,
} from '@terminus/ui';
import {
  MdMenuModule,
  MdIconModule,
} from '@angular/material';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    TsButtonModule,
    TsInputModule,
    TsSearchModule,
    TsMenuModule,
    MdMenuModule,
    MdIconModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
