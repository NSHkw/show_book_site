import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { DEFAULT_CUSTOMER_POINT } from 'src/constants/point.constant';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signup({ email, password, passwordConfirm, nickname }) {
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
    delete user.password;

    return user;
  }
}
