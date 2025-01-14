// lib
import { Column, Entity, Index } from 'typeorm';

// custom
import { AbstractEntity } from 'src/database/abstract.entity';


@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

}