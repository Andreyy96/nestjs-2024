import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { FollowID, UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.FOLLOWS)
export class FollowEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: FollowID;

  @Column()
  follower_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.followers)
  @JoinColumn({ name: 'follower_id' })
  follower?: UserEntity;

  @Column()
  following_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.followings)
  @JoinColumn({ name: 'following_id' })
  following?: UserEntity;
}
