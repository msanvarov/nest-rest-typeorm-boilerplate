import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithoutRequest } from 'passport-jwt';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

interface JwtPayload {
  id: number;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const secret = configService.get<string>('WEBTOKEN_ENCRYPTION_KEY');
    if (!secret) {
      throw new Error('WEBTOKEN_ENCRYPTION_KEY is not configured');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    } satisfies StrategyOptionsWithoutRequest);
  }

  async validate({ id }: JwtPayload): Promise<User> {
    const user = await this.usersService.get(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
