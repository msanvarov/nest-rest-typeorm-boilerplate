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

  async createToken({ id, username, name, email }: Profile) {
    return {
      expires: this.configService.get('WEBTOKEN_EXPIRATION_TIME'),
      expiresPrettyPrint: this.prettyPrintSeconds(
        this.configService.get('WEBTOKEN_EXPIRATION_TIME'),
      ),
      token: this.jwtService.sign({
        id,
        username,
        name,
        email,
      }),
    };
  }

  private prettyPrintSeconds(time: string) {
    const ntime = Number(time);
    const hours = Math.floor(ntime / 3600);
    const minutes = Math.floor((ntime % 3600) / 60);
    const seconds = Math.floor((ntime % 3600) % 60);

    return `${hours > 0 ? hours + (hours === 1 ? ' hour,' : ' hours,') : ''} ${
      minutes > 0 ? minutes + (minutes === 1 ? ' minute' : ' minutes') : ''
    } ${seconds > 0 ? seconds + (seconds === 1 ? ' second' : ' seconds') : ''}`;
  }

  async validateUser({ username, password }: LoginPayload) {
    const user = await this.profileService.getByUsernameAndPass(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException(
        'Could not authenticate. Please try again',
      );
    }
    return user;
  }
}
