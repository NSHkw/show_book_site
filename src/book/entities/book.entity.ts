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

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'schedule_id' })
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
