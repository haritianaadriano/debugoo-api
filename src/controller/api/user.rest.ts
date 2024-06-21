import { ApiProperty } from '@nestjs/swagger';

export class UserApi {
  @ApiProperty()
  id: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  lastname: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  birthdate: Date;
  @ApiProperty()
  creation_datetime: Date;

  constructor() {}
}
