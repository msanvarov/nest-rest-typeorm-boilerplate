import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { IJWTResponseBody } from '@starter/api-types';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeStyle: 'short',
});

@Injectable()
export class AuthService {
  private readonly expiration: number;

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.expiration = Number(
      this.configService.get<number>('WEBTOKEN_EXPIRATION_TIME'),
    );
  }

  async createToken({
    id,
    username,
    name,
    roles,
    email,
  }: User): Promise<IJWTResponseBody> {
    const expiresAt = new Date(Date.now() + this.expiration * 1000);
    return {
      expiration: this.expiration,
      expirationFormatted: dateFormatter.format(expiresAt),
      token: await this.jwtService.signAsync({
        id,
        username,
        name,
        roles,
        email,
      }),
    };
  }

  async validateUser({ username, password }: LoginDto): Promise<User> {
    const user = await this.usersService.getByUsernameAndPass(
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
