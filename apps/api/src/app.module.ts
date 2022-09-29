import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as joi from 'joi';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';
import * as winston from 'winston';
import * as winstonFileRotator from 'winston-daily-rotate-file';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        APP_ENV: joi
          .string()
          .valid('development', 'production')
          .default('development'),
        WEBTOKEN_ENCRYPTION_KEY: joi.string().required(),
        WEBTOKEN_EXPIRATION_TIME: joi.number().default(1800),
        DB_TYPE: joi.string().default('mariadb'),
        DB_USERNAME: joi.string().default('root'),
        DB_PASSWORD: joi.string().allow('').default(''),
        DB_HOST: joi.string().default('localhost'),
        DB_PORT: joi.number().default('3306'),
        DB_DATABASE: joi.string().default('nest'),
      }),
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get('APP_ENV') === 'production'
          ? [
              {
                rootPath: join(__dirname, '..', 'ui'),
              },
            ]
          : [],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('DB_TYPE'),
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/**/**.entity{.ts,.js}'],
          synchronize: configService.get('APP_ENV') === 'development',
          autoLoadEntities: true,
          logging: true,
          keepConnectionAlive: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('APP_ENV') === 'development'
          ? {
              level: 'info',
              format: winston.format.json(),
              defaultMeta: { service: 'nest-typeorm-service' },
              transports: [
                new winston.transports.Console({
                  format: winston.format.simple(),
                }),
              ],
            }
          : {
              level: 'info',
              format: winston.format.json(),
              defaultMeta: { service: 'nest-typeorm-service' },
              transports: [
                new winston.transports.File({
                  filename: 'logs/error.log',
                  level: 'error',
                }),
                new winston.transports.Console({
                  format: winston.format.simple(),
                }),
                new winstonFileRotator({
                  filename: 'logs/application-%DATE%.log',
                  datePattern: 'YYYY-MM-DD',
                  zippedArchive: true,
                  maxSize: '20m',
                  maxFiles: '14d',
                }),
              ],
            };
      },
    }),
    AuthModule,
    UsersModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
