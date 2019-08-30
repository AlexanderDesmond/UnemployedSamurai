import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { TrendingComponent } from './trending/trending.component';



@NgModule({
  declarations: [LeaderboardComponent, TrendingComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
