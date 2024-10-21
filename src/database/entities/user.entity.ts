import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  firstName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  lastName: string;

  @Column('boolean', { default: false })
  isActive: boolean;

  @Column('text')
  bio: string;
}
