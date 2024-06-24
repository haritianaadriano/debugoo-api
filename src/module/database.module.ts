import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dummy } from '../model/dummy.entity';
import { User } from '../model/user.entity';
import { Post } from '../model/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [Dummy, User, Post],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.get('POSTGRES_USER'),
        database: configService.get('POSTGRES_DATABASE'),
        password: configService.get('POSTGRES_PASSWORD'),
        port: configService.get('POSTGRES_PORT'),
        entities: [Dummy, User, Post],
        synchronize: true,
        migrationsRun: true,
      }),
    }),
  ],
})
export class LocalDatabaseModule {}
