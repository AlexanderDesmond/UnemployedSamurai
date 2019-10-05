import { Component, OnInit, Input } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { PostsService } from "../../../../services/posts.service";
import { Post } from "src/app/post.interface";
import { Router } from "@angular/router";

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
    private postsService: PostsService,
    private router: Router
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

  DeletePost() {
    if (confirm("Are you sure you want to delete this post? It cannot be recovered once deleted") == true) {
      this.postsService.deletePost(this.post._id).subscribe( res => {
        this.router.navigate(['/']);
      },
      err => {
        alert("Post could not be deleted");
        console.log(err);
      });
    }
  }
}
