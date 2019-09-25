import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AppRoles } from './app.roles';
import { Profile } from '../profile/profile.entity';

/**
 * Roles Entity Class
 */
@Entity()
export class Roles {
  /**
   * UUID column
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Column for role based access
   * Beware this default app role will permit every created profile to delete other profiles
   */
  @Column({
    type: 'enum',
    enum: AppRoles,
    default: AppRoles.ADMIN,
  })
  role: AppRoles;

  /**
   * Column to represent a many to one relationship with the profile entity
   */
  @ManyToOne(type => Profile, profile => profile.roles, { onDelete: 'CASCADE' })
  profile: Profile;
}
