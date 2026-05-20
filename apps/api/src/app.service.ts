import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

import { IMessage } from '@starter/api-types';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  startingMessage(): IMessage {
    this.logger.info('Calling startingMessage -> ', AppService.name);

    return {
      message: 'Welcome to api! Navigate to api/v1/docs for documentation.',
    };
  }
}
