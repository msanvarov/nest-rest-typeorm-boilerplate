import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

/**
 * App Controller
 */
@ApiBearerAuth()
@Controller()
export class AppController {
  /**
   * Constructor
   * @param appService
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Main route
   * @returns {string} the application environment url
   */
  @Get()
  @UseGuards(AuthGuard())
  root(): string {
    return this.appService.root();
  }

  /**
   * Fetch the request body user
   * @param req
   */
  @Get('request/user')
  @UseGuards(AuthGuard())
  getRequestUser(@Req() req) {
    return req.user;
  }
}
