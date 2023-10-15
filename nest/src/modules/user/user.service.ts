import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getUser(params: { id: string }): Promise<User | null> {
    const { id } = params;

    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  createUser(input: User): Promise<User> {
    return this.prisma.user.create({
      data: input,
    });
  }
}
