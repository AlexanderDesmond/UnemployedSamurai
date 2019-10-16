import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/user.interface";

@Component({
  selector: "app-leaderboard-item",
  templateUrl: "./leaderboard-item.component.html",
  styleUrls: ["./leaderboard-item.component.scss"]
})
export class LeaderboardItemComponent implements OnInit {
  // Input user object from leaderboard component.
  @Input() user: User;

  constructor() {}

  ngOnInit() {}
}
