import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { User } from "../../../../user.interface";
import { AuthenticationService } from "../../../../services/authentication.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  currentUser: String;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.isLoggedIn = false;
  }

  ngOnInit() {
    // refresh component when getLoggedIn value changes
    this.authService.getLoggedIn.subscribe(loggedIn => {
      // without this, login/logout buttons do not get updated
      // written this way as could not assign boolean to unknown type
      this.isLoggedIn = loggedIn == true;
      this.currentUser = this.authService.getCurrentUser();
    });

    if (this.isLoggedIn) {
      // refresh login / or logout if session expired
      this.authService.refreshLogin();
    }
  }

  // Handles logging in and logging out.
  logout() {
    // Checks to see if the user is logged in.
    if (this.isLoggedIn) {
      // Confirm and log out.
      if (confirm("Are you sure you want to log out?")) {
        this.authService.logout();
      }
    }
    // If the user is not logged in, navigate to the logon page.
    else {
      this.router.navigate(["/login"]);
    }
  }
}
