import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PasswordTransformer } from './password.transformer';
import { Roles } from '../app/roles.entity';

/**
 * Profile Entity Class
 */
@Entity({
  name: 'profiles',
})
export class Profile {
  /**
   * UUID column
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Username column
   */
  @Column({ unique: true })
  username: string;

  /**
   * Name column
   */
  @Column()
  name: string;

  /**
   * Email column
   */
  @Column()
  email: string;

  /**
   * Avatar column (gravatar url)
   */
  @Column()
  avatar: string;

  /**
   * Column to represent a one to many relationship with the roles entity
   */
  @OneToMany(type => Roles, role => role.profile)
  roles: Roles[];

  /**
   * Column that employs the PasswordTransformer to hash passwords before writing to database
   */
  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  @Exclude()
  password: string;
}
