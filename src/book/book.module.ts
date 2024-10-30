import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Book } from './entities/book.entity';
import { Schedule } from 'src/show/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Book, Schedule])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
