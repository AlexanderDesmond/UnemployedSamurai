import { Comment } from "./model/comment.model";
import { Reaction } from "./model/reaction.model";

export interface Post {
  author: string;
  comments: Comment[];
  image_path: string;
  postDate: string;
  reactions: Reaction[];
  version: number;
  id: string;
}
