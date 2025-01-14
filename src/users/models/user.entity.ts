// lib
import { Column, Entity, Index, OneToMany } from 'typeorm';

// custom
import { AbstractEntity } from 'src/database/abstract.entity';
import { Post } from 'src/posts/models/post.entity';


@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user) // Define one-to-many relationship
  posts: Post[];

}