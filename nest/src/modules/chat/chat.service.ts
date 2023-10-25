import { Injectable } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  createChat(input: Chat): Promise<Chat> {
    return this.prisma.chat.create({
      data: input,
    });
  }
}
