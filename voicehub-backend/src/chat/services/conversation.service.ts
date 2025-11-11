import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation } from '../schemas/conversation.schema';
import { CreateConversationDto } from '../dto/create-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
  ) {}

  // Create new conversation
  async create(createDto: CreateConversationDto): Promise<Conversation> {
    // Count existing conversations for this user + agent
    const count = await this.conversationModel
      .countDocuments({
        agentId: createDto.agentId,
        userId: createDto.userId,
      })
      .exec();

    // Auto-generate title: "Chat 1", "Chat 2", etc.
    const title = `Chat ${count + 1}`;

    const conversation = new this.conversationModel({
      ...createDto,
      title,
      status: 'active',
      startedAt: new Date(),
      lastMessageAt: new Date(),
    });

    return conversation.save();
  }

  // Get all conversations for a user with specific agent
  async findByAgent(agentId: string, userId: string): Promise<Conversation[]> {
    return this.conversationModel
      .find({ agentId, userId })
      .sort({ lastMessageAt: -1 }) // Most recent first
      .exec();
  }

  // Get single conversation
  async findOne(conversationId: string): Promise<Conversation | null> {
    return this.conversationModel.findById(conversationId).exec();
  }

  // Update lastMessageAt timestamp
  async updateLastMessage(conversationId: string): Promise<void> {
    await this.conversationModel
      .findByIdAndUpdate(conversationId, {
        lastMessageAt: new Date(),
      })
      .exec();
  }

  // Close conversation
  async close(conversationId: string): Promise<Conversation | null> {
    return this.conversationModel
      .findByIdAndUpdate(conversationId, { status: 'closed' }, { new: true })
      .exec();
  }

  // Delete conversation
  async delete(conversationId: string): Promise<void> {
    await this.conversationModel.findByIdAndDelete(conversationId).exec();
  }

  async getAgentId(conversationId: string): Promise<string | undefined> {
    const conversation = await this.conversationModel
      .findById(conversationId)
      .select('agentId')
      .exec();
    return conversation?.agentId?.toString();
  }
}
