import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/nav-bar/nav-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginContainerComponent } from './components/login/login-container/login-container.component';
import { LoginInputComponent } from './components/login/login-input/login-input.component';

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
    LoginContainerComponent,
    LoginInputComponent,
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
        RouterModule.forRoot([]),
        HttpClientModule
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
