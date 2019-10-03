import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HeaderComponent } from "./shared/header/components/header-container/header.component";
import { FooterComponent } from "./shared/footer/components/footer-container/footer.component";

import { HomeModule } from "./modules/home/home.module";
import { LoginModule } from "./modules/login/login.module";
import { RegisterModule } from "./modules/register/register.module";
import { HeaderModule } from "./shared/header/header.module";
import { FooterModule } from "./shared/footer/footer.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";

import { AuthenticationInterceptor } from "./helpers/authentication-interceptor";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { PageNotFoundComponent } from "./modules/error-pages/page-not-found/page-not-found.component";
import { NewPostComponent } from "./modules/posts/new-post/new-post.component";
import { PostContainerComponent } from "./modules/posts/view-post/post-container/post-container.component";
import { PostComponent } from "./modules/posts/view-post/post/post.component";
import { CommentsContainerComponent } from "./modules/posts/view-post/comments/comments-container/comments-container.component";
import { CommentComponent } from "./modules/posts/view-post/comments/comment/comment.component";
import { AddCommentComponent } from "./modules/posts/view-post/comments/add-comment/add-comment.component";
import { FormsModule } from "@angular/forms";
import { ReactionContainerComponent } from './modules/posts/view-post/reactions/reaction-container/reaction-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    NewPostComponent,
    PostContainerComponent,
    PostComponent,
    CommentsContainerComponent,
    CommentComponent,
    AddCommentComponent,
    ReactionContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    HeaderModule,
    FooterModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatPasswordStrengthModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
