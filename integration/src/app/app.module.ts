import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TerminusUIModule } from '@terminus/ui';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, TerminusUIModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
