import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from '../profile/profile.service';

@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  @UseGuards(AuthGuard())
  root(): string {
    return this.appService.root();
  }

  @Get('/api/profile')
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: 'Request Received' })
  @ApiResponse({ status: 400, description: 'Request Failed' })
  getProfile(@Req() req) {
    return req.user;
  }

  @Delete('/api/profile/:username')
  @ApiResponse({ status: 200, description: 'Request Received' })
  @ApiResponse({ status: 400, description: 'Request Failed' })
  async delete(@Param('username') username: string) {
    return await this.profileService.delete(username);
  }
}
