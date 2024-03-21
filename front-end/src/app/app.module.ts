import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppWordGame} from "./word-game/app.word-game";
import { NavbarComponent } from './nav-bar/nav-bar.component';
import { DifficultyButtonComponent } from './difficulty-button/difficulty-button.component';
import { DifficultyListComponent } from './difficulty-list/difficulty-list.component';
import {RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DifficultyButtonComponent,
    DifficultyListComponent,
    AppComponent,
    AppWordGame
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterOutlet
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
