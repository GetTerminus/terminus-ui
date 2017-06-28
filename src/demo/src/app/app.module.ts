import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MdButtonModule,
  MdIconModule,
  MdInputModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LaddaModule } from 'angular2-ladda';
import 'hammerjs';

import {
  TsButtonModule,
  TsInputModule,
  TsMenuModule,
} from '@terminus/ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';

import { ButtonComponent } from './components/button.component';
import { InputComponent } from './components/input.component';
import { MenuComponent } from './components/menu.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    LaddaModule.forRoot({}),
    MdButtonModule,
    MdIconModule,
    TsButtonModule,
    TsInputModule,
    TsMenuModule,
  ],
  declarations: [
    AppComponent,
    ComponentsComponent,
    ButtonComponent,
    InputComponent,
    MenuComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
