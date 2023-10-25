import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from '@prisma/client';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  generateAIMessage(@Body() body: Chat): Promise<Chat> {
    return this.chatService.createChat(body);
  }
}
