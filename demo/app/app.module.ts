import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';


// Native Material modules only needed for demo shell
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
} from '@angular/material';

// INJECT: Add new UI component to demo UI imports
// NB! The above line is required for our yeoman generator and should not be changed.

import {
  TsDocumentService,
  TsWindowService,
} from '@terminus/ngx-tools';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';

// INJECT: Import demo component file
// NB! The above line is required for our yeoman generator and should not be changed.

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule.withConfig({useColumnBasisZero: false}),
    HttpClientModule,

    // Native Material modules only needed for demo shell
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,

    // INJECT: Add new UI component to demo module imports array
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
  providers: [
    TsDocumentService,
    TsWindowService,

  ],
  declarations: [
    AppComponent,
    ComponentsComponent,

    // INJECT: Add demo component to declarations
    // NB! The above line is required for our yeoman generator and should not be changed.
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
