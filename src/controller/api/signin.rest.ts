import { ApiProperty } from '@nestjs/swagger';

export class SignInApi {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
