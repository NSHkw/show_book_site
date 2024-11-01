import { IsNotEmpty, IsNumber } from 'class-validator';
import { Schedule } from 'src/show/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @IsNumber()
  @Column({ unsigned: true, name: 'user_id' })
  userId: number;

  /**
   * 공연회차 ID
   * @example 1
   */
  @IsNotEmpty({ message: '공연회차 Id 입력' })
  @IsNumber()
  @Column({ unsigned: true, name: 'schedule_id' })
  scheduleId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.books, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne((type) => Schedule, { onDelete: 'CASCADE' })
  @JoinColumn()
  schedule: Schedule;
}
