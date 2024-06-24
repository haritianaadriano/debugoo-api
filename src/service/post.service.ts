import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../model/post.entity';
import { Repository } from 'typeorm';
import { PaginationQuery } from '../controller/queries/pagination.query';
import { UserService } from './user.service';
import { CreatePostApi } from 'src/controller/api/post.rest';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async findProjects(pagination: PaginationQuery): Promise<Post[]> {
    const { page, page_size } = pagination;
    const skip = (page - 1) * page_size;

    return this.postRepository.find({
      take: page_size,
      skip,
    });
  }

  async findPostById(id: string): Promise<Post | undefined> {
    return this.postRepository.findOneById(id);
  }

  async savePosts(toCreatePost: CreatePostApi[]): Promise<Post[] | undefined> {
    return this.postRepository.save(
      await this.fromCreateToDomain(toCreatePost),
    );
  }

  async mapCreateToDomainPost(create: CreatePostApi): Promise<Post> {
    const postDomain = new Post();

    postDomain.content = create.content;
    postDomain.title = create.title;
    postDomain.user = await this.userService.findUserById(create.user_id);
    return await postDomain;
  }

  async fromCreateToDomain(create: CreatePostApi[]): Promise<Post[]> {
    return Promise.all(
      create.map((project) => {
        return this.mapCreateToDomainPost(project);
      }),
    );
  }
}
