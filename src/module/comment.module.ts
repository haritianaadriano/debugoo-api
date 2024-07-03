import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../model/comment.entity';
import { UserModule } from './user.module';
import { PostModule } from './post.module';
import { CommentService } from 'src/service/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule, PostModule],
  providers: [CommentService],
})
export class CommentModule {}
