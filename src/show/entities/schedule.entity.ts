import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Show } from './show.entity';
import { Seat } from './seat.entity';
import { IsDateString, IsMilitaryTime, IsNotEmpty } from 'class-validator';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true, name: 'show_id' })
  showId: number;

  /**
   * 공연 날짜
   * @example "2024-01-19"
   */
  @IsNotEmpty({ message: '공연 날짜 입력' })
  @IsDateString()
  @Column({ type: 'date' })
  date: Date;

  /**
   * 공연 시간
   * @example "19:30"
   */
  @IsNotEmpty({ message: '공연 시간 입력' })
  @IsMilitaryTime()
  @Column({ type: 'time' })
  time: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne((type) => Show, (show) => show.schedules, { onDelete: 'CASCADE' })
  @JoinColumn()
  show: Show;

  @OneToOne((type) => Seat, (seat) => seat.schedule, { cascade: true })
  @JoinColumn()
  seat: Seat;
}
