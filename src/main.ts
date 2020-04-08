import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from '@payk/nestjs-winston';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://127.0.0.1:5500'
    ]
  })

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

  await app.listen(3000);
  Logger.log(`Server running on http://localhost:3000`, 'Bootstrap')
}

bootstrap();
