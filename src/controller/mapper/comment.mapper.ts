import { Inject, Injectable } from '@nestjs/common';
import { UserMapper } from './user.mapper';
import { Comment } from '../../model/comment.entity';
import { CommentApi } from '../api/comment.rest';

@Injectable()
export class CommentMapper {
  constructor(
    @Inject(UserMapper)
    private readonly userMapper: UserMapper,
  ) {}

  async createdRest(comment: Comment): Promise<CommentApi> {
    const commentApi = new CommentApi();
    commentApi.content = comment.content;
    commentApi.id = comment.id;
    commentApi.creation_date = comment.creationDate;
    commentApi.author = await this.userMapper.fromDomainToRest(comment.author);
    return commentApi;
  }

  async fromDomainToRest(comment: Comment): Promise<CommentApi> {
    const commentApi = new CommentApi();
    commentApi.content = comment.content;
    commentApi.id = comment.id;
    commentApi.creation_date = comment.creationDate;
    commentApi.author = await this.userMapper.fromDomainToRest(comment.author);
    return commentApi;
  }

  async toRest(promiseComment: Promise<Comment>): Promise<CommentApi> {
    const commentApi = new CommentApi();
    const comment = await promiseComment;

    commentApi.content = comment.content;
    commentApi.id = comment.id;
    commentApi.creation_date = comment.creationDate;
    commentApi.author = await this.userMapper.fromDomainToRest(comment.author);
    return commentApi;
  }
}
