// lib
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// custom
import { User } from 'src/users/models/user.entity';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);