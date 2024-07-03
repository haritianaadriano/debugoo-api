import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../model/comment.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { CreateCommentApi } from '../controller/api/comment.rest';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(PostService)
    private readonly postService: PostService,
  ) {}

  async saveComment(
    toCreatePost: CreateCommentApi[],
  ): Promise<Comment[] | undefined> {
    return this.commentRepository.save(
      await this.fromCreateToDomain(toCreatePost),
    );
  }

  async fromCreateToDomain(create: CreateCommentApi[]): Promise<Comment[]> {
    return Promise.all(
      create.map((comment) => {
        return this.mapCreateToDomainComment(comment);
      }),
    );
  }

  async mapCreateToDomainComment(create: CreateCommentApi): Promise<Comment> {
    const commentDomain = new Comment();

    commentDomain.content = create.content;
    commentDomain.author = await this.userService.findUserById(
      create.author_id,
    );
    commentDomain.post = await this.postService.findPostById(create.post_id);
    commentDomain.creationDate = create.creation_date;
    return await commentDomain;
  }
}
