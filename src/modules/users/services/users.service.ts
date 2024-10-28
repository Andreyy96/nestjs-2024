import { Injectable } from '@nestjs/common';

import { ArticleID, UserID } from '../../../common/types/entity-ids.type';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../models/dto/req/update-user.req.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: UserID) {
    return `This action returns a #${id} user`;
  }

  update(id: UserID, updateUserDto: UpdateUserReqDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: UserID) {
    return `This action removes a #${id} user`;
  }

  public async checkAbilityToEditArticle(userId: UserID, articleId: ArticleID) {
    // Check if the user has permission to edit the article
  }
}
