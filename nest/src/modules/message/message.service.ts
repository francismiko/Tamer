import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  getMessage(id: string): Promise<Message | null> {
    return this.prisma.message.findUnique({
      where: { id },
    });
  }

  generateAIMessage(input: Message): Promise<Message> {
    return this.prisma.message.create({
      data: input,
    });
  }
}
