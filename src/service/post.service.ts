import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../model/post.entity';
import { Repository } from 'typeorm';
import { PaginationQuery } from '../controller/queries/pagination.query';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
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

  async savePost(post: Post): Promise<Post | undefined> {
    return this.postRepository.save(post);
  }
}
