import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signupDto: SignUpDto) {
    const data = await this.authService.signup(signupDto);
    return { satusCode: HttpStatus.CREATED, message: '회원가입 성공' };
  }

  @Post('/signin')
  signin() {}
}
