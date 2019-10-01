import { Post } from "../post.interface";
import { Comment } from "./comment.model";
import { Reaction } from "./reaction.model";
import { Deserializable } from "./deserializable.interface";

export class PostModel implements Deserializable {
  author: string;
  comments: Comment[];
  image_path: string;
  post_date: string;
  reaction: Reaction[];
  __v: number;
  _id: string;

  constructor() {}

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
