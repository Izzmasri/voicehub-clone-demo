import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ConversationService } from './services/conversation.service';
import { MessageService } from './services/message.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { AgentsService } from '../agents/agents.service';

@Controller('conversations')
export class ChatController {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService,
    private readonly agentsService: AgentsService,
  ) {}

  // POST /conversations - Create new conversation
  @Post()
  async create(@Body() createDto: CreateConversationDto) {
    const conversation = await this.conversationService.create(createDto);
    await this.agentsService.incrementTotal(createDto.agentId);
    return conversation;
  }

  // GET /conversations/agent/:agentId - Get all conversations for agent
  @Get('agent/:agentId')
  async findByAgent(
    @Param('agentId') agentId: string,
    @Query('userId') userId: string,
  ) {
    return this.conversationService.findByAgent(agentId, userId);
  }

  // GET /conversations/:id/messages - Get messages for conversation
  @Get(':id/messages')
  async getMessages(@Param('id') conversationId: string) {
    return this.messageService.findByConversation(conversationId);
  }

  // DELETE /conversations/:id - Delete conversation and its messages
  @Delete(':id')
  async delete(@Param('id') conversationId: string) {
    const agentId = await this.conversationService.getAgentId(conversationId);

    // Delete all messages first
    await this.messageService.deleteByConversation(conversationId);

    // Then delete conversation
    await this.conversationService.delete(conversationId);

    if (agentId) {
      await this.agentsService.decrementTotal(agentId);
    }

    return { message: 'Conversation deleted successfully' };
  }
}
