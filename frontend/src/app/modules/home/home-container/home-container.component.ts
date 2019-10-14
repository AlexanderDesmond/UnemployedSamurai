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
    // Check to see if a user is logged-in.
    this.authService.getLoggedIn.subscribe(LoggedIn => {
      this.isLoggedIn = LoggedIn == true;
    });
  }

  // Redirect to new post page.
  redirectToHome() {
    this.router.navigate(["/new"]);
  }
}
