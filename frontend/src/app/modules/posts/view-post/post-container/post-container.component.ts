import { Component, OnInit, Input } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { PostsService } from "../../../../services/posts.service";
import { Post } from "src/app/post.interface";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-post-container",
  templateUrl: "./post-container.component.html",
  styleUrls: ["./post-container.component.scss"]
})
export class PostContainerComponent implements OnInit {
  post: Post;
  id: string;
  isLoggedIn: boolean;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    // Subscribes to the authentication service to keep track of user's state.
    this.authService.getLoggedIn.subscribe(LoggedIn => {
      this.isLoggedIn = LoggedIn == true;
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("_id");
    this.getPost();
  }

  // Returns a post.
  getPost() {
    this.postsService.getPost(this.id).subscribe(data => {
      this.post = data;
    });
  }

  // Handles deletion of posts.
  DeletePost() {
    if (
      this.isLoggedIn &&
      confirm(
        "Are you sure you want to delete this post? It cannot be recovered once deleted"
      ) == true
    ) {
      this.postsService.deletePost(this.post._id).subscribe(
        res => {
          this.router.navigate(["/"]);
        },
        err => {
          alert("Post could not be deleted");
        }
      );
    }
  }
}
