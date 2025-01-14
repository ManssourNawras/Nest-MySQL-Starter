// lib
import { Module } from '@nestjs/common';

// custom
import { DatabaseModule } from 'src/database/database.module';
import { User } from './models/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
    imports   : [
        DatabaseModule,
        DatabaseModule.forFeature([User]),
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersService],
})
export class UsersModule {}
