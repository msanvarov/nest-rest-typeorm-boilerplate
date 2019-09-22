import * as crypto from 'crypto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile } from './profile.entity';
import { RegisterPayload } from '../auth/payload/register.payload';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async get(id: number) {
    return this.profileRepository.findOne(id);
  }

  async getByUsername(username: string) {
    return await this.profileRepository.find({
      where: {
        username,
      },
    });
  }

  async getByUsernameAndPass(username: string, password: string) {
    const hashedPass = crypto.createHmac('sha256', password).digest('hex');
    return await this.profileRepository.find({
      where: {
        username,
        password: hashedPass,
      },
    });
  }

  async create(payload: RegisterPayload) {
    const user = await this.getByUsername(payload.username);

    if (user) {
      throw new NotAcceptableException(
        'The account with the provided username currently exists. Please choose another one.',
      );
    }

    return await this.profileRepository.save(
      this.profileRepository.create(payload),
    );
  }
}
