import { Component, OnInit, Input } from "@angular/core";
import { Post } from "src/app/post.interface";
import { PostsService } from "../../../../../services/posts.service";

@Component({
  selector: "app-comments-container",
  templateUrl: "./comments-container.component.html",
  styleUrls: ["./comments-container.component.scss"]
})
export class CommentsContainerComponent implements OnInit {
  @Input() comments: string[];
  @Input() level: number;

  constructor(private postsService: PostsService) {}

  ngOnInit() {}
}
