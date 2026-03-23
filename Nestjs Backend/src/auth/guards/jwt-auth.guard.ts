import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

//jwt guard with check the token coming from the user whenever he tries to access an endpoint 
@Injectable()
export class jwtAuthGuard extends AuthGuard('jwt'){
  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
      if(err || !user)
        throw new UnauthorizedException('Invalid or missing token');
    return user;//attached the user property to the client request
  }
}

