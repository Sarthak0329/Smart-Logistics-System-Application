import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategies';
import { jwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'suehh23hhhsh3jjskkd',
      signOptions: { expiresIn: '2h' },
    }),
  ],

  providers: [
    JwtStrategy,
    jwtAuthGuard,
    RolesGuard,
  ],

  exports: [
    PassportModule,
    JwtModule,
    jwtAuthGuard,
    RolesGuard,
  ],
})
export class AuthModule {}