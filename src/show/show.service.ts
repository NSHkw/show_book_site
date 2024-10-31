import { Injectable } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShowService {
  constructor(@InjectRepository(Show) private readonly showRepository: Repository<Show>) {}

  async create(createShowDto: CreateShowDto) {
    const { schedules, seats, ...restOfShow } = createShowDto;

    const show = await this.showRepository.save({
      ...restOfShow,
      schedules: schedules.map((schedule) => {
        return {
          ...schedule,
          seat: {
            availableSeats: seats,
            totalSeats: seats,
          },
        };
      }),
    });

    return show;
  }

  findAll() {
    return `This action returns all show`;
  }

  findOne(id: number) {
    return `This action returns a #${id} show`;
  }
}
