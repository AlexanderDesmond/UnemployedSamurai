import { Component, OnInit } from "@angular/core";

import { PostsService } from "../../../services/posts.service";
import { AuthenticationService } from "../../../services/authentication.service";
import { Router } from "@angular/router";
import { Post } from "src/app/post.interface";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.scss"]
})
export class NewPostComponent implements OnInit {
  private selectedFile: File = null;
  public newImage: any;
  private id: string;
  private post: Post;

  constructor(
    private postsService: PostsService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.getCurrentUser()) {
      this.router.navigate(["/"]);
    }
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(event);

    console.log(typeof this.selectedFile);

    this.displayImage(event);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("postImage", this.selectedFile, this.selectedFile.name);
    this.postsService.createPost(formData).subscribe(data => {
      console.log("Data: " + data);
      this.router.navigate(["/"]);
    });

  }

  displayImage(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => (this.newImage = reader.result);
      reader.readAsDataURL(file);
    }
  }
}
