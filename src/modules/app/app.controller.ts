import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

/**
 * App Controller
 */
@ApiBearerAuth()
@Controller()
export class AppController {
  /**
   * Constructor
   * @param {AppService} appService app service
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Returns the an environment variable from config file
   * @returns {string} the application environment url
   */
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Root Request Completed' })
  @ApiResponse({ status: 400, description: 'Root Request Failed' })
  root(): string {
    return this.appService.root();
  }

  /**
   * Fetches request metadata
   * @param {Req} req the request body
   * @returns {Partial<Request>} the request user populated from the passport module
   */
  @Get('request/user')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'User Metadata Request Completed' })
  @ApiResponse({ status: 400, description: 'User Metadata Request Failed' })
  getRequestUser(@Req() req): Partial<Request> {
    return req.user;
  }
}
