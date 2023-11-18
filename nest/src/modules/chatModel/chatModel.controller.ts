import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatModel } from '@prisma/client';
import { ChatModelService } from './chatModel.service';

@Controller('chat-model')
export class ChatModelController {
  constructor(private readonly chatService: ChatModelService) {}

  @Get(':id')
  getChat(@Param('id') id: string): Promise<ChatModel | null> {
    return this.chatService.getChatModel(id);
  }

  @Post()
  createChatModel(
    @Body() body: { model: string; owner: string; chatId: string },
  ): Promise<ChatModel> {
    return this.chatService.createChatModel(body);
  }
}
