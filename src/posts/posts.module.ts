// lib
import { Module } from '@nestjs/common';

// custom
import { DatabaseModule } from 'src/database/database.module';
import { Post } from './models/post.entity';
import { PostRepository } from './posts.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';




@Module({
    imports   : [
        DatabaseModule,
        DatabaseModule.forFeature([Post]),
    ],
    controllers: [PostsController],
    providers: [PostsService , PostRepository],
})

export class PostsModule {}
