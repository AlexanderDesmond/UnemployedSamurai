import { Component, OnInit, Input } from "@angular/core";
import { Post } from "src/app/post.interface";
import { AuthenticationService } from "../../../../../services/authentication.service";

@Component({
  selector: "app-add-comment",
  templateUrl: "./add-comment.component.html",
  styleUrls: ["./add-comment.component.scss"]
})
export class AddCommentComponent implements OnInit {
  @Input() post: Post;

  isLoggedIn: boolean;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.getLoggedIn.subscribe(LoggedIn => {
      this.isLoggedIn = LoggedIn == true;
    });
  }
}
