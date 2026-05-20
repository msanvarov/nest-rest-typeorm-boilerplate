import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRoles } from '../users/user-role.entity';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { McpController } from './mcp.controller';
import { McpClientService } from './mcp-client.service';
import { McpGatewayService } from './mcp-gateway.service';
import { McpServerService } from './mcp-server.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, UserRoles])],
  controllers: [McpController],
  providers: [
    UsersService,
    McpServerService,
    McpClientService,
    McpGatewayService,
  ],
  exports: [McpServerService, McpClientService, McpGatewayService],
})
export class McpModule {}
