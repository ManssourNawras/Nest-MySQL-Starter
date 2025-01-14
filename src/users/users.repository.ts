// lib
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

// custom
import { AbstractRepository } from 'src/database/abstract.repository';
import { User } from './models/user.entity';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(@InjectRepository(User)
    itemsRepository: Repository<User>,
    entityManager: EntityManager,) 
  {
    super(itemsRepository, entityManager);
  }
}