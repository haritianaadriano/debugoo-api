import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dummy } from '../model/dummy.entity';
import { DummyService } from '../service/dummy.service';
import { DbHealthController } from '../controller/health/health.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dummy])],
  providers: [DummyService],
  controllers: [DbHealthController],
})
export class DbHealthModule {}
