import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { PostsService } from "src/app/services/posts.service";
import { Post } from "src/app/post.interface";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"]
})
export class UploadImageComponent implements OnInit {
  private selectedFile: File = null;
  public newImage: any;
  @Input() post: Post;

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit() {}

  // When a file has been selected for upload,
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.displayImage(event);
  }

  // When an image has been uploaded redirect the user back to the homepage.
  onSubmit() {
    const formData = new FormData();
    formData.append("postImage", this.selectedFile, this.selectedFile.name);

    if (this.router.url === "/new") {
      // Upload the post to the database.
      this.postsService.createPost(formData).subscribe(
        data => {
          this.router.navigate(["/"]);
        },
        err => {
          alert("Your image could not be posted. Please try again later");
        }
      );
    } else {
      // Upload the comment to the database.
      this.postsService.addComment(formData, this.post._id).subscribe(
        res => {
          location.reload();
        },
        err => {
          alert("Your image could not be posted. Please try again later");
        }
      );
    }
  }

  // When an image has been selected for upload, display a preview of it.
  displayImage(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => (this.newImage = reader.result);
      reader.readAsDataURL(file);
    }
  }
}
