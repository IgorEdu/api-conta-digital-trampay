import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { randomUUID } from 'crypto';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Polyfill para `crypto.randomUUID`
  if (!crypto.randomUUID) {
    (crypto as any).randomUUID = randomUUID;
  }

  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API de conta digital - Trampay')
    .setDescription(
      'O sistema de conta digital da Trampay é um serviço web para gerenciar de forma eficiente e segura as finanças dos usuários, permitindo o controle de saldo, consulta de extratos e registro de movimentações financeiras. Ele abrange tanto transações internas, realizadas entre contas dentro do próprio sistema, quanto transações externas, realizadas por meio da integração com serviços de parceiros bancários. ',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
