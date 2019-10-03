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

  constructor(
    private postsSerivce: PostsService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authService.getLoggedIn.subscribe(LoggedIn => {
      this.isLoggedIn = LoggedIn == true;
    });
  }

  SelectReaction(reaction: String) {
    console.log("Reaction selected");
    this.postsSerivce.addReaction(reaction, this.post._id).subscribe(res => {
      console.log(res);
    })
  }

  RemoveReaction() {
    console.log("Remove reaction");
    this.postsSerivce.removeReaction(this.post._id).subscribe(res => {
      console.log(res);
    });
  }

}
