import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AppRoles } from './app.roles';
import { Profile } from '../profile/profile.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  //   beware this default app role will permit every created profile to delete other profiles
  @Column({
    type: 'enum',
    enum: AppRoles,
    default: AppRoles.ADMIN_DELETE_PROFILES,
  })
  role: AppRoles;

  @ManyToOne(type => Profile, profile => profile.roles, { onDelete: 'CASCADE' })
  profile: Profile;
}
