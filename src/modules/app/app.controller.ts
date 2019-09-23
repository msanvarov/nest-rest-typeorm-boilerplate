import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from '../profile/profile.service';
import { ACGuard, UseRoles } from 'nest-access-control';

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

  // These routes can be moved to the profile module.

  @Get('/api/profile')
  @UseGuards(AuthGuard())
  @ApiResponse({ status: 200, description: 'Request Received' })
  @ApiResponse({ status: 400, description: 'Request Failed' })
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    resource: 'profiles',
    action: 'delete',
    possession: 'any',
  })
  @Delete('/api/profile/:username')
  @ApiResponse({ status: 200, description: 'Request Received' })
  @ApiResponse({ status: 400, description: 'Request Failed' })
  async delete(@Param('username') username: string) {
    return await this.profileService.delete(username);
  }
}
