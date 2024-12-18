import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './create-event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async createEvent(
    createEventDto: CreateEventDto,
    organizerId: Types.ObjectId,
  ): Promise<Event> {
    const createdEvent = new this.eventModel({
      ...CreateEventDto,
      organizerId,
    });
    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    return this.eventModel.findById(id).exec();
  }

  async deleteEvent(id: string): Promise<Event> {
    return this.eventModel.findByIdAndDelete(id).exec();
  }
}
