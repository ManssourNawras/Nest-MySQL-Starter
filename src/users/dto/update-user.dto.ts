// lib
import { PartialType } from '@nestjs/mapped-types';

// custom
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}