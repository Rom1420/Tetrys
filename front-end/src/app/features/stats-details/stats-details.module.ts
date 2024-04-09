import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsDetailsComponent } from './stats-details.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { BoxStatComponent } from './components/box-stat/box-stat.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    StatsDetailsComponent,
    GameDetailsComponent,
    BoxStatComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
  ]
})
export class StatsDetailsModule { }
