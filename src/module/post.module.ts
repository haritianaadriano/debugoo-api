import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../model/post.entity';
import { PostService } from '../service/post.service';
import { PostController } from '../controller/post.controller';
import { UserModule } from './user.module';
import { PostMapper } from '../controller/mapper/post.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule],
  controllers: [PostController],
  providers: [PostService, PostMapper],
  exports: [PostService],
})
export class PostModule {}
