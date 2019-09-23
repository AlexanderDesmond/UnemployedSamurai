import { Component, OnInit } from "@angular/core";

import { PostsService } from "../../../services/posts.service";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.scss"]
})
export class NewPostComponent implements OnInit {
  private selectedFile: File = null;

  constructor(private postsService: PostsService) {}

  ngOnInit() {}

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(event);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("postImage", this.selectedFile, this.selectedFile.name);
    this.postsService.createPost(formData).subscribe(res => {
      console.log(res);
    });

    console.log("Submitted");
  }
}
