import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { UiGuideModule } from './../../../../libs/ui-guide/src/index';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiGuideModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
