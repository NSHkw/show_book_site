import { Controller, Get, Request, UseGuards, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('사용자')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 내 정보 조회
   * @param req
   * @returns
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async findMe(@Request() req) {
    const userId = req.user.id;

    const data = await this.userService.findOneById(userId);

    return {
      statusCode: HttpStatus.OK,
      message: '내 정보 조회 성공',
      data,
    };
  }
}
