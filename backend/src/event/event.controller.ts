import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: any) {
    return this.eventService.createEvent(createEventDto);
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
