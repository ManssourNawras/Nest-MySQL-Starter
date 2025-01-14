// lib
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

// custom
import { AbstractRepository } from 'src/database/abstract.repository';
import { Post } from './models/post.entity';

@Injectable()
export class PostRepository extends AbstractRepository<Post> {
  protected readonly logger = new Logger(PostRepository.name);

  constructor(
    @InjectRepository(Post)
    itemsRepository: Repository<Post>,
    entityManager: EntityManager,
  ) {
    // console.log('Collection Name:', postModel.collection.name);
    super(itemsRepository, entityManager);
  }
}