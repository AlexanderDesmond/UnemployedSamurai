import { Component, OnInit, Input } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { PostsService } from "../../../../services/posts.service";
import { Post } from "src/app/post.interface";

@Component({
  selector: "app-post-container",
  templateUrl: "./post-container.component.html",
  styleUrls: ["./post-container.component.scss"]
})
export class PostContainerComponent implements OnInit {
  post: Post;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("_id");
    console.log("Post:" + this.route.snapshot.paramMap.get("_id"));
    this.getPost();
  }

  getPost() {
    this.postsService.getPost(this.id).subscribe(data => {
      this.post = data;
    });
  }
}
