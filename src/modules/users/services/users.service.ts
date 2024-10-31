import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';
import { UserResDto } from '../models/dto/res/user.res.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  findAll() {
    return `This action returns all users`;
  }

  public async getMe(userData: IUserData): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    return UserMapper.toResDto(user);
  }

  public async updateMe(
    userData: IUserData,
    dto: UpdateUserReqDto,
  ): Promise<any> {
    return `This action updates a #${userData.userId} user`;
  }

  public async removeMe(userData: IUserData): Promise<void> {
    await this.userRepository.delete(userData.userId);
  }

  public async findOne(userId: UserID): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UnprocessableEntityException();
    }
    return user;
  }
}
