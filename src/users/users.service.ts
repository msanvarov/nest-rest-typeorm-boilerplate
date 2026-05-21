import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { url } from 'gravatar';
import { Repository } from 'typeorm';

import { IGenericMessageBody } from '../shared/api-types';

import { RegisterDto } from '../auth/dto/register.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UserRoles } from './user-role.entity';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRoles)
    private readonly userRolesRepository: Repository<UserRoles>,
  ) {}

  get(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id }, relations: ['roles'] });
  }

  getByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { username },
      relations: ['roles'],
    });
  }

  getByUsernameAndPass(
    username: string,
    password: string,
  ): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.roles', 'roles')
      .where('users.username = :username and users.password = :password', {
        username,
        password: crypto.createHmac('sha256', password).digest('hex'),
      })
      .getOne();
  }

  list(limit = 50): Promise<User[]> {
    return this.userRepository.find({
      take: limit,
      relations: ['roles'],
    });
  }

  async create(payload: RegisterDto): Promise<User> {
    const user = await this.getByUsername(payload.username);

    if (user) {
      throw new NotAcceptableException(
        'The account with the provided username currently exists. Please choose another one.',
      );
    }

    const roles: UserRoles[] = [new UserRoles()];
    await this.userRolesRepository.save(roles);

    return this.userRepository.save(
      this.userRepository.create({
        ...payload,
        roles,
        gravatar: url(payload.email, {
          protocol: 'http',
          s: '200',
          r: 'pg',
          d: '404',
        }),
      }),
    );
  }

  async edit(payload: PatchUserDto): Promise<User> {
    const { username } = payload;
    const user = await this.getByUsername(username);
    if (!user) {
      throw new BadRequestException(
        'The user with that username does not exist in the system. Please try another username.',
      );
    }
    for (const key of Object.keys(payload) as Array<keyof PatchUserDto>) {
      const value = payload[key];
      if (key === 'password') {
        if (typeof value === 'string' && value.length > 0) {
          user.password = crypto.createHmac('sha256', value).digest('hex');
        }
        continue;
      }
      if (value !== undefined) {
        (user as unknown as Record<string, unknown>)[key] = value;
      }
    }
    return this.userRepository.save(user);
  }

  async delete(username: string): Promise<IGenericMessageBody> {
    const deleted = await this.userRepository.delete({ username });
    if (deleted.affected === 1) {
      return { message: `Deleted ${username} from records` };
    }
    throw new BadRequestException(
      `Failed to delete a user by the name of ${username}.`,
    );
  }
}
