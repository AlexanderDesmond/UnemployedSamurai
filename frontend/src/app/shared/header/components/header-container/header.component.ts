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
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.authService.logout();
    location.reload();
  }
}
