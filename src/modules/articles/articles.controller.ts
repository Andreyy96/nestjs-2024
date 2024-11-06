import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ArticleID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { CreateArticleDto } from './models/dto/req/create-article.req.dto';
import { UpdateArticleDto } from './models/dto/req/update-article.req.dto';
import { ArticleResDto } from './models/dto/res/article.res.dto';
import { ArticlesMapper } from './services/articles.mapper';
import { ArticlesService } from './services/articles.service';

@ApiBearerAuth()
@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateArticleDto,
  ): Promise<ArticleResDto> {
    const result = await this.articlesService.create(userData, dto);
    return ArticlesMapper.toResDto(result);
  }

  @Get(':articleId')
  public async findOne(
    @Param('articleId') articleId: ArticleID,
  ): Promise<ArticleResDto> {
    const result = await this.articlesService.findOne(articleId);
    return ArticlesMapper.toResDto(result);
  }

  @Patch(':articleId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('articleId') articleId: ArticleID,
    @Body() dto: UpdateArticleDto,
  ): Promise<ArticleResDto> {
    const result = await this.articlesService.update(userData, articleId, dto);
    return ArticlesMapper.toResDto(result);
  }

  // @Delete(':articleId')
  // remove(@Param('id') id: string) {
  //   return this.articlesService.remove(+id);
  // }
}
