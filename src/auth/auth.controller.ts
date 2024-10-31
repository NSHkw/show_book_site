import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 회원가입
   * @param signupDto
   * @returns
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  async signup(@Body() signupDto: SignUpDto) {
    const data = await this.authService.signup(signupDto);
    return { satusCode: HttpStatus.CREATED, message: '회원가입 성공', data };
  }

  /**
   * 로그인
   * @param req
   * @param signinDto
   * @returns
   */
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  signin(@Request() req, @Body() signinDto: SignInDto) {
    const data = this.authService.signin(req.user.id);

    return {
      statusCode: HttpStatus.OK,
      message: '로그인 성공',
      data,
    };
  }
}
