import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../service/user.service';
import { jwtConstants } from './constant';
import { User } from '../model/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async retrieveUser(token: string): Promise<{ user: User; bearer: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      const toBearer = {
        id: payload.id,
        firstname: payload.firstname,
        lastname: payload.lastname,
        username: payload.username,
        email: payload.email,
        description: payload.description,
        birthdate: payload.birthdate,
        creation_datetime: payload.creationDate,
      };

      return {
        user: await this.userService.findUserById(payload.id),
        bearer: await this.jwtService.signAsync(toBearer),
      };
    } catch {
      throw new HttpException(
        'Cannot map user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ email: string; token: string }> {
    const user = await this.userService.findUserByEmail(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      description: user.description,
      birthdate: user.birthdate,
      creation_datetime: user.creationDate,
    };
    return {
      email: user.email,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
