import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Post } from "../post.interface";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private http: HttpClient) {}

  createPost(imageUrl: string, username: string): Observable<Post> {
    return this.http.post<Post>("/api/posts", { imageUrl, username });
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>("/api/posts/");
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>("/api/posts/" + id);
  }
}
