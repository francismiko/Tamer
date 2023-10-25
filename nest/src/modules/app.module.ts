import { Module } from '@nestjs/common';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    MessageModule,
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware()],
      },
    }),
  ],
})
export class AppModule {}
