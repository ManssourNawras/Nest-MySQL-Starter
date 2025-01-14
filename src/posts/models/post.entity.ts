// lib
import { Column, Entity, Index } from 'typeorm';

// custom
import { AbstractEntity } from 'src/database/abstract.entity';

@Entity()
export class Post extends AbstractEntity<Post> {
  @Column()
  title: string;

  @Column()
  breif: string;

  @Column('text')
  description: string;

  @Index()
  @Column()
  userId: number;
}