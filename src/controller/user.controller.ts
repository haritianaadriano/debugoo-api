import { Controller } from '@nestjs/common';
import { UserService } from 'src/service/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
}
