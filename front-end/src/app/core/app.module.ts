import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppWordGame} from "../features/game/components/word-game/app.word-game";
import { NavbarComponent } from './components/nav-bar/nav-bar.component';
import {RouterOutlet} from "@angular/router";
import {PregameModule} from '../features/pregame/pregame.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppComponent,
    AppWordGame
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterOutlet,
        PregameModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
