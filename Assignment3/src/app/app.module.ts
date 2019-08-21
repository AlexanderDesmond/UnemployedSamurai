import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { PopularDiscussionsComponent } from './popular-discussions/popular-discussions.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { LeaderboardItemComponent } from './leaderboard-item/leaderboard-item.component';
import { DiscussionDetailsComponent } from './discussion-details/discussion-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    PopularDiscussionsComponent,
    HeaderComponent,
    FooterComponent,
    LeaderboardComponent,
    DiscussionComponent,
    LeaderboardItemComponent,
    DiscussionDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
