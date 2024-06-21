import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, LocalDatabaseModule } from './module/database.module';
import { DbHealthModule } from './module/dummy.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, DbHealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
