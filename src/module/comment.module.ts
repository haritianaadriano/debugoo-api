import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../model/comment.entity';
import { UserModule } from './user.module';
import { PostModule } from './post.module';
import { CommentService } from '../service/comment.service';
import { CommentMapper } from '../controller/mapper/comment.mapper';
import { CommentController } from '../controller/comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule, PostModule],
  controllers: [CommentController],
  providers: [CommentService, CommentMapper],
})
export class CommentModule {}
