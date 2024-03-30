import { NgModule } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {StatGameComponent} from "./components/stat-game/stat-game.component";
import {StatGraphComponent} from "./components/stat-graph/stat-graph.component";
import {StatsComponent} from "./stats.component";
import { PregameModule } from '../pregame/pregame.module';

@NgModule({
  declarations: [
    StatGameComponent,
    StatGraphComponent,
    StatsComponent
  ],
  imports: [
    NgOptimizedImage,
    PregameModule
  ],
  exports: [
    StatsComponent
  ]
})
export class StatsModule { }
