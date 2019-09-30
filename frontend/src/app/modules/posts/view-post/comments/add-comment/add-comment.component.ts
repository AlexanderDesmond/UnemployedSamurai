import { Component, OnInit } from "@angular/core";
import { PostsService } from "../../../../../services/posts.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-comment",
  templateUrl: "./add-comment.component.html",
  styleUrls: ["./add-comment.component.scss"]
})
export class AddCommentComponent implements OnInit {
  private selectedFile: File = null;
  public newImage: any;

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit() {}

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(event);

    console.log(typeof this.selectedFile);

    this.displayImage(event);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("postImage", this.selectedFile, this.selectedFile.name);
    // this.postsService.createPost(formData).subscribe(res => {
    //   console.log(res);
    // });

    // console.log("Submitted");

    // this.postsService.getPost("test").subscribe(res => {
    //   console.log(res);
    // });
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
