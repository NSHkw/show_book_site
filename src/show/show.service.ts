import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { Like, Repository } from 'typeorm';
import { FindAllShowDto } from './dto/find-all-show.dto';

@Injectable()
export class ShowService {
  constructor(@InjectRepository(Show) private readonly showRepository: Repository<Show>) {}

  async create(createShowDto: CreateShowDto) {
    const { schedules, seats, ...restOfShow } = createShowDto;

    const existedShow = await this.showRepository.findOneBy({ title: createShowDto.title });

    if (existedShow) {
      throw new BadRequestException('이미 존재하는 show 이름');
    }

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

  async findAll({ keyword, category }: FindAllShowDto) {
    const shows = await this.showRepository.find({
      where: { ...(keyword && { title: Like(`%${keyword}%`) }), ...(category && { category }) },
    });

    return shows;
  }

  async findOne(id: number) {
    const show = await this.showRepository.findOne({
      where: { id },
      relations: {
        schedules: {
          seat: true,
        },
      },
    });

    if (!show) {
      throw new NotFoundException('공연 찾지 못함');
    }

    return show;
  }
}
