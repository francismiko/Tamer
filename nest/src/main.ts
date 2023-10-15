import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { PrismaClientExceptionFilter } from './filter/prisma-client-exception.filter';

const bootstrap = async (): Promise<void> => {
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
};

bootstrap();
