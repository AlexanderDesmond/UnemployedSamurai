import { Component, OnInit } from "@angular/core";

import { PostsService } from "../../../services/posts.service";
import { Post } from "src/app/post.interface";

@Component({
  selector: "app-trending",
  templateUrl: "./trending.component.html",
  styleUrls: ["./trending.component.scss"]
})
export class TrendingComponent implements OnInit {
  selected = "trending";
  posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts().subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      console.log(this.posts.length);
    });

    console.log("Posts: " + typeof this.posts);
  }
}
