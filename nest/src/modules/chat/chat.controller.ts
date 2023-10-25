import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  getChatsByOwner(@Query('owner') owner: string): Promise<Chat[]> {
    return this.chatService.getChatsByOwner(owner);
  }

  @Post()
  createChat(@Body() body: Chat): Promise<Chat> {
    return this.chatService.createChat(body);
  }
}
