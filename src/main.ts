import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { randomUUID } from 'crypto';

async function bootstrap() {
  // Polyfill para `crypto.randomUUID`
  if (!crypto.randomUUID) {
    (crypto as any).randomUUID = randomUUID;
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
