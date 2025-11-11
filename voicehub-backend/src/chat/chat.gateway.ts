import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConversationService } from './services/conversation.service';
import { MessageService } from './services/message.service';
import { MessageSender } from './schemas/message.schema';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: {
      conversationId: string;
      agentId: string;
      message: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Received message:', data);

    try {
      // 1. Save user message to database
      const userMessage = await this.messageService.create({
        conversationId: data.conversationId,
        sender: MessageSender.USER,
        text: data.message,
      });

      console.log('User message saved:', userMessage);

      // 2. Update conversation's lastMessageAt
      await this.conversationService.updateLastMessage(data.conversationId);

      // 3. Generate agent response (still fake for now, LLM later)
      const agentResponseText = `Thank you for your message: "${data.message}". This is a response from the NestJS backend!`;

      // 4. Save agent response to database
      const agentMessage = await this.messageService.create({
        conversationId: data.conversationId,
        sender: MessageSender.AGENT,
        text: agentResponseText,
      });

      // 5. Update conversation's lastMessageAt again
      await this.conversationService.updateLastMessage(data.conversationId);

      // 6. Send response back to client
      const response = {
        _id: agentMessage._id,
        conversationId: data.conversationId,
        sender: 'AGENT',
        text: agentMessage.text,
        timestamp: agentMessage.timestamp.toISOString(),
      };

      client.emit('receiveMessage', response);

      return { status: 'Message received and saved' };
    } catch (error) {
      console.error('Error handling message:', error);
      client.emit('error', { message: 'Failed to save message' });
    }
  }
}
