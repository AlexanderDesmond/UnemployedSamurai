import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { Post } from "../post.interface";
import { PostModel } from "../model/post.model";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private http: HttpClient) {}

  createPost(formData: FormData) {
    return this.http.post("/api/posts", formData);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>("/api/posts/");
    //.pipe(map((post: Post) => new PostModel().deserialize(post)));
    // .pipe(map((data: any[]) => data.map(item => this.adapter.adapt(item))));
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>("/api/posts/" + id);
  }
}
