import { IsNotEmpty, IsString } from 'class-validator';

export class GetPostDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
}