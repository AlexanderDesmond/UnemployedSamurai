import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginFormComponent } from "./modules/login/login-form/login-form.component";
import { RegisterFormComponent } from "./modules/register/register-form/register-form.component";
import { HomeContainerComponent } from "./modules/home/home-container/home-container.component";
import { CashComponent } from "./cash/cash.component";

const routes: Routes = [
  { path: "", component: CashComponent },
  { path: "login", component: LoginFormComponent },
  { path: "register", component: RegisterFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
