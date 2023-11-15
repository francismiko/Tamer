import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Message } from '@prisma/client';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':id')
  getMessage(@Param('id') id: string): Promise<Message | null> {
    return this.messageService.getMessage(id);
  }

  @Get()
  getMessagesByChatId(@Query('chat_id') chat_id: string): Promise<Message[]> {
    return this.messageService.getMessagesByChatId(chat_id);
  }

  @Post()
  generateAIMessage(
    @Body() body: { message: string; chatId: string },
  ): Promise<Message> {
    return this.messageService.generateAIMessage(body);
  }
}
