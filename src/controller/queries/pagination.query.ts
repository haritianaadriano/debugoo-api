import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min, NotEquals } from 'class-validator';

export class PaginationQuery {
  @NotEquals(null)
  @IsInt()
  @Min(1)
  @ApiProperty({
    minimum: 1,
    title: 'page',
    format: 'int32',
    default: 1,
  })
  page: number;

  @NotEquals(null)
  @IsInt()
  @Max(50)
  @ApiProperty({
    maximum: 10,
    title: 'page_size',
    format: 'int32',
  })
  page_size: number;
}
