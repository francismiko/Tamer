import { Injectable } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  getChat(id: string): Promise<Chat | null> {
    return this.prisma.chat.findUnique({
      where: {
        id,
      },
      include: {
        chat_model: true,
      },
    });
  }

  getChatsByOwner(owner: string): Promise<Chat[]> {
    return this.prisma.chat.findMany({
      where: {
        owner,
      },
      orderBy: {
        create_at: 'desc',
      },
    });
  }

  createChat({
    owner,
    title,
  }: {
    owner: string;
    title: string;
  }): Promise<Chat> {
    return this.prisma.chat.create({
      data: {
        owner,
        title,
      },
    });
  }

  deleteChat(id: string): Promise<Chat | null> {
    return this.prisma.chat.delete({
      where: { id },
    });
  }
}
