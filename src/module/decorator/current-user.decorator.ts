import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const [type, bearer] = request.headers.authorization?.split(' ') ?? [];
    const token = type === 'Bearer' ? bearer : undefined;
    return token;
  },
);
