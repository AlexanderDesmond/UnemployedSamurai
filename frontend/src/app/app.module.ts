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

import { HttpClientModule } from "@angular/common/http";
import { CashComponent } from "./cash/cash.component";

import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, CashComponent],
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
