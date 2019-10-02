import { Component, OnInit, Input } from '@angular/core';
import { Post } from "src/app/post.interface";
import { PostsService } from "../../../../../services/posts.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() id: string;
  post : Post;

  constructor(private postsService: PostsService) { }

  ngOnInit() {

    // read post from database
    this.postsService.getPost(this.id).subscribe(data => {
      this.post = data;
    });

  }

}
