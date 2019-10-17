import { Component, OnInit, Input } from "@angular/core";
import { Post } from "src/app/post.interface";
import { PostsService } from "../../../../../services/posts.service";
import { AuthenticationService } from "../../../../../services/authentication.service";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.scss"]
})
export class CommentComponent implements OnInit {
  @Input() id: string;
  @Input() level: number;
  post: Post;
  imageUrl: string;
  isLoggedIn: boolean;
  replyText: string;

  constructor(
    private postsService: PostsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    // Subscribes to the authentication service to keep track of user's state.
    this.authService.getLoggedIn.subscribe(LoggedIn => {
      this.isLoggedIn = LoggedIn == true;
    });

    // read post from database
    this.postsService.getPost(this.id).subscribe(data => {
      this.post = data;
      this.imageUrl = this.post.image_path;
    });
  }

  // Handle deletion of comments.
  DeleteComment() {
    if (
      this.isLoggedIn &&
      confirm(
        "Are you sure you want to delete this comment? It cannot be recovered once deleted"
      ) == true
    ) {
      this.postsService.deletePost(this.post._id).subscribe(
        res => {
          location.reload();
        },
        err => {
          alert("Comment could not be deleted");
          console.log(err);
        }
      );
    }
  }
}
