import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum EventCategory {
  BAR_OUTING = 'bar_outing',
  HIKING = 'hiking',
  FESTIVAL = 'festival',
  CONCERT = 'concert',
  BRUNCH = 'brunch',
  BOARD_GAMES = 'board_games',
  VIDEO_GAMES = 'video_games',
  SPORTS = 'sports',
  CINEMA = 'cinema',
  ESCAPE_GAME = 'escape_game',
  SHOPPING = 'shopping',
  CULTURAL_VISIT = 'cultural_visit',
  CAMPING = 'camping',
}

@Schema()
export class Event extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  time: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop({ required: true })
  location: string;

  @Prop()
  maxParticipants: number;

  // Ici, c'est pour faire référence à l'utilisateur qui organise l'événement
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  organizerId: Types.ObjectId;

  // Ici, c'est la liste des IDs des participants
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  participants: Types.ObjectId[];

  // Et ici, c'est une référence à la catégorie de l'événement (enum)
  @Prop({ required: true, enum: EventCategory })
  category: EventCategory;
}

export const EventSchema = SchemaFactory.createForClass(Event);
