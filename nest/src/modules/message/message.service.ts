import { createChatModel } from '@lib/chatModel';
import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { BaseMessage, HumanMessage } from 'langchain/schema';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  getMessage(id: string): Promise<Message | null> {
    return this.prisma.message.findUnique({
      where: { id },
    });
  }

  generateAIMessage(input: { message: string }): Promise<BaseMessage> {
    const { message } = input;
    const chatModel = createChatModel();

    return chatModel.call([new HumanMessage(message)]);
  }
}
