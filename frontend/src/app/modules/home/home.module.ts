import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { TrendingComponent } from "./trending/trending.component";
import { HomeContainerComponent } from "./home-container/home-container.component";

import { MaterialModule } from "../../material.module";
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  declarations: [
    LeaderboardComponent,
    TrendingComponent,
    HomeContainerComponent,
    PreviewComponent
  ],
  imports: [CommonModule, MaterialModule]
})
export class HomeModule {}
