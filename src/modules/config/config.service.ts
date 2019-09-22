import { parse } from 'dotenv';
import * as joi from '@hapi/joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = parse(fs.readFileSync(filePath));
    this.envConfig = ConfigService.validateInput(config);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private static validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: joi.ObjectSchema = joi.object({
      APP_ENV: joi
        .string()
        .valid('dev', 'prod')
        .required(),
      APP_URL: joi.string().uri({
        scheme: [/https?/],
      }),
      WEBTOKEN_SECRET_KEY: joi.string().required(),
      WEBTOKEN_EXPIRATION_TIME: joi.number().default(1800),
      DB_TYPE: joi.string().default('mariadb'),
      DB_USERNAME: joi.string().default('root'),
      DB_PASSWORD: joi
        .string()
        .allow('')
        .default(''),
      DB_HOST: joi.string().default('localhost'),
      DB_PORT: joi.number().default('8889'),
      DB_DATABASE: joi.string().default('nest'),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  isEnv(env: string) {
    return this.envConfig.APP_ENV === env;
  }
}
