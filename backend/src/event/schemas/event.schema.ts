import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

  // Et ici, c'est une référence à la catégorie de l'événement
  @Prop({ type: Types.ObjectId, ref: 'Category' })
  categoryId: Types.ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(Event);
