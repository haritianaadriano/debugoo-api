import { ApiProperty } from '@nestjs/swagger';
import { UserApi } from './user.rest';

export class CommentApi {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  author: UserApi;

  @ApiProperty()
  creation_date: Date;
}

export class CreateCommentApi {
  @ApiProperty()
  content: string;

  @ApiProperty()
  creation_date: Date;

  @ApiProperty()
  author_id: string;

  @ApiProperty()
  post_id: string;
}
