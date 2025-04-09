import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

function setupDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Egen Docs.')
    .setDescription('The egen API description')
    .setVersion('1.0')
    .addTag('kickstart')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupDocs(app);
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3100);
}
bootstrap();
