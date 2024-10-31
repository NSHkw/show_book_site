import { MAX_PRICE } from './../../constants/point.constant';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { showCategory } from '../types/show-category.type';
import { Schedule } from './schedule.entity';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

@Entity('shows')
export class Show {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  /**
   * 공연명
   * @example "임영웅 콘서트 IM HERO TOUR 2023 - 고양"
   */
  @IsNotEmpty({ message: '공연 명 입력' })
  @IsString()
  @Column({ unique: true })
  title: string;

  /**
   * 공연 설명
   * @example "설명"
   */
  @IsNotEmpty({ message: '공연 설명 입력' })
  @IsString()
  @Column({ type: 'text' })
  description: string;

  /**
   * 카테고리
   * @example "Concert"
   */
  @IsNotEmpty({ message: '카테고리 설정' })
  @IsEnum(showCategory)
  @Column({ type: 'enum', enum: showCategory })
  category: showCategory;

  /**
   * 장소
   * @example "장소"
   */
  @IsNotEmpty({ message: '장소 입력' })
  @IsString()
  @Column()
  place: string;

  /**
   * 가격
   * @example 50000
   */
  @IsNotEmpty({ message: '가격 입력' })
  @IsNumber()
  @Max(MAX_PRICE, { message: '공연 가격은 50000 포인트 넘을 수 없다' })
  @Column()
  price: number;

  /**
   * 썸네일
   * @example "URL"
   */
  @IsNotEmpty({ message: '썸네일 입력' })
  @IsString()
  @Column()
  thumbnail: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany((type) => Schedule, (schedule) => schedule.show)
  schedules: Schedule[];
}
