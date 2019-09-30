import { Component, OnInit } from "@angular/core";

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


  constructor(private authService: AuthenticationService) {
    this.isLoggedIn = false;
  }

  ngOnInit() {

    // refresh component when getLoggedIn value changes
    this.authService.getLoggedIn.subscribe(loggedIn => {
      // without this, login/logout buttons do not get updated
      // written this way as could not assign boolean to unknown type
      this.isLoggedIn = (loggedIn == true);
      this.currentUser = this.authService.getCurrentUser();
    });

    if (this.isLoggedIn) {
      // refresh login / or logout if session expired
      this.authService.refreshLogin();
    }

  }

  logout() {
    if (confirm('Are you sure you want to log out?')) {
      this.authService.logout();
    }    
  }
}
