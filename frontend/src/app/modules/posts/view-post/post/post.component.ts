import { Component, OnInit, Input } from "@angular/core";
import { Post } from "src/app/post.interface";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  imageUrl: string;

  constructor() {}

  ngOnInit() {
    console.log(this.post._id);
    this.imageUrl = this.post.image_path;
  }
}
