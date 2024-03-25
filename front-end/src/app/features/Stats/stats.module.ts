import { NgModule } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {StatGameComponent} from "./components/stat-game/stat-game.component";
import {StatGraphComponent} from "./components/stat-graph/stat-graph.component";
import {StatsComponent} from "./stats.component";

@NgModule({
  declarations: [
    StatGameComponent,
    StatGraphComponent,
    StatsComponent
  ],
  imports: [
    NgOptimizedImage
  ],
  exports: [
    StatGameComponent,
    StatGraphComponent,
    StatsComponent
  ]
})
export class StatsModule { }
