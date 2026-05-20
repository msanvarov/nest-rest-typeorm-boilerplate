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
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('WEBTOKEN_ENCRYPTION_KEY'),
    } satisfies StrategyOptionsWithoutRequest);
  }

  async validate({ iat, exp, id }: JwtPayload): Promise<User> {
    if (exp - iat <= 0) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.get(id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
