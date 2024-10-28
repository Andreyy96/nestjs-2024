import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserID } from '../../common/types/entity-ids.type';
import { UpdateUserReqDto } from './models/dto/req/update-user.req.dto';
import { UsersService } from './services/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id', ParseUUIDPipe) id: UserID) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  public async update(
    @Param('id', ParseUUIDPipe) id: UserID,
    @Body() updateUserDto: UpdateUserReqDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  public async remove(@Param('id', ParseUUIDPipe) id: UserID) {
    return this.usersService.remove(id);
  }
}
