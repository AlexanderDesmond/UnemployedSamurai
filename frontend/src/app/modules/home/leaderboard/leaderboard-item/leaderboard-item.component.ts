import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/user.interface";

@Component({
  selector: "app-leaderboard-item",
  templateUrl: "./leaderboard-item.component.html",
  styleUrls: ["./leaderboard-item.component.scss"]
})
export class LeaderboardItemComponent implements OnInit {
  //@Input() username: string;
  @Input() user: User;

  constructor() {}

  ngOnInit() {}
}
