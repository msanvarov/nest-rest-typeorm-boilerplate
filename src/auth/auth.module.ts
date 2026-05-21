import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRoles } from '../users/user-role.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRoles]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('WEBTOKEN_ENCRYPTION_KEY'),
        signOptions: {
          expiresIn: Number(
            configService.get<number>('WEBTOKEN_EXPIRATION_TIME') ?? 1800,
          ),
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService],
  exports: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
