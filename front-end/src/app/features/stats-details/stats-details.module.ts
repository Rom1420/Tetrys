import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsDetailsComponent } from './stats-details.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { BoxStatComponent } from './components/box-stat/box-stat.component';
import { BrowserModule } from '@angular/platform-browser';
import { StatsProfilComponent } from './components/stats-profil/stats-profil.component';
import { GameResumeComponent } from './components/game-resume/game-resume.component';
import { GameEvolutionComponent } from './components/game-evolution/game-evolution.component';
import { StarsComponent } from './components/stars/stars.component';



@NgModule({
  declarations: [
    StatsDetailsComponent,
    GameDetailsComponent,
    BoxStatComponent,
    StatsProfilComponent,
    GameResumeComponent,
    GameEvolutionComponent,
    StarsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  exports: [
    BoxStatComponent,
    GameDetailsComponent,
    StatsProfilComponent,
  ]
})
export class StatsDetailsModule { }
