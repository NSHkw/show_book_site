import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 회원가입
   * @param signupDto
   * @returns
   */
  @Post('/signup')
  async signup(@Body() signupDto: SignUpDto) {
    const data = await this.authService.signup(signupDto);
    return { satusCode: HttpStatus.CREATED, message: '회원가입 성공' };
  }

  @Post('/signin')
  signin() {}
}
