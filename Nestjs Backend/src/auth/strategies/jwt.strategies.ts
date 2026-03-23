import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'suehh23hhhsh3jjskkd', 
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    // This return value becomes req.user
    return payload;
  }
}