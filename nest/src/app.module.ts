import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    UserModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
