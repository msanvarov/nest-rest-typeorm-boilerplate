import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressRateLimiter from 'express-rate-limit';
import headers from 'helmet';

import { AppModule } from './app.module';

/**
 * The endpoint for open api ui
 * @type {string}
 */
export const OPEN_API_ROOT = 'api/v1/docs';
/**
 * The name given to the api
 * @type {string}
 */
export const OPEN_API_NAME = 'API';
/**
 * A short description for api
 * @type {string}
 */
export const OPEN_API_DESCRIPTION = 'API Description';
/**
 * Current version of the api
 * @type {string}
 */
export const OPEN_API_CURRENT_VERSION = '1.0';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: console });

  const options = new DocumentBuilder()
    .setTitle(OPEN_API_NAME)
    .setDescription(OPEN_API_DESCRIPTION)
    .setVersion(OPEN_API_CURRENT_VERSION)
    .addBearerAuth()
    .build();

  app.enableCors();
  app.use(headers());
  app.use(
    expressRateLimiter({
      max: 100,
      windowMs: 60 * 1000, // 1 minute,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(OPEN_API_ROOT, app, document);

  const port = process.env.PORT || 3333;

  await app.listen(port, '0.0.0.0');
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
