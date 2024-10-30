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

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true, name: 'show_id' })
  showId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne((type) => Show, (show) => show.schedules, { onDelete: 'CASCADE' })
  @JoinColumn()
  show: Show;

  @OneToOne((type) => Seat, (seat) => seat.schedule)
  seat: Seat;
}
