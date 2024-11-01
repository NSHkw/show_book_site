import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true, name: 'schedule_id' })
  scheduleId: number;

  @Column({ name: 'available_seats' })
  availableSeats: number;

  @Column({ name: 'total_seats' })
  totalSeats: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne((type) => Schedule, (schedule) => schedule.seat, { onDelete: 'CASCADE' })
  @JoinColumn()
  schedule: Schedule;
}
