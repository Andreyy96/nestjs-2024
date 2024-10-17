import { Injectable } from '@nestjs/common';

import { CreateCommentDto } from './models/dto/req/create-comment.dto';
import { UpdateCommentDto } from './models/dto/req/update-comment.dto';

@Injectable()
export class CommentsService {
  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

  public async deleteAllCommentsForArticle(articleId: string) {
    // Delete all comments for the article
  }
}
