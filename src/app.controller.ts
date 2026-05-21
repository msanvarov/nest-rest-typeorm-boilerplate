import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { IMessage } from './shared/api-types';

import { AppService } from './app.service';
import { Public } from './auth/public.decorator';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/')
  @ApiResponse({ status: 200, description: 'Root Request Completed' })
  @ApiResponse({ status: 400, description: 'Root Request Failed' })
  getStartingMessage(): IMessage {
    return this.appService.startingMessage();
  }
}
