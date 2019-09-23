import { ExtractJwt, Strategy, JwtPayload } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly profileService: ProfileService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('WEBTOKEN_SECRET_KEY'),
    });
  }

  async validate({ iat, exp, id }: JwtPayload, done) {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }

    const profile = await this.profileService.get(id);
    if (!profile) {
      throw new UnauthorizedException();
    }

    delete profile.password;
    done(null, { ...profile, roles: profile.roles.map(role => role.role) });
    return true;
  }
}
