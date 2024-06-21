import { Controller, Get } from '@nestjs/common';
import { DummyService } from '../../service/dummy.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/health/db')
export class DbHealthController {
  constructor(private readonly dummyService: DummyService) {}

  @Get()
  @ApiTags('health')
  getDbHealth(): Promise<string> {
    return this.dummyService.findAll();
  }
}
