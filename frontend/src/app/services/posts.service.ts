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

  createPost(formData: FormData): Observable<Post> {
    return this.http.post<Post>("/api/post/new", formData);
  }

  addComment(formData: FormData, postid: String) {
    return this.http.post("/api/post/comment/" + postid, formData);
  }

  addReaction(reaction: String, postid: String) {
    return this.http.post("/api/post/react/" + postid, { reaction: reaction });
  }

  removeReaction(postid: String) {
    return this.http.delete("/api/post/react/" + postid);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>("/api/posts/all");
    //.pipe(map((post: Post) => new PostModel().deserialize(post)));
    // .pipe(map((data: any[]) => data.map(item => this.adapter.adapt(item))));
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>("/api/post/" + id);
  }
}
