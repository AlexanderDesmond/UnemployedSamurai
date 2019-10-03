import { Component, OnInit, Input } from '@angular/core';
import { Reaction } from '../../../../../../app/model/reaction.model';
import { PostsService } from '../../../../../services/posts.service';
import { AuthenticationService } from "../../../../../services/authentication.service";
import { Post } from "src/app/post.interface";

@Component({
  selector: 'app-reaction-container',
  templateUrl: './reaction-container.component.html',
  styleUrls: ['./reaction-container.component.scss']
})
export class ReactionContainerComponent implements OnInit {

  @Input() post: Post;
  isLoggedIn: boolean;
  reacting: boolean;

  constructor(
    private postsSerivce: PostsService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authService.getLoggedIn.subscribe(LoggedIn => {
      this.isLoggedIn = LoggedIn == true;
    });
  }

  RemoveReaction() {
    console.log("Remove reaction");
    this.postsSerivce.removeReaction(this.post._id).subscribe(res => {
      console.log(res);
    });
  }

  SelectReaction(reaction: String) {
    if (!this.reacting) { // used to stop spamming reactions
      this.reacting = true;

      this.postsSerivce.removeReaction(this.post._id).subscribe(res => {
        this.postsSerivce.addReaction(reaction, this.post._id).subscribe(res => {
          console.log(res);
          this.reacting = false;
        },
        err => {
          alert("Could not react to post. Please try again later");
          this.reacting = false;
        });
      },
      err => {
        alert("Could not react to post. Please try again later");
        this.reacting = false;
      });
    }
  }

}
