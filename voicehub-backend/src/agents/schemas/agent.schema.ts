import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// This defines what an Agent document looks like in MongoDB
@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt
export class Agent extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 'Open' })
  status: string;

  @Prop({ default: 0 })
  total: number;
}

// Create the Mongoose schema from the class
export const AgentSchema = SchemaFactory.createForClass(Agent);
