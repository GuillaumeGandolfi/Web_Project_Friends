import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

enum EventCategory {
  SORTIE_BAR = 'Sortie bar',
  RANDONNEE = 'Randonnée',
  FESTIVAL = 'Festival',
  CONCERT = 'Concert',
  BRUNCH = 'Brunch',
  JEUX_DE_SOCIETE = 'Jeux de société',
  JEUX_VIDEO = 'Jeux vidéo',
  SPORT = 'Sport',
  CINEMA = 'Cinéma',
  ESCAPE_GAME = 'Escape game',
  SHOPPING = 'Shopping',
  VISITE_CULTURELLE = 'Visite culturelle',
  CAMPING = 'Camping',
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
