// lib
import { Injectable } from '@nestjs/common';

// custom
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './posts.repository';
import { UserDto } from 'src/common/interfaces/user.interface';
import { Post } from './models/post.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly PostRepository: PostRepository,
  ) {}

  create(
    createPostsDto: CreatePostDto,
    { email, id: userId }: UserDto,
  ) {
    const post = new Post({
      ...createPostsDto,
      userId : userId,
      createdAt : new Date(),
      updatedAt : new Date(),
    });
    return this.PostRepository.create(post);
  }

  findAll() {
    return this.PostRepository.find({});
  }

  findOne(id: number) {
    return this.PostRepository.findOne({id});
  }

  update(id: number, updatePostsDto: UpdatePostDto) {
    return this.PostRepository.findOneAndUpdate(
      { id },
      updatePostsDto
    );
  }

  remove(id: number) {
    return this.PostRepository.findOneAndDelete({id});
  }
}
