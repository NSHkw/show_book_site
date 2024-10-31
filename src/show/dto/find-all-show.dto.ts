import { IsEnum, IsOptional, IsString } from 'class-validator';
import { showCategory } from '../types/show-category.type';

export class FindAllShowDto {
  /**
   * 검색 키워드
   * @example "임영웅"
   */
  @IsOptional()
  @IsString()
  keyword?: string;

  /**
   * 카테고리
   * @example "Concert"
   */
  @IsOptional()
  @IsEnum(showCategory)
  category: showCategory;
}
