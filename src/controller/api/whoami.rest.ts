import { ApiProperty } from '@nestjs/swagger';

export class WhoamiApi {
  @ApiProperty()
  id: string;

  @ApiProperty()
  bearer: string;
}
