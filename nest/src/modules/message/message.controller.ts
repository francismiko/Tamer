import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Message } from '@prisma/client';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':id')
  getMessage(@Param('id') id: string): Promise<Message | null> {
    return this.messageService.getMessage(id);
  }

  @Post()
  generateAIMessage(@Body() body: Message): Promise<Message> {
    return this.messageService.generateAIMessage(body);
  }
}
