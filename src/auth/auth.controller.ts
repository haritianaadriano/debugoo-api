import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from '../service/user.service';
import { Public } from '../module/decorator/public-access.decorator';
import { CurrentUser } from '../module/decorator/current-user.decorator';
import { UserMapper } from '../controller/mapper/user.mapper';
import { WhoamiApi } from '../controller/api/whoami.rest';
import { TokenApi } from '../controller/api/token.rest';
import { SignInApi } from '../controller/api/signin.rest';
import { UserApi } from '../controller/api/user.rest';
import { SignupApi } from '../controller/api/signup.rest';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @Public()
  @Get('/whoami')
  @ApiAcceptedResponse({
    description:
      'Tells you who you are by giving token in Bearer Authentication',
    type: WhoamiApi,
  })
  @ApiTags('Auth')
  whoami(@CurrentUser() token): Promise<WhoamiApi> {
    return this.userMapper.toWhoamiApi(this.authService.retrieveUser(token));
  }

  @Public()
  @Post('/signin')
  @ApiCreatedResponse({
    description: 'Token provided',
    type: TokenApi,
  })
  @ApiTags('Auth')
  signIn(@Body() signIn: SignInApi): Promise<TokenApi> {
    return this.authService.signIn(signIn.email, signIn.password);
  }

  @Public()
  @Post('/signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiCreatedResponse({
    description: 'User created',
    type: UserApi,
  })
  @ApiOperation({
    description: 'Create new user',
  })
  @ApiTags('Auth')
  signUp(@Body() toCreate: SignupApi): Promise<UserApi> {
    const user = this.userMapper.signupApiToDomain(toCreate);
    const userToRest = this.userService.saveUser(user);
    return this.userMapper.toRest(userToRest);
  }
}
