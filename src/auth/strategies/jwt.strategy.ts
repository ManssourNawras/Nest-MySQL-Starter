import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Custom
import { UsersService } from 'src/users/users.service';
import { TokenPayload } from '../../common/interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) =>
          request?.headers?.authorization?.split(' ')[1] || // Bearer <token>
          request?.cookies?.Authentication || 
          request?.Authentication,
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.usersService.getUser({ id: payload.userId });

    if (!user) {
      throw new UnauthorizedException('User not found or invalid token');
    }

    // Attach additional logic or checks if required
    return user;
  }
}