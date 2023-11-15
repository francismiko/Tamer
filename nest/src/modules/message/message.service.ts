import { createGPTChatModel } from '@lib/chatModel';
import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
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
  }): Promise<Message> {
    const { message, chatId } = input;
    const chatModel = createGPTChatModel();

    const res = await chatModel.call([new HumanMessage(message)]);
    const AIMessage = res.content;

    await this.prisma.message.create({
      data: {
        content: message,
        sender: 'Human',
        status: 'Done',
        chat_id: chatId,
      },
    });

    // TODO: use chunking to send multiple messages
    return this.prisma.message.create({
      data: {
        content: AIMessage,
        sender: 'AI',
        status: 'Done',
        chat_id: chatId,
      },
    });
  }
}
