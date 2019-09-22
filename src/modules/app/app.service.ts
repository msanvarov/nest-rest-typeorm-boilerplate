import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { Logger } from 'winston';

@Injectable()
export class AppService {
  constructor(
    private config: ConfigService,
    @Inject('winston') private readonly logger: Logger,
  ) {}

  root(): string {
    const appURL = this.config.get('APP_URL');
    this.logger.info('Logging the APP_URL -> ' + appURL);
    return appURL;
  }
}
