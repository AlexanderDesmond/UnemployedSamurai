import { Reaction } from "./model/reaction.model";

export interface Post {
  author: string;
  comments: string[];
  image_path: string;
  post_date: string;
  reactions: Reaction;
  __v: number;
  _id: string;
}
