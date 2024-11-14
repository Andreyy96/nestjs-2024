import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ArticleID } from '../../common/types/entity-ids.type';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { CreateArticleDto } from './models/dto/req/create-article.req.dto';
import { ListArticleQueryReqDto } from './models/dto/req/list-article-query.req.dto';
import { UpdateArticleDto } from './models/dto/req/update-article.req.dto';
import { ArticleResDto } from './models/dto/res/article.res.dto';
import { ArticleListResDto } from './models/dto/res/article-list.res.dto';
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

  @Get()
  public async findAll(
    @CurrentUser() userData: IUserData,
    @Query() query: ListArticleQueryReqDto,
  ): Promise<ArticleListResDto> {
    const [entities, total] = await this.articlesService.findAll(
      userData,
      query,
    );
    return ArticlesMapper.toResDtoList(entities, total, query);
  }

  @Get(':articleId')
  public async findOne(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<ArticleResDto> {
    const result = await this.articlesService.findOne(userData, articleId);
    return ArticlesMapper.toResDto(result);
  }

  @Patch(':articleId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
    @Body() dto: UpdateArticleDto,
  ): Promise<ArticleResDto> {
    const result = await this.articlesService.update(userData, articleId, dto);
    return ArticlesMapper.toResDto(result);
  }

  @Post(':articleId/like')
  public async like(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<void> {
    await this.articlesService.like(userData, articleId);
  }
  @Delete(':articleId/like')
  public async unlike(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: ArticleID,
  ): Promise<void> {
    await this.articlesService.unlike(userData, articleId);
  }
}
