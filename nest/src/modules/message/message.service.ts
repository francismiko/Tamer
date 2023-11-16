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

  async generateModelStream(
    message: string,
  ): Promise<IterableReadableStream<Uint8Array>> {
    const chatModel = createGPTChatModel();
    const parser = new HttpResponseOutputParser({
      contentType: 'text/event-stream',
    });

    const stream = await chatModel
      .pipe(parser)
      .stream([new HumanMessage(message)]);

    return stream;
  }

  streamDecode(chunk: Uint8Array): string {
    const decoder = new TextDecoder();
    let buffer = '';
    let str = '';

    buffer += decoder.decode(chunk, { stream: true });
    let eolIndex;
    while ((eolIndex = buffer.indexOf('\n\n')) >= 0) {
      const message = buffer.slice(0, eolIndex).trim();
      buffer = buffer.slice(eolIndex + 2);

      if (message.startsWith('event: data')) {
        const dataLine = message.split('\n')[1];
        if (dataLine.startsWith('data: ')) {
          const dataValue = dataLine.slice('data: '.length);
          str = dataValue;
        }
      }
    }

    return str;
  }

  async createMessage(
    content: string,
    sender: 'Human' | 'AI',
    chatId: string,
  ): Promise<void> {
    await this.prisma.message.create({
      data: {
        content,
        sender,
        status: 'Done',
        chat_id: chatId,
      },
    });
  }
}
