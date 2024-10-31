import { PickType } from '@nestjs/mapped-types';
import { Show } from '../entities/show.entity';
import { CreateScheduleDto } from './create-schedule.dto';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateShowDto extends PickType(Show, [
  'title',
  'description',
  'category',
  'place',
  'price',
  'thumbnail',
]) {
  @ValidateNested()
  @Type(() => CreateScheduleDto)
  schedules: CreateScheduleDto[];

  /**
   * 좌석 수
   * @example 100
   */
  @IsNotEmpty({ message: '좌석 수 입력' })
  @IsNumber()
  seats: number;
}
