import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginFormComponent } from "./modules/login/login-form/login-form.component";
import { RegisterFormComponent } from "./modules/register/register-form/register-form.component";
import { HomeContainerComponent } from "./modules/home/home-container/home-container.component";
import { NewPostComponent } from "./modules/posts/new-post/new-post.component";
import { PostContainerComponent } from "./modules/posts/view-post/post-container/post-container.component";
import { PageNotFoundComponent } from "./modules/error-pages/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", component: HomeContainerComponent },
  { path: "login", component: LoginFormComponent },
  { path: "register", component: RegisterFormComponent },
  { path: "new", component: NewPostComponent },
  {
    path: "view/:_id",
    component: PostContainerComponent
  },
  { path: '**',  component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
