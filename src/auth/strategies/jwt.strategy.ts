import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
// Strategy 뒤에 콤마하고 'jwt'라 이름 적는게 일반적이지만, passport-jwt에서 import 했기 때문에 자동으로 이름이 'jwt'로 설정 됨
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 헤더에 Bearer 키워드 넣은 jwt 토큰 사용
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // passportStrategy를 만들 때 validate를 만들어야 함
  validate(payload: JwtPayload) {
    return payload;
  }
}
