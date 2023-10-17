import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { ChatOpenAI } from 'langchain/chat_models/openai';
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

  async generateAIMessage(input: { message: string }): Promise<BaseMessage> {
    const { message } = input;
    const model = new ChatOpenAI({ temperature: 1, timeout: 10000 });

    const response = await model.call([new HumanMessage(message)]);
    return response;
  }
}
