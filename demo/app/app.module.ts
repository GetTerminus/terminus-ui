import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TsDocumentService,
  TsWindowService,
} from '@terminus/ngx-tools';
import 'hammerjs';

// Native Material modules only needed for demo shell
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';


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
  ],
  providers: [
    TsDocumentService,
    TsWindowService,
  ],
  declarations: [
    AppComponent,
    ComponentsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
