import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { PrismaClientExceptionFilter } from './filter/prisma-client-exception.filter';
import { logger } from './middleware/logger.middleware';

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
    .use(logger)
    .useGlobalFilters(new PrismaClientExceptionFilter())
    .useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT || 8000);

  new Logger('Running').log(`🚀 Service is running on: ${await app.getUrl()}`);
};

bootstrap();
