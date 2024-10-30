import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class SignUpDto extends PickType(User, ['email', 'password', 'nickname']) {
  /**
   * 비밀번호 확인
   * @example "Example!"
   */
  @IsNotEmpty({ message: '비밀번호 확인을 입력' })
  @IsStrongPassword({}, { message: '비밀번호는 영문 대소문자, 숫자, 특수문자' })
  passwordConfirm: string;
}
