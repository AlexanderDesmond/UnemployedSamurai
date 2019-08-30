import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContentComponent } from "./content/content.component";
import { PopularDiscussionsComponent } from "./popular-discussions/popular-discussions.component";
import { HeaderComponent } from "./shared/header/components/header-container/header.component";
import { FooterComponent } from "./shared/footer/components/footer-container/footer.component";
import { LeaderboardComponent } from "./leaderboard/leaderboard.component";
import { DiscussionComponent } from "./discussion/discussion.component";
import { LeaderboardItemComponent } from "./leaderboard-item/leaderboard-item.component";
import { HomeModule } from "./modules/home/home.module";
import { LoginModule } from "./modules/login/login.module";
import { RegisterModule } from "./modules/register/register.module";
import { HeaderModule } from "./shared/header/header.module";
import { FooterModule } from "./shared/footer/footer.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    PopularDiscussionsComponent,
    HeaderComponent,
    FooterComponent,
    LeaderboardComponent,
    DiscussionComponent,
    LeaderboardItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    HeaderModule,
    FooterModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
