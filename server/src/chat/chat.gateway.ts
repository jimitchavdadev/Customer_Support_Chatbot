
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('join')
  handleJoin(@MessageBody() data: { sessionId: string }, @ConnectedSocket() client: Socket) {
    client.join(data.sessionId);
    console.log(`Client ${client.id} joined session ${data.sessionId}`);
    return { status: 'joined', sessionId: data.sessionId };
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { sessionId: string, message: string }) {
    console.log(`Received message from ${data.sessionId}: ${data.message}`);

    // TODO: This is where we will hook in the AI Agent later
    // For now, we just echo the message back to prove it works
    this.server.to(data.sessionId).emit('message', {
        role: 'assistant',
        message: `Echo: ${data.message}`
    });
  }
}
