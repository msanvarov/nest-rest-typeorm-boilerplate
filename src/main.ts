import helmet from '@fastify/helmet';
import fastifyRateLimiter from '@fastify/rate-limit';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

export const OPEN_API_ROOT = 'api/v1/docs';
export const OPEN_API_NAME = 'API';
export const OPEN_API_DESCRIPTION = 'API Description';
export const OPEN_API_CURRENT_VERSION = '1.0';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    { bufferLogs: true },
  );

  const options = new DocumentBuilder()
    .setTitle(OPEN_API_NAME)
    .setDescription(OPEN_API_DESCRIPTION)
    .setVersion(OPEN_API_CURRENT_VERSION)
    .addServer('/api')
    .addBearerAuth()
    .build();

  app.enableCors();
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        'script-src-attr': ["'unsafe-inline'"],
      },
    },
  });
  await app.register(fastifyRateLimiter, {
    max: 100,
    timeWindow: '1 minute',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(OPEN_API_ROOT, app, document);

  const port = Number(process.env.PORT) || 3333;

  await app.listen(port, '0.0.0.0');
  Logger.log(
    `Application is running on: http://localhost:${port}/${globalPrefix}`,
    'Bootstrap',
  );
}

bootstrap();
