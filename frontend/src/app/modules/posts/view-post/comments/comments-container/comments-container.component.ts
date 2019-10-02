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

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    for (let i=0; i<this.comments.length; i++)
      console.log(this.comments[i]);

    /* this.postsService.getPost(this.comments[0].toString()).subscribe(data => {
      this.post = data;
    }); */
  }

}
