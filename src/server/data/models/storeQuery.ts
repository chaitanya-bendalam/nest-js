import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetStoreQuery {
  @IsNumber()
  @IsOptional()
  offset = 0;

  @IsNumber()
  @IsOptional()
  limit = 15;

  @IsString()
  @IsOptional()
  searchQuery: string;

  @IsNumber()
  @IsOptional()
  lat: number;

  @IsNumber()
  @IsOptional()
  lng: number;

  @IsNumber()
  @Min(1)
  @Max(7)
  @IsOptional()
  weekday: number;
  @IsString()
  @IsOptional()
  startHour: string;

  @IsString()
  @IsOptional()
  endHour: string;
}
