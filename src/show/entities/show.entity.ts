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

@Entity()
export class Show {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: showCategory })
  category: showCategory;

  @Column()
  place: string;

  @Column()
  price: number;

  @Column()
  thumbnail: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany((type) => Schedule, (schedule) => schedule.show)
  schedules: Schedule[];
}
