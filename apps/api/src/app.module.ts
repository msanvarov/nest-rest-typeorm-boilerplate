import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as joi from 'joi';
import { WinstonModule } from 'nest-winston';
import { join } from 'path';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { McpModule } from './mcp/mcp.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: joi.object({
        APP_ENV: joi
          .string()
          .valid('development', 'production')
          .default('development'),
        PORT: joi.number().default(3333),
        WEBTOKEN_ENCRYPTION_KEY: joi.string().required(),
        WEBTOKEN_EXPIRATION_TIME: joi.number().default(1800),
        DB_TYPE: joi.string().default('mysql'),
        DB_USERNAME: joi.string().default('root'),
        DB_PASSWORD: joi.string().allow('').default(''),
        DB_HOST: joi.string().default('localhost'),
        DB_PORT: joi.number().default(3306),
        DB_DATABASE: joi.string().default('nest'),
        MCP_SERVER_NAME: joi.string().default('nest-rest-typeorm-mcp'),
        MCP_SERVER_VERSION: joi.string().default('1.0.0'),
        MCP_CLIENT_REMOTES: joi.string().allow('').default(''),
      }),
    }),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get('APP_ENV') === 'production'
          ? [{ rootPath: join(__dirname, '..', 'ui') }]
          : [],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: configService.get<'mysql' | 'mariadb' | 'postgres'>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
        synchronize: configService.get('APP_ENV') === 'development',
        autoLoadEntities: true,
        logging: configService.get('APP_ENV') === 'development',
      }),
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('APP_ENV') === 'development'
          ? {
              level: 'info',
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple(),
              ),
              defaultMeta: { service: 'nest-typeorm-service' },
              transports: [new winston.transports.Console()],
            }
          : {
              level: 'info',
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
              ),
              defaultMeta: { service: 'nest-typeorm-service' },
              transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                  filename: 'logs/error.log',
                  level: 'error',
                }),
                new DailyRotateFile({
                  filename: 'logs/application-%DATE%.log',
                  datePattern: 'YYYY-MM-DD',
                  zippedArchive: true,
                  maxSize: '20m',
                  maxFiles: '14d',
                }),
              ],
            },
    }),
    AuthModule,
    UsersModule,
    CaslModule,
    McpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
