import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { DEFAULT_CUSTOMER_POINT } from 'src/constants/point.constant';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signup({ email, password, passwordConfirm, nickname }: SignUpDto) {
    const isPasswordMatched = password === passwordConfirm;
    if (!isPasswordMatched) {
      throw new BadRequestException('비밀번호 일치 X');
    }

    const existedEmail = await this.userRepository.findOneBy({ email });
    if (existedEmail) {
      throw new BadRequestException('이미 존재하는 이메일');
    }

    const hashRound = this.configService.get<number>('PASSWORD_HASH_ROUND');

    const hashedPassword = bcrypt.hashSync(password, hashRound);

    const user = await this.userRepository.save({
      email,
      password: hashedPassword,
      nickname,
      points: DEFAULT_CUSTOMER_POINT,
    });

    return this.signin(user.id);
  }

  signin(userId: number) {
    //JWT 토큰 생성
    const payload = { id: userId };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUser({ email, password }: SignInDto) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, password: true },
    }); // findoneby를 사용하면 select 조건 사용이 안됨

    const isPasswordMatched = bcrypt.compareSync(password, user?.password ?? '');
    // user?-> user가 존재하지 않을 수도 있는데, 그럴 경우 isPasswordMatched에 오류가 발생하지 않도록
    // '??'의 경우 왼쪽이 null이나 undefined인 경우 오른쪽이 나오도록

    if (!user || !isPasswordMatched) {
      return null;
    }

    return { id: user.id }; // jwt 토큰 만드는데 사용
  }
}
