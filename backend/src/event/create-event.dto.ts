import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsDate,
  IsMongoId,
} from 'class-validator';
import { EventCategory } from './schemas/event.schema';

export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsDate()
  date: Date;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  location: string;

  @IsOptional()
  latitude?: number;

  @IsOptional()
  longitude?: number;

  @IsOptional()
  maxParticipants?: number;

  @IsMongoId()
  organizerId: string;

  @IsNotEmpty()
  @IsEnum(EventCategory)
  category: EventCategory;
}
