import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
  });

  const clientPath = join(__dirname, '../frontend/dist');
  const uploadsPath = join(__dirname, '../uploads');

  app.useStaticAssets(clientPath);
  app.useStaticAssets(uploadsPath, { prefix: '/uploads/' });
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
