import { Component, OnInit, Input } from '@angular/core';
import { Post } from "src/app/post.interface";
import { PostsService } from "../../../../../services/posts.service";

@Component({
  selector: 'app-comments-container',
  templateUrl: './comments-container.component.html',
  styleUrls: ['./comments-container.component.scss']
})
export class CommentsContainerComponent implements OnInit {
  @Input() comments: string[];
  post: Post;
  test: string;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.test = "hello world";
    console.log(this.comments);

    this.postsService.getPost(this.comments[0].toString()).subscribe(data => {
      this.post = data;
    });
  }

  getComments() {
    return this.comments;
  }

}
