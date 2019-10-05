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
  /* uniqueUsers: {
    uniqueUser: string;
    postCount: number;
  }[] = []; */

  constructor(
    private userService: UsersService,
    private postService: PostsService
  ) {}

  ngOnInit() {
    this.getUsers();

    //this.populateLeaderboard();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      error => console.log(error),
      () => console.log(this.users)
    );
  }

  /* getPosts() {
    this.postService.getPosts().subscribe(
      data => {
        this.posts = data;
      },
      error => console.log("error"),
      () => {
        this.populateLeaderboard();
      }
    );
  }

  populateLeaderboard() {
    for (let i = 0; i < this.users.length; i++) {
      for (let j = 0; j < this.posts.length; j++) {
        let uniqueUser = this.users[i].username.toString();
        let postCount = 0;

        if (this.posts[j].author === this.users[i].username) {
          postCount++;
        }

        this.uniqueUsers.push({ uniqueUser, postCount });
      }
    }
  } */
}
