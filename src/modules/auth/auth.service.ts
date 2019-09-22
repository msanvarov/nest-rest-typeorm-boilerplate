import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { ConfigService } from '../config/config.service';
import { JwtService } from '@nestjs/jwt';
import { Profile } from '../profile/profile.entity';
import { LoginPayload } from './payload/login.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly profileService: ProfileService,
  ) {}

  async createToken(profile: Profile) {
    return {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      accessToken: this.jwtService.sign({ id: profile.id }),
      profile,
    };
  }

  async validateUser(payload: LoginPayload) {
    const user = await this.profileService.getByUsernameAndPass(
      payload.username,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException('Wrong login combination!');
    }
    return user;
  }
}
