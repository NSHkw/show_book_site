import { IsNotEmpty, IsNumber } from 'class-validator';

export class CancelBookDto {
  @IsNotEmpty({ message: '예약 ID는 필수' })
  @IsNumber()
  bookId: number;
}
