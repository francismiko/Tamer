import { Injectable } from '@nestjs/common';
import type { ChatModel } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ChatModelService {
  constructor(private prisma: PrismaService) {}

  getChatModel(id: string): Promise<ChatModel | null> {
    return this.prisma.chatModel.findUnique({
      where: {
        id,
      },
    });
  }

  createChatModel({
    model,
    owner,
    chatId,
  }: {
    model: string;
    owner: string;
    chatId: string;
  }): Promise<ChatModel> {
    return this.prisma.chatModel.create({
      data: {
        model,
        owner,
        chat_id: chatId,
      },
    });
  }
}
