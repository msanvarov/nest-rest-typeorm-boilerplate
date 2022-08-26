import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';

import { ITokenReturnBody } from '@starter/api-types';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

/**
 * Authentication Service
 */
@Injectable()
export class AuthService {
  /**
   * Time in seconds when the token is to expire
   * @type {string}
   */
  private readonly expiration: string;

  /**
   * Constructor
   * @param {JwtService} jwtService jwt service
   * @param {UsersService} usersService users service
   */
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.expiration = this.configService.get('WEBTOKEN_EXPIRATION_TIME');
  }

  /**
   * Creates a signed jwt token based on User payload
   * @param {User} param dto to generate token from
   * @returns {Promise<ITokenReturnBody>} token body
   */
  async createToken({
    id,
    username,
    name,
    roles,
    email,
  }: User): Promise<ITokenReturnBody> {
    console.log(this.expiration);
    return {
      expiresIn: this.expiration,
      expiresInFormatted: moment()
        .add(this.expiration, 'seconds')
        .format('LLL'),
      token: this.jwtService.sign({
        id,
        username,
        name,
        roles,
        email,
      }),
    };
  }

  /**
   * Validates whether or not the user exists in the database
   * @param {LoginDto} param login payload to authenticate with
   * @returns {Promise<User>} registered user
   */
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
