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
  Query,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/user/types/user-role.type';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FindAllShowDto } from './dto/find-all-show.dto';

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
  async findAll(@Query() findAllShowDto: FindAllShowDto) {
    const data = await this.showService.findAll(findAllShowDto);
    return {
      statusCode: HttpStatus.OK,
      message: '공연 목록 조회',
      data,
    };
  }

  /**
   * 공연 상세 조회
   * @param id
   * @returns
   */
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.showService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: '공연 상세 조회',
      data,
    };
  }
}
