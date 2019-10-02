import { Component, OnInit, Input } from '@angular/core';
import { Post } from "src/app/post.interface";
import { PostsService } from "../../../../../services/posts.service";
import { AuthenticationService } from "../../../../../services/authentication.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent implements OnInit {
  @Input() id: string;
  post : Post;
  imageUrl: string;
  isLoggedIn: boolean;

  constructor(
    private postsService: PostsService,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {

    this.authService.getLoggedIn.subscribe(LoggedIn => {
      this.isLoggedIn = LoggedIn == true;
    });

    // read post from database
    this.postsService.getPost(this.id).subscribe(data => {
      this.post = data;
      this.imageUrl = this.post.image_path;
    });

  }

}
