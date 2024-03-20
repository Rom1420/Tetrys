import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './nav-bar/nav-bar.component';
import { DifficultyButtonComponent } from './difficulty-button/difficulty-button.component';
import { DifficultyListComponent } from './difficulty-list/difficulty-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DifficultyButtonComponent, 
    DifficultyListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
