import { Inject, Injectable } from '@nestjs/common';
import { PostApi } from '../api/post.rest';
import { Post } from '../../model/post.entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class PostMapper {
  constructor(
    @Inject(UserMapper)
    private readonly userMapper: UserMapper,
  ) {}

  async createdRest(post: Post): Promise<PostApi> {
    const postApi = new PostApi();
    postApi.content = post.content;
    postApi.id = post.id;
    postApi.creation_date = post.creationDate;
    postApi.title = postApi.title;
    postApi.user = await this.userMapper.fromDomainToRest(post.user);
    return postApi;
  }

  async fromDomainToRest(post: Post): Promise<PostApi> {
    const postApi = new PostApi();
    postApi.content = post.content;
    postApi.id = post.id;
    postApi.creation_date = post.creationDate;
    postApi.title = post.title;
    postApi.user = await this.userMapper.fromDomainToRest(post.user);
    return postApi;
  }

  async toRest(promisePost: Promise<Post>): Promise<PostApi> {
    const postApi = new PostApi();
    const post = await promisePost;

    postApi.content = post.content;
    postApi.id = post.id;
    postApi.creation_date = post.creationDate;
    postApi.title = post.title;
    postApi.user = await this.userMapper.fromDomainToRest(post.user);
    return postApi;
  }
}
