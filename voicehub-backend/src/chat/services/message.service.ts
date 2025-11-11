import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../schemas/message.schema';
import { CreateMessageDto } from '../dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  // Create new message
  async create(createDto: CreateMessageDto): Promise<Message> {
    const message = new this.messageModel({
      ...createDto,
      timestamp: new Date(),
    });
    return message.save();
  }

  // Get all messages for a conversation
  async findByConversation(conversationId: string): Promise<Message[]> {
    return this.messageModel
      .find({ conversationId })
      .sort({ timestamp: 1 }) // Oldest first (chronological order)
      .exec();
  }

  // Delete all messages in a conversation
  async deleteByConversation(conversationId: string): Promise<void> {
    await this.messageModel.deleteMany({ conversationId }).exec();
  }

  // Delete single message
  async delete(messageId: string): Promise<void> {
    await this.messageModel.findByIdAndDelete(messageId).exec();
  }
}
