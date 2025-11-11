import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Conversation extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Agent', required: true })
  agentId: Types.ObjectId;

  @Prop({ required: true })
  userId: string; // Will be replaced with real user ID later

  @Prop({ default: 'active', enum: ['active', 'closed'] })
  status: string;

  @Prop({ default: Date.now })
  startedAt: Date;

  @Prop({ default: Date.now })
  lastMessageAt: Date;

  @Prop()
  title: string; // "Chat 1", "Chat 2", etc.
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
