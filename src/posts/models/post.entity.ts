// lib
import { Column, Entity, Index, ManyToOne } from 'typeorm';

// custom
import { AbstractEntity } from 'src/database/abstract.entity';
import { User } from 'src/users/models/user.entity';

@Entity()
export class Post extends AbstractEntity<Post> {
  @Column()
  title: string;

  @Column()
  breif: string;

  @Column('text')
  description: string;

  @Index()
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' }) // Define many-to-one relationship
  user: User;
}