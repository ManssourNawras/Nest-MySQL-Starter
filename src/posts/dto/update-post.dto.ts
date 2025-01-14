// lib
import { PartialType } from '@nestjs/mapped-types';

// custom
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}