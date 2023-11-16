import { createGPTChatModel } from '@lib/chatModel';
import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { IterableReadableStream } from 'langchain/dist/util/stream';
import { HttpResponseOutputParser } from 'langchain/output_parsers';
import { HumanMessage } from 'langchain/schema';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  getMessage(id: string): Promise<Message | null> {
    return this.prisma.message.findUnique({
      where: { id },
    });
  }

  getMessagesByChatId(chat_id: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { chat_id },
    });
  }

  async generateAIMessage(input: {
    message: string;
    chatId: string;
  }): Promise<IterableReadableStream<Uint8Array>> {
    const { message, chatId } = input;

    const chatModel = createGPTChatModel();

    const parser = new HttpResponseOutputParser({
      contentType: 'text/event-stream',
    });

    await this.prisma.message.create({
      data: {
        content: message,
        sender: 'Human',
        status: 'Done',
        chat_id: chatId,
      },
    });

    const stream = await chatModel
      .pipe(parser)
      .stream([new HumanMessage(message)]);

    return stream;
  }
}
