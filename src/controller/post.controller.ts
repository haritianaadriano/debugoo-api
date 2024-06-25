import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guards';
import { PostService } from '../service/post.service';
import { CreatePostApi, PostApi } from './api/post.rest';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQuery } from './queries/pagination.query';
import { PostMapper } from './mapper/post.mapper';

@Controller()
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postMapper: PostMapper,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/posts')
  @ApiCreatedResponse({
    description: 'Posts found',
    type: PostApi,
    isArray: true,
  })
  @ApiTags('Posting')
  @UsePipes(new ValidationPipe())
  async findPosts(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<PostApi[]> {
    const projects = await this.postService.findPosts(paginationQuery);
    const mappedProjects = await Promise.all(
      projects.map((project) => this.postMapper.fromDomainToRest(project)),
    );
    return mappedProjects;
  }

  @UseGuards(AuthGuard)
  @Get('/posts/:post_id')
  @ApiCreatedResponse({
    description: 'Post found',
    type: PostApi,
  })
  @ApiTags('Posting')
  async findPostsById(@Param('post_id') postId: string): Promise<PostApi> {
    return this.postMapper.fromDomainToRest(
      await this.postService.findPostById(postId),
    );
  }

  @UseGuards(AuthGuard)
  @Get('/users/:user_id/posts')
  @ApiCreatedResponse({
    description: 'Posts found from given user',
    type: PostApi,
    isArray: true,
  })
  @ApiTags('Posting')
  @UsePipes(new ValidationPipe())
  async findUserPosts(
    @Param('user_id') userId: string,
    @Query() pagination: PaginationQuery,
  ): Promise<PostApi[]> {
    const posts = await this.postService.findPostsByUserId(pagination, userId);
    const mappedPosts = await Promise.all(
      posts.map((post) => this.postMapper.fromDomainToRest(post)),
    );
    return mappedPosts;
  }

  @UseGuards(AuthGuard)
  @Put('/users/:user_id/posts')
  @ApiCreatedResponse({
    description: 'Post created',
    type: PostApi,
    isArray: true,
  })
  @ApiBody({
    isArray: true,
    type: CreatePostApi,
  })
  @ApiTags('Posting')
  async saveUserPosts(
    @Param('user_id') userId: string,
    @Body() projectsApi: CreatePostApi[],
  ): Promise<PostApi[]> {
    const posts = await this.postService.savePosts(projectsApi, userId);
    const mappedPosts = await Promise.all(
      posts.map((project) => this.postMapper.createdRest(project)),
    );
    return mappedPosts;
  }
}
