import { Component, OnInit, Input } from "@angular/core";
import { Reaction } from "../../../../../../app/model/reaction.model";
import { PostsService } from "../../../../../services/posts.service";
import { AuthenticationService } from "../../../../../services/authentication.service";
import { Post } from "src/app/post.interface";

@Component({
  selector: "app-reaction-container",
  templateUrl: "./reaction-container.component.html",
  styleUrls: ["./reaction-container.component.scss"]
})
export class ReactionContainerComponent implements OnInit {
  @Input() post: Post;
  isLoggedIn: boolean;
  reacting: boolean;
  current: string; // current reaction

  constructor(
    private postsSerivce: PostsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.getLoggedIn.subscribe(LoggedIn => {
      this.isLoggedIn = LoggedIn == true;
      this.GetReaction();
    });
  }

  // Get reaction.
  GetReaction() {
    if (this.isLoggedIn) {
      this.postsSerivce
        .getReaction(this.post._id, this.authService.getCurrentUser())
        .subscribe(
          res => {
            this.current = res["reaction"];
          },
          err => {}
        );
    }
  }

  // Remove reaction.
  RemoveReaction() {
    if (!this.isLoggedIn) {
      this.AskLogin();
      return;
    }

    this.postsSerivce.removeReaction(this.post._id).subscribe(res => {
      this.current = "";
      this.UpdatePost();
    });
  }

  // Select reaction.
  SelectReaction(reaction: string) {
    if (!this.isLoggedIn) {
      this.AskLogin();
      return;
    }

    if (!this.reacting && this.current != reaction) {
      // used to stop spamming reactions
      this.reacting = true;
      // set reaction early for less input delay
      // and reset reaction if there was an error
      this.current = reaction;

      this.postsSerivce.removeReaction(this.post._id).subscribe(
        res => {
          this.postsSerivce.addReaction(reaction, this.post._id).subscribe(
            res => {
              this.UpdatePost();
              this.reacting = false;
            },
            err => {
              alert("Could not react to post. Please try again later");
              this.current = "";
              this.reacting = false;
            }
          );
        },
        err => {
          alert("Could not react to post. Please try again later");
          this.current = "";
          this.reacting = false;
        }
      );
    }
  }

  // Update post.
  UpdatePost() {
    this.postsSerivce.getPost(this.post._id).subscribe(res => {
      this.post = res;
    });
  }

  // If a user is not logged in display message.
  AskLogin() {
    alert("Please login with an account in order to react to posts! :D");
  }
}
