import {
  All,
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { FastifyReply, FastifyRequest } from 'fastify';

import {
  McpChatRequest,
  McpChatResponse,
  McpInventory,
  McpToolInvocationRequest,
  McpToolInvocationResponse,
} from './mcp.types';

import { Public } from '../auth/public.decorator';
import { McpGatewayService } from './mcp-gateway.service';
import { McpServerService } from './mcp-server.service';

@ApiTags('mcp')
@Controller('v1/mcp')
export class McpController {
  constructor(
    private readonly gateway: McpGatewayService,
    private readonly server: McpServerService,
  ) {}

  @Public()
  @Get('inventory')
  inventory(): McpInventory {
    return this.gateway.inventory();
  }

  @Public()
  @Post('invoke')
  invoke(
    @Body() body: McpToolInvocationRequest,
  ): Promise<McpToolInvocationResponse> {
    return this.gateway.invokeTool(body);
  }

  @Public()
  @Get('resource')
  resource(
    @Query('serverId') serverId: string,
    @Query('uri') uri: string,
  ): Promise<McpToolInvocationResponse> {
    if (!serverId || !uri) {
      throw new BadRequestException(
        'Both "serverId" and "uri" query parameters are required.',
      );
    }
    return this.gateway
      .readResource(serverId, uri)
      .then((content) => ({ content }));
  }

  @Public()
  @Post('chat')
  chat(@Body() body: McpChatRequest): Promise<McpChatResponse> {
    return this.gateway.chat(body);
  }

  /**
   * Native MCP Streamable HTTP transport. External MCP clients (Claude
   * Desktop / Code, mcp-cli, etc.) point at this URL and speak the
   * protocol directly. The Angular preview uses the JSON endpoints above
   * instead so the browser doesn't need to bundle the SDK.
   */
  @Public()
  @All('transport')
  async transport(
    @Req() req: FastifyRequest,
    @Res() reply: FastifyReply,
  ): Promise<void> {
    await this.server.handleTransportRequest(
      req.raw,
      reply.raw,
      (req as FastifyRequest & { body: unknown }).body,
    );
  }
}
