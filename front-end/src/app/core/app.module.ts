import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/nav-bar/nav-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component'

import { GameModule } from '../features/game/game.module';
import {PregameModule} from '../features/pregame/pregame.module';
import {ReactiveFormsModule} from "@angular/forms";
import {StatsModule} from "../features/Stats/stats.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatsDetailsModule } from '../features/stats-details/stats-details.module';

import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GameModule,
        PregameModule,
        ReactiveFormsModule,
        StatsModule,
        BrowserAnimationsModule, 
        StatsDetailsModule,
        AngularSvgIconModule.forRoot(),
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
