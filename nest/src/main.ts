import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from './filter/prisma-client-exception.filter';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConf = new DocumentBuilder()
    .setTitle('Title')
    .setDescription('Description')
    .setVersion('0.1')
    .build();
  const doc = SwaggerModule.createDocument(app, swaggerConf);
  SwaggerModule.setup('api', app, doc);

  app
    .useGlobalFilters(new PrismaClientExceptionFilter())
    .useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT || 8000);

  const logger = new Logger('Running');
  logger.log(`🚀 Nest service is running on: ${await app.getUrl()}`);
}

bootstrap();
