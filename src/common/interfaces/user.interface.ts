import { Post } from "src/posts/models/post.entity";

export interface UserDto {
  id: number;
  name : string,
  email: string;
  password: string;
  createdAt : Date,
  updatedAt : Date,
  posts : Post[]
}