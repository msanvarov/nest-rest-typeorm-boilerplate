import * as crypto from 'crypto';
import { url } from 'gravatar';
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from './profile.entity';
import { RegisterPayload } from '../auth/payload/register.payload';
import { Roles } from '../app/roles.entity';
import { PatchProfilePayload } from './payload/patch.profile.payload';

/**
 * Profile Service
 */
@Injectable()
export class ProfileService {
  /**
   * Constructor
   * @param {Repository<Profile>} profileRepository
   * @param {Repository<Roles>} rolesRepository
   */
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  /**
   * Fetches profile from database by UUID
   * @param {number} id
   */
  get(id: number) {
    return this.profileRepository.findOne(id, { relations: ['roles'] });
  }

  /**
   * Fetches profile from database by username
   * @param {string} username
   */
  getByUsername(username: string) {
    return this.profileRepository.findOne({ username });
  }

  /**
   * Fetches profile by username and hashed password
   * @param {string} username
   * @param {string} password
   */
  getByUsernameAndPass(username: string, password: string) {
    return this.profileRepository
      .createQueryBuilder('profiles')
      .where('profiles.username = :username and profiles.password = :password')
      .setParameter('username', username)
      .setParameter(
        'password',
        crypto.createHmac('sha256', password).digest('hex'),
      )
      .getOne();
  }

  /**
   * Creates a profile
   * @param {RegisterPayload} payload profile payload
   */
  async create(payload: RegisterPayload) {
    const profile = await this.getByUsername(payload.username);

    if (profile) {
      throw new NotAcceptableException(
        'The account with the provided username currently exists. Please choose another one.',
      );
    }

    // keep making roles for a particular profile, these roles are defined from AppRoles enum.
    const roles: Roles[] = [new Roles()];
    await this.rolesRepository.save(roles);
    return this.profileRepository.save(
      this.profileRepository.create({
        ...payload,
        roles,
        avatar: url(payload.email, {
          protocol: 'http',
          s: '200',
          r: 'pg',
          d: '404',
        }),
      }),
    );
  }

  async edit(payload: PatchProfilePayload) {
    const { username } = payload;
    const profile = await this.getByUsername(username);
    if (profile) {
      Object.keys(payload).forEach(key => {
        if (key === 'password') {
          key = crypto.createHmac('sha256', key).digest('hex');
        }
        profile[key] = payload[key];
      });
      return this.profileRepository.save(profile);
    } else {
      throw new BadRequestException(
        'The profile with that username does not exist in the system. Please try another username.',
      );
    }
  }
  /**
   * Deletes profile from provided username
   * @param {string} username
   */
  async delete(username: string) {
    const deleted = await this.profileRepository.delete({ username });
    if (deleted.affected === 1) {
      return { message: `Deleted ${username} from records` };
    } else {
      throw new BadRequestException(
        `Failed to delete a profile by the name of ${username}.`,
      );
    }
  }
}
