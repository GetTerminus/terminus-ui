import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
  ],
  declarations: [
    AppComponent,
    routedComponents,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
