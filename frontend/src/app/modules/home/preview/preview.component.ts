import { Component, OnInit, Input } from "@angular/core";

import { Post } from "src/app/post.interface";

@Component({
  selector: "app-preview",
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.scss"]
})
export class PreviewComponent implements OnInit {
  @Input() post: Post;

  // Until we have S3 set up.
  path: string = "../../../../../../backend-api/uploads/";

  constructor() {}

  ngOnInit() {
    console.log(this.post.image_path);
    console.log(this.post.author);
  }
}
