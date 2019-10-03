import { Component, OnInit, Input } from '@angular/core';
import { Reaction } from '../../../../../../app/model/reaction.model';
import { PostsService } from '../../../../../services/posts.service';
import { AuthenticationService } from "../../../../../services/authentication.service";

@Component({
  selector: 'app-reaction-container',
  templateUrl: './reaction-container.component.html',
  styleUrls: ['./reaction-container.component.scss']
})
export class ReactionContainerComponent implements OnInit {

  @Input() reaction: Reaction;
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

  SelectReaction(type: String) {
    switch (type) {
      case "r1":
        console.log("Smiley");
        break;
    }
    console.log("Reaction selected");
  }

  RemoveReaction() {
    console.log("Remove reaction");
  }

}
