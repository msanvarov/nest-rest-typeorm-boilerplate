import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { url } from 'gravatar';
import { Repository } from 'typeorm';

import { IGenericMessageBody } from '@starter/api-types';

import { RegisterDto } from '../auth/dto/register.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UserRoles } from './user-role.entity';
import { User } from './user.entity';

/**
 * Users Service
 */
@Injectable()
export class UsersService {
  /**
   * Constructor
   * @param {Repository<User>} userRepository
   * @param {Repository<UserRoles>} rolesRepository
   */
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRoles)
    private readonly userRolesRepository: Repository<UserRoles>,
  ) {}

  /**
   * Fetches user from database by UUID
   * @param {number} id
   * @returns {Promise<User>} data from queried user
   */
  get(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id }, relations: ['roles'] });
  }

  /**
   * Fetches user from database by username
   * @param {string} username
   * @returns {Promise<User>} data from queried user
   */
  getByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  /**
   * Fetches user by username and hashed password
   * @param {string} username
   * @param {string} password
   * @returns {Promise<User>} data from queried user
   */
  getByUsernameAndPass(username: string, password: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('users')
      .where('users.username = :username and users.password = :password')
      .setParameter('username', username)
      .setParameter(
        'password',
        crypto.createHmac('sha256', password).digest('hex'),
      )
      .getOne();
  }

  /**
   * Create a user with RegisterPayload fields
   * @param {RegisterDto} payload user payload
   * @returns {Promise<User>} data from the created user
   */
  async create(payload: RegisterDto): Promise<User> {
    const user = await this.getByUsername(payload.username);

    if (user) {
      throw new NotAcceptableException(
        'The account with the provided username currently exists. Please choose another one.',
      );
    }

    // Remark: Default role is set to sudo
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

  /**
   * Edit user data
   * @param {PatchUserDto} payload
   * @returns {Promise<User>} mutated user data
   */
  async edit(payload: PatchUserDto): Promise<User> {
    const { username } = payload;
    const user = await this.getByUsername(username);
    if (user) {
      Object.keys(payload).forEach((key) => {
        if (key === 'password') {
          key = crypto.createHmac('sha256', key).digest('hex');
        }
        user[key] = payload[key];
      });
      return this.userRepository.save(user);
    } else {
      throw new BadRequestException(
        'The user with that username does not exist in the system. Please try another username.',
      );
    }
  }

  /**
   * Delete user given a username
   * @param {string} username
   * @returns {Promise<IGenericMessageBody>} whether or not the delete operation was completed
   */
  async delete(username: string): Promise<IGenericMessageBody> {
    const deleted = await this.userRepository.delete({ username });
    if (deleted.affected === 1) {
      return { message: `Deleted ${username} from records` };
    } else {
      throw new BadRequestException(
        `Failed to delete a user by the name of ${username}.`,
      );
    }
  }
}
