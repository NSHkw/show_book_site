import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/types/user-role.type';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('공연 정보')
@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  /**
   * 공연 생성
   * @param createShowDto
   * @returns
   */
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createShowDto: CreateShowDto) {
    const data = await this.showService.create(createShowDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: '공연 생성 완료',
      data,
    };
  }

  /**
   * 공연 목록 조회(검색)
   * @returns
   */
  @Get()
  findAll() {
    return this.showService.findAll();
  }

  /**
   * 공연 상세 조회
   * @param id
   * @returns
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showService.findOne(+id);
  }
}
