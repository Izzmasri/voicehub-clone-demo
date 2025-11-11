import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import {
  Conversation,
  ConversationSchema,
} from './schemas/conversation.schema';
import { Message, MessageSchema } from './schemas/message.schema';
import { ConversationService } from './services/conversation.service';
import { MessageService } from './services/message.service';
import { ChatController } from './chat.controller';
import { AgentsModule } from 'src/agents/agents.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    AgentsModule,
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ConversationService, MessageService],
  exports: [ConversationService, MessageService],
})
export class ChatModule {}
