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

  getReaction(postid: String, username: String) {
    return this.http.post("/api/post/react/get/" + postid, {
      username: username
    });
  }

  addReaction(reaction: String, postid: String) {
    return this.http.post("/api/post/react/" + postid, { reaction: reaction });
  }

  removeReaction(postid: String) {
    return this.http.delete("/api/post/react/" + postid);
  }

  getPosts(page: number): Observable<Post[]> {
    return this.http.get<Post[]>("/api/posts/all/" + page);
  }

  getPostsTrending(): Observable<Post[]> {
    return this.http.get<Post[]>("/api/posts/trending");
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>("/api/post/" + id);
  }

  deletePost(id: string) {
    return this.http.delete("/api/post/" + id);
  }

}
