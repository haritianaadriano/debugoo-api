import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserMapper } from './mapper/user.mapper';
import { AuthGuard } from '../auth/guards/auth.guards';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserApi } from './api/user.rest';
import { PaginationQuery } from './queries/pagination.query';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/users')
  @ApiCreatedResponse({
    description: 'Users found',
    type: UserApi,
    isArray: true,
  })
  @ApiTags('Users')
  @UsePipes(new ValidationPipe())
  async findUsers(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<UserApi[]> {
    const users = await this.userService.findUsers(paginationQuery);
    const mappedUsers = await Promise.all(
      users.map((user) => this.userMapper.fromDomainToRest(user)),
    );
    return mappedUsers;
  }

  @UseGuards(AuthGuard)
  @Get('/users/:id')
  @ApiCreatedResponse({
    description: 'User found',
    type: UserApi,
  })
  @ApiTags('Users')
  async findUserById(@Param('id') id: string): Promise<UserApi> {
    const user = await this.userService.findUserById(id);
    const mappedUser = this.userMapper.fromDomainToRest(user);
    return mappedUser;
  }
}
