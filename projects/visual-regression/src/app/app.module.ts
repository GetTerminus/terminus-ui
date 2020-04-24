import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TsDocumentService,
  TsWindowService,
} from '@terminus/ngx-tools/browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule.withConfig({ useColumnBasisZero: false }),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
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
