import { Schedule } from 'src/show/entities/schedule.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Seat } from 'src/show/entities/seat.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async create(userId: number, { scheduleId }: CreateBookDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const schedule = await queryRunner.manager.findOne(Schedule, {
        where: { id: scheduleId },
        relations: {
          show: true,
        },
      });

      if (!schedule) {
        throw new NotFoundException('공연 회차 정보 X');
      }

      const book = await queryRunner.manager.save(Book, {
        userId,
        scheduleId,
      });

      const price = schedule.show.price;
      const user = await queryRunner.manager.findOneBy(User, { id: userId });

      const afterPaidPoints = user.points - price;
      if (afterPaidPoints < 0) {
        throw new BadRequestException('포인트 부족');
      }

      user.points = afterPaidPoints;
      await queryRunner.manager.save(User, user);

      const seat = await queryRunner.manager.findOneBy(Seat, { scheduleId });
      const afterBookedSeat = seat.availableSeats - 1;
      if (afterBookedSeat < 0) {
        throw new BadRequestException('예약 가능한 좌석 X');
      }

      seat.availableSeats = afterBookedSeat;
      await queryRunner.manager.save(Seat, seat);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return book;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
  }

  async findAll(userId: number) {
    const books = await this.bookRepository.find({
      where: { userId },
      relations: {
        schedule: {
          show: true,
        },
      },
    });

    return books;
  }

  async findOne(id: number, userId: number) {
    const book = await this.bookRepository.find({
      where: { id, userId },
      relations: {
        schedule: {
          show: true,
        },
      },
    });

    if (!book) {
      throw new NotFoundException('예매 정보 확인 X');
    }

    return book;
  }

  async cancelBook(userId: number, bookId: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const book = await queryRunner.manager.findOne(Book, {
        where: { id: bookId, userId },
        relations: {
          schedule: {
            show: true,
          },
        },
      });

      if (!book) {
        throw new NotFoundException('예약 정보 X');
      }

      const refundPrice = book.schedule.show.price;
      const user = await queryRunner.manager.findOneBy(User, { id: userId });
      user.points += refundPrice;
      await queryRunner.manager.save(User, user);

      const seat = await queryRunner.manager.findOneBy(Seat, {
        scheduleId: book.scheduleId,
      });
      seat.availableSeats++;
      await queryRunner.manager.save(Seat, seat);

      await queryRunner.manager.delete(Book, { id: bookId });

      await queryRunner.commitTransaction();

      await queryRunner.release();

      return {
        refundPrice: refundPrice,
        currentPoint: user.points,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException('예약 취소 중 에러');
    }
  }
}
