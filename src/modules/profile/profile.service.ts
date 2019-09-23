import * as crypto from 'crypto';
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

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async get(id: number) {
    return this.profileRepository.findOne(id, { relations: ['roles'] });
  }

  async getByUsername(username: string) {
    return await this.profileRepository.findOne({ username });
  }

  async getByUsernameAndPass(username: string, password: string) {
    return await this.profileRepository
      .createQueryBuilder('profiles')
      .where('profiles.username = :username and profiles.password = :password')
      .setParameter('username', username)
      .setParameter(
        'password',
        crypto.createHmac('sha256', password).digest('hex'),
      )
      .getOne();
  }

  async create(payload: RegisterPayload) {
    const user = await this.getByUsername(payload.username);

    if (user) {
      throw new NotAcceptableException(
        'The account with the provided username currently exists. Please choose another one.',
      );
    }

    // keep making roles for a particular profile, these roles are defined from AppRoles enum.
    const roles: Roles[] = [new Roles()];
    await this.rolesRepository.save(roles);
    return await this.profileRepository.save(
      this.profileRepository.create({ ...payload, roles }),
    );
  }

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
