import { ApiProperty } from '@nestjs/swagger';
import { UserApi } from './user.rest';

export class PostApi {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  creation_date: Date;

  @ApiProperty()
  user: UserApi;
}

export class CreatePostApi {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  creation_date: Date;

  @ApiProperty()
  user_id: string;
}
