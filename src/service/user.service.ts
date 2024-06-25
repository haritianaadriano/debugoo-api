import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import { Repository } from 'typeorm';
import { PaginationQuery } from '../controller/queries/pagination.query';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUsers(pagination: PaginationQuery): Promise<User[]> {
    const { page, page_size } = pagination;
    const skip = (page - 1) * page_size;

    return this.userRepository.find({
      take: page_size,
      skip,
    });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email: email as string });
  }

  async findUserById(id: string): Promise<User | undefined> {
    return this.userRepository.findOneById(id);
  }

  async saveUser(user: User): Promise<User | undefined> {
    return this.userRepository.save(user);
  }
}
