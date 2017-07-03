import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MdButtonModule,
  MdIconModule,
  MdInputModule,
  MdSlideToggleModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LaddaModule } from 'angular2-ladda';
import 'hammerjs';

import {
  TsButtonModule,
  TsInputModule,
  TsMenuModule,
  TsSelectModule,
  TsPaginationModule,
  TsToggleModule,
} from '@terminus/ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';

import { ButtonComponent } from './components/button.component';
import { InputComponent } from './components/input.component';
import { MenuComponent } from './components/menu.component';
import { SelectComponent } from './components/select.component';
import { PaginationComponent } from './components/pagination.component';
import { ToggleComponent } from './components/toggle.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    LaddaModule.forRoot({}),

    MdButtonModule,
    MdIconModule,
    MdSlideToggleModule,

    TsButtonModule,
    TsInputModule,
    TsMenuModule,
    TsSelectModule,
    TsPaginationModule,
    TsToggleModule,
  ],
  declarations: [
    AppComponent,
    ComponentsComponent,
    ButtonComponent,
    InputComponent,
    MenuComponent,
    SelectComponent,
    PaginationComponent,
    ToggleComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
