import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Message } from '@prisma/client';
import { Response } from 'express';
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
  @Header('Content-Type', 'text/event-stream')
  async generateAIMessage(
    @Res() response: Response,
    @Body() body: { message: string; chatId: string },
  ): Promise<void> {
    const stream = await this.messageService.generateAIMessage(body);

    for await (const chunk of stream) {
      response.write(chunk);
    }

    response.end();
  }
}
