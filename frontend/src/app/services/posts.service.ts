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

  // Uploads new post to the database.
  createPost(formData: FormData): Observable<Post> {
    return this.http.post<Post>("/api/post/new", formData);
  }

  // Adds new comment to a post.
  addComment(formData: FormData, postid: String) {
    return this.http.post("/api/post/comment/" + postid, formData);
  }

  // Returns the user's reaction to a post.
  getReaction(postid: String, username: String) {
    return this.http.post("/api/post/react/get/" + postid, {
      username: username
    });
  }

  // Adds a reaction.
  addReaction(reaction: String, postid: String) {
    return this.http.post("/api/post/react/" + postid, { reaction: reaction });
  }

  // Removes a reaction.
  removeReaction(postid: String) {
    return this.http.delete("/api/post/react/" + postid);
  }

  // Return lost of posts.
  getPosts(page: number) {
    return this.http.get<Post[]>("/api/posts/all/" + page);
  }

  // Return list of posts sorted by number of reacts.
  getPostsTrending(page: number) {
    return this.http.get<Post[]>("/api/posts/trending/" + page);
  }

  // Return post.
  getPost(id: string): Observable<Post> {
    return this.http.get<Post>("/api/post/" + id);
  }

  // Delete post.
  deletePost(id: string) {
    return this.http.delete("/api/post/" + id);
  }
}
