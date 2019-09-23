import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../services/authentication.service";

@Component({
  selector: "app-home-container",
  templateUrl: "./home-container.component.html",
  styleUrls: ["./home-container.component.scss"]
})
export class HomeContainerComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.isLoggedIn = false;
  }

  ngOnInit() {
    this.authService.getLoggedIn.subscribe(LoggedIn => {
      this.isLoggedIn = LoggedIn == true;
    });
  }

  redirectToHome() {
    this.router.navigate(["/new"]);
  }
}
