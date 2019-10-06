import { Component, OnInit } from "@angular/core";

import { PostsService } from "../../../services/posts.service";
import { Post } from "src/app/post.interface";

@Component({
  selector: "app-trending",
  templateUrl: "./trending.component.html",
  styleUrls: ["./trending.component.scss"]
})
export class TrendingComponent implements OnInit {
  selected = "recent";
  posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.getPosts();
  }

  /* 
    Returns an observable array of Post objects.
    Sorted either by recent or trending, depending on the option selected.
   */
  getPosts() {
    if (this.selected === "recent") {
      this.postsService.getPosts().subscribe(data => {
        this.posts = data;
      });
    } else if (this.selected === "trending") {
      this.postsService.getPostsTrending().subscribe(data => {
        this.posts = data;
      });
    }
  }
}
