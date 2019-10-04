import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-leaderboard-item",
  templateUrl: "./leaderboard-item.component.html",
  styleUrls: ["./leaderboard-item.component.scss"]
})
export class LeaderboardItemComponent implements OnInit {
  @Input() username: string;

  constructor() {}

  ngOnInit() {}
}
