import { Component, OnInit } from "@angular/core";

import { UsersService } from "../../../services/users.service";
import { User } from "src/app/user.interface";
import { Post } from "src/app/post.interface";
import { PostsService } from "src/app/services/posts.service";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.scss"]
})
export class LeaderboardComponent implements OnInit {
  users: User[];
  posts: Post[];

  constructor(
    private userService: UsersService,
    private postService: PostsService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  /* 
    Returns an observable array of User objects sorted by post count in descending order.
   */
  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        /* 
          Sort array of objects:
          https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
         */
        this.users.sort((a, b) => {
          if (a.post_count < b.post_count) {
            return 1;
          } else {
            return -1;
          }
        });
      },
      error => {},
      /* 
         Do something when observable has been resolved:
        https://aigeec.com/angularjs-2-do-something-when-my-observable-is-complete/
       */
      () => {}
    );
  }
}
