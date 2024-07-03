import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { AuthGuard } from '../auth/guards/auth.guards';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CommentApi, CreateCommentApi } from './api/comment.rest';
import { CommentMapper } from './mapper/comment.mapper';

@Controller()
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentMapper: CommentMapper,
  ) {}

  @UseGuards(AuthGuard)
  @Put('/posts/:post_id/comments')
  @ApiCreatedResponse({
    description: 'Comment created',
    type: CommentApi,
    isArray: true,
  })
  @ApiBody({
    isArray: true,
    type: CreateCommentApi,
  })
  @ApiTags('Commenting')
  async savePostComments(
    @Param('post_id') postId: string,
    @Body() commentsApi: CreateCommentApi[],
  ): Promise<CommentApi[]> {
    const comments = await this.commentService.saveComments(commentsApi);
    const mappedComments = await Promise.all(
      comments.map((comment) => this.commentMapper.createdRest(comment)),
    );
    return mappedComments;
  }
}
