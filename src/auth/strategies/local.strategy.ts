// src/auth/strategies/local.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    }); // extends를 해서 상속 받았기 때문에 필수
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser({ email, password });
    // user가 인증된 사람인지 확인하기 위해 authService에서 validateUser를 가져옴

    if (!user) {
      throw new UnauthorizedException('일치하는 인증 정보 X');
    }
    return user;
  }
}
