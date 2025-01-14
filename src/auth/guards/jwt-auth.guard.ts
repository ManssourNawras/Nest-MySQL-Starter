import {
  ExecutionContext,
  UnauthorizedException,
  Logger,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import * as JWTObj from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private readonly configService: ConfigService) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Extract JWT token
    const token =
      request.cookies?.Authentication ||
      request.headers?.authentication ||
      request?.headers?.authorization?.split(' ')[1];

    if (!token) {
      this.logger.warn('JWT token not found in request');
      throw new UnauthorizedException('Authentication token missing');
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET');

      // Verify and decode the token
      const decoded = JWTObj.verify(token, secret);

      // Attach user to the request
      request.user = decoded;

      this.logger.log('JWT validated successfully');

      // Continue with the default AuthGuard behavior
      return super.canActivate(context);
    } catch (error) {
      this.logger.error('JWT validation failed', error.stack);

      if (error instanceof JWTObj.TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      } else if (error instanceof JWTObj.JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      }
      throw new UnauthorizedException('Unauthorized access');
    }
  }
}
