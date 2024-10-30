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

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ unsigned: true })
  points: number;

  @Column({ name: 'is_admin' })
  isAdmin: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany((type) => Book, (book) => book.user)
  books: Book[];
}
