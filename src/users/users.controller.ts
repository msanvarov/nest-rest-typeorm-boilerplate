import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';

import { IGenericMessageBody } from '../shared/api-types';

import { CheckPolicies } from '../casl/check-policies.decorator';
import { PoliciesGuard } from '../casl/policies.guard';
import { DeleteUserPolicyHandler } from '../casl/policy-handlers';
import { PatchUserDto } from './dto/patch-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

type AuthedRequest = FastifyRequest & { user: User };

@ApiBearerAuth()
@ApiTags('users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('user')
  getUser(@Request() req: AuthedRequest): User {
    return req.user;
  }

  @Get(':username')
  @ApiResponse({ status: 200, description: 'Fetch User Request Received' })
  @ApiResponse({ status: 400, description: 'Fetch User Request Failed' })
  async getUserByUsername(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.getByUsername(username);
    if (!user) {
      throw new BadRequestException(
        'The user with that username could not be found.',
      );
    }
    return user;
  }

  @Patch()
  @ApiResponse({ status: 200, description: 'Patch User Request Received' })
  @ApiResponse({ status: 400, description: 'Patch User Request Failed' })
  async patchUser(@Body() payload: PatchUserDto): Promise<User> {
    return this.usersService.edit(payload);
  }

  @Delete(':username')
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new DeleteUserPolicyHandler())
  @ApiResponse({ status: 200, description: 'Delete User Request Received' })
  @ApiResponse({ status: 400, description: 'Delete User Request Failed' })
  async deleteUserByUsername(
    @Param('username') username: string,
  ): Promise<IGenericMessageBody> {
    return this.usersService.delete(username);
  }
}
