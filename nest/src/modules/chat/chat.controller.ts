import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(':id')
  getChat(@Param('id') id: string): Promise<Chat | null> {
    return this.chatService.getChat(id);
  }

  @Get()
  getChatsByOwner(@Query('owner') owner: string): Promise<Chat[]> {
    return this.chatService.getChatsByOwner(owner);
  }

  @Post()
  createChat(@Body() body: { owner: string; title: string }): Promise<Chat> {
    return this.chatService.createChat(body);
  }
}
