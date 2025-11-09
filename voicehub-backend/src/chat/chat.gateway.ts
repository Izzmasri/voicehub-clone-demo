import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// This decorator makes this class a WebSocket gateway
// cors: true allows your Next.js app to connect
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway {
  // This gives us access to the Socket.IO server instance
  @WebSocketServer()
  server: Server;

  // Called when a client connects
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Called when a client disconnects
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Listen for 'sendMessage' events from clients
  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { agentId: number; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Received message:', data);

    // Simulate agent response (later we'll add LLM here)
    const agentResponse = {
      sender: 'agent',
      text: `Thank you for your message: "${data.message}". This is a response from the NestJS backend!`,
      timestamp: new Date().toISOString(),
    };

    // Send response back to the client who sent the message
    client.emit('receiveMessage', agentResponse);

    return { status: 'Message received' };
  }
}
