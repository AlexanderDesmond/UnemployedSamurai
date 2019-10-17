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
  currentPage: number = 1;

  hideNext: boolean = true;
  hidePrevious: boolean = true;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.getPosts();
  }

  // Handle updating of page count number for pagination.
  UpdatePageCount(data) {
    this.hidePrevious = !data["hasPrevPage"];
    this.hideNext = !data["hasNextPage"];
  }

  // Reset pagination of posts to the first page.
  Reset() {
    this.currentPage = 1;
    this.getPosts();
  }

  /*
    Returns an observable array of Post objects.
    Sorted either by recent or trending, depending on the option selected.
   */
  getPosts() {
    if (this.selected === "recent") {
      this.postsService.getPosts(this.currentPage).subscribe(data => {
        this.posts = data["docs"];
        this.UpdatePageCount(data);
      });
    } else if (this.selected === "trending") {
      this.postsService.getPostsTrending(this.currentPage).subscribe(data => {
        this.posts = data["docs"];
        this.UpdatePageCount(data);
      });
    }
  }

  // Go to the next page.
  nextPage() {
    this.currentPage++;
    this.getPosts();
  }

  // Go to the previous page.
  previousPage() {
    this.currentPage--;
    this.getPosts();
  }
}
