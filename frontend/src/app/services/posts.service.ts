import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { Post } from "../post.interface";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private http: HttpClient) {}

  createPost(formData: FormData) {
    // https://www.freecodecamp.org/news/how-to-make-image-upload-easy-with-angular-1ed14cb2773b/
    // attached images must be sent as form-data
    //const formData = new FormData();
    // "postImage" is the key which the backend is looking for
    //formData.append("postImage", image);

    return this.http.post("/api/posts", formData);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>("/api/posts/");
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>("/api/posts/" + id);
  }
}
