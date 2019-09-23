import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '../app/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Roles])],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
