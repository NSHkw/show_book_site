import { PickType } from '@nestjs/mapped-types';
import { Schedule } from '../entities/schedule.entity';

export class CreateScheduleDto extends PickType(Schedule, ['date', 'time']) {}
