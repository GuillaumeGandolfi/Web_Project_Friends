import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { EventCategory } from './schemas/event.schema';

export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  location: string;

  @IsOptional()
  maxParticipants?: number;

  @IsNotEmpty()
  organizerId: string;

  @IsNotEmpty()
  @IsEnum(EventCategory)
  category: EventCategory;
}
