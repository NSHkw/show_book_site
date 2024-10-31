import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Book } from 'src/book/entities/book.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  /**
   * 이메일
   * @example "example@example.com"
   */
  @IsNotEmpty({ message: '이메일 입력' })
  @IsEmail({}, { message: '이메일 형식 맞지 않음' })
  @Column({ unique: true })
  email: string;

  /**
   * 비밀번호
   * @example "example!"
   */
  @IsNotEmpty({ message: '비밀번호 확인을 입력' })
  @IsStrongPassword(
    {},
    {
      message: '비밀번호는 영문 대,소문자, 숫자, 특수문자',
    },
  )
  @Column({ select: false })
  password: string;

  /**
   * 닉네임
   * @example "닉네임"
   */
  @IsNotEmpty({ message: '닉네임 입력' })
  @IsString()
  @Column()
  nickname: string;

  @IsNumber()
  @Column({ unsigned: true })
  points: number;

  @IsBoolean()
  @Column({ default: false, name: 'is_admin' })
  isAdmin: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany((type) => Book, (book) => book.user)
  books: Book[];
}
