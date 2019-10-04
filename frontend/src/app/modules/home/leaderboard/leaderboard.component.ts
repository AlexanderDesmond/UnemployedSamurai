import { Component, OnInit } from "@angular/core";

import { UsersService } from "../../../services/users.service";
import { User } from "src/app/user.interface";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.scss"]
})
export class LeaderboardComponent implements OnInit {
  users: User[];

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => (this.users = data));
  }
}
