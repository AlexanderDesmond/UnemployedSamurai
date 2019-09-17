import { Post } from "../post.interface";

export class PostClass implements Post {
  imageUrl: string;
  username: string;

  constructor(post: Post) {
    this.imageUrl = post.imageUrl;
    this.username = post.username;
  }
}
