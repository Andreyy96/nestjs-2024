import { Injectable } from '@nestjs/common';

import { CommentsService } from '../comments/comments.service';
import { UsersService } from '../users/services/users.service';
import { CreateArticleReqDto } from './models/dto/req/create-article.req.dto';
import { UpdateArticleReqDto } from './models/dto/req/update-article.req.dto';

@Injectable()
export class ArticlesService {
  constructor(
    private readonly userService: UsersService,
    private readonly commentsService: CommentsService,
  ) {}

  create(dto: CreateArticleReqDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, dto: UpdateArticleReqDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this.commentsService.deleteAllCommentsForArticle('articleId');
    return `This action removes a #${id} user`;
  }
}
