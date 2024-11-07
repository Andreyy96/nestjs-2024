import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { TagResDto } from './models/dto/res/tag.res.dto';
import { TagMapper } from './services/tags.mapper';
import { TagsService } from './services/tags.service';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @SkipAuth()
  @Get('popular')
  public async getPopular(): Promise<TagResDto[]> {
    const result = await this.tagService.getPopular();
    return TagMapper.toResListDto(result);
  }
}
