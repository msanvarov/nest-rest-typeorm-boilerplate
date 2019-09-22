import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ProfileModule } from '../profile/profile.module';
import { ConfigModule } from '../config/config.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('WEBTOKEN_SECRET_KEY'),
          signOptions: {
            ...(configService.get('WEBTOKEN_EXPIRATION_TIME')
              ? {
                  expiresIn: Number(
                    configService.get('WEBTOKEN_EXPIRATION_TIME'),
                  ),
                }
              : {}),
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
    ProfileModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule.register({ defaultStrategy: 'jwt' })],
})
export class AuthModule {}
