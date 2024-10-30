import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class SignUpDto extends PickType(User, ['email', 'password', 'nickname']) {
  passwordConfirm: string;
}
