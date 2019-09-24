import { Component, OnInit, Input } from "@angular/core";

import { Post } from "src/app/post.interface";

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"]
})
export class PreviewComponent implements OnInit {
  @Input() post: Post;

  constructor() {}

  ngOnInit() {
    console.log(this.post.imageUrl);
  }
}
