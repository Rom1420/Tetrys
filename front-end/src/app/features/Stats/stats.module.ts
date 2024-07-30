import { NgModule } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {StatGameComponent} from "./components/stat-game/stat-game.component";
import {StatGraphComponent} from "./components/stat-graph/stat-graph.component";
import {StatsComponent} from "./stats.component";
import { PregameModule } from '../pregame/pregame.module';
import { StatsDetailsModule } from '../stats-details/stats-details.module';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../../core/app-routing.module';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { GraphComponent } from './components/graph/graph.component';

@NgModule({
  declarations: [
    StatGameComponent,
    StatGraphComponent,
    StatsComponent,
    GraphComponent
  ],
  imports: [
    AppRoutingModule,
    NgOptimizedImage,
    PregameModule,
    StatsDetailsModule,
    CommonModule,
    AngularSvgIconModule
  ],
  exports: [
    StatsComponent
  ]
})
export class StatsModule { }
