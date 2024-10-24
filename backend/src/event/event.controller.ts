import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './create-event.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { GetUserId } from '../common/decorators/get-user.decorator';
import { Types } from 'mongoose';
@Controller('events')
// On applique le guard pour sécuriser les routes
@UseGuards(AuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(
    @Body() createEventDto: CreateEventDto,
    @GetUserId() userId: Types.ObjectId,
  ) {
    return this.eventService.createEvent(createEventDto, userId);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.eventService.deleteEvent(id);
  }
}
