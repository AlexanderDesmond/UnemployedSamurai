import { Component, OnInit, Input } from "@angular/core";
import { PostsService } from "../../../../../services/posts.service";
import { Router } from "@angular/router";
import { Post } from "src/app/post.interface";
import { AuthenticationService } from "../../../../../services/authentication.service";

@Component({
  selector: "app-add-comment",
  templateUrl: "./add-comment.component.html",
  styleUrls: ["./add-comment.component.scss"]
})
export class AddCommentComponent implements OnInit {
  @Input() post: Post;
  private selectedFile: File = null;
  public newImage: any;
  isLoggedIn: boolean;

  constructor(
    private postsService: PostsService,
    private router: Router,
    private authService: AuthenticationService
    ) {}

  ngOnInit() {
    this.authService.getLoggedIn.subscribe(LoggedIn => {
      this.isLoggedIn = LoggedIn == true;
    });
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

    this.postsService.addComment(formData, this.post._id).subscribe(res => {
      console.log(res);
    });

    location.reload();

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
