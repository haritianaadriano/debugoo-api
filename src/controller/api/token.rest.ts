import { ApiProperty } from '@nestjs/swagger';

export class TokenApi {
  @ApiProperty()
  email: string;

  @ApiProperty()
  token: string;
}
