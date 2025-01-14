// lib
import { ExecutionContext, UnauthorizedException ,Logger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as JWTObj from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private readonly logger = new Logger(JwtAuthGuard.name);
    
    constructor(private readonly configService: ConfigService){
       super();
    }
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        const request = context.switchToHttp().getRequest();
    
        // Extract JWT from cookies or headers
        const jwt = request.cookies?.Authentication || 
                request.headers?.authentication || 
                request?.headers?.authorization?.split(' ')[1]; // Bearer <token>
    
        if (!jwt) {
          this.logger.warn('JWT token not found in request');
          throw new UnauthorizedException('Authentication token missing');
        }
        // console.log("==== data ======", jwt)
        try {
            const secret = this.configService.get<string>('JWT_SECRET');
            // const secret = process.env.JWT_SECRET;
            // Verify and decode the JWT using the JWT_SECRET key
            const decoded = JWTObj.verify(jwt, secret);
    
            // Attach the decoded user object to the request
            request.user = decoded;
            
            // Call the super method to invoke the default behavior of AuthGuard
            return super.canActivate(context);
        } catch (error) {
          this.logger.error('Invalid JWT token', error.stack);
          if (error instanceof JWTObj.TokenExpiredError) {
            throw new UnauthorizedException('Token has expired');
          } else if (error instanceof JWTObj.JsonWebTokenError) {
            throw new UnauthorizedException('Invalid token');
          }
          throw new UnauthorizedException('Unauthorized access');
        }
    }
}
