import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Post } from "../post.interface";

/**
 * References:
 * https://www.youtube.com/watch?v=_05v0mrNLh0
 * https://angular.io/tutorial/toh-pt6
 */

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private http: HttpClient) {}

  // Uploads new post to the database from form data
  // which contains an image with key postImage
  createPost(formData: FormData): Observable<Post> {
    return this.http.post<Post>("/api/post/new", formData);
  }

  // Adds new comment to a post using form data
  // form data contians an image with key postImage
  addComment(formData: FormData, postid: String) {
    return this.http.post("/api/post/comment/" + postid, formData);
  }

  // Returns the user's reaction to a post.
  getReaction(postid: String, username: String) {
    return this.http.post("/api/post/react/get/" + postid, {
      username: username
    });
  }

  // Adds a reaction for the current user to the provided postid
  addReaction(reaction: String, postid: String) {
    return this.http.post("/api/post/react/" + postid, { reaction: reaction });
  }

  // Removes a reaction from the provided postid
  removeReaction(postid: String) {
    return this.http.delete("/api/post/react/" + postid);
  }

  // Get a list of posts from the api in decending recent
  // order
  getPosts(page: number) {
    return this.http.get<Post[]>("/api/posts/all/" + page);
  }

  // Return list of posts sorted by number of reacts.
  getPostsTrending(page: number) {
    return this.http.get<Post[]>("/api/posts/trending/" + page);
  }

  // return an obserable Post interface object with the provided
  // id.
  getPost(id: string): Observable<Post> {
    return this.http.get<Post>("/api/post/" + id);
  }

  // Try remove a post with id and with current user login
  // using the http interceptor
  deletePost(id: string) {
    return this.http.delete("/api/post/" + id);
  }
}
