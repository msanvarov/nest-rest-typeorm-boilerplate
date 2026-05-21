import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import type { IncomingMessage, ServerResponse } from 'http';
import { z } from 'zod';

import { McpToolSummary, McpResourceSummary } from '@starter/mcp-types';

import { UsersService } from '../users/users.service';

const LOCAL_SERVER_ID = 'local';

/**
 * Runs an in-process MCP server that exposes a curated slice of the API
 * (users + auth metadata) over the Model Context Protocol. The same server
 * instance powers two surfaces:
 *
 *   - The native MCP Streamable HTTP transport at /api/v1/mcp/transport so
 *     Claude Desktop / Code and other MCP clients can connect directly.
 *   - The internal `invokeTool` / `readResource` API used by the gateway
 *     service to power the Angular chat preview.
 */
@Injectable()
export class McpServerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(McpServerService.name);
  private readonly serverName: string;
  private readonly serverVersion: string;

  private server!: McpServer;
  private transport?: StreamableHTTPServerTransport;
  private readonly tools: McpToolSummary[] = [];
  private readonly resources: McpResourceSummary[] = [];
  private readonly toolHandlers = new Map<
    string,
    (args: Record<string, unknown>) => Promise<string>
  >();
  private readonly resourceHandlers = new Map<
    string,
    (uri: URL) => Promise<{ text: string; mimeType?: string }>
  >();

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    this.serverName =
      this.configService.get<string>('MCP_SERVER_NAME') ??
      'nest-rest-typeorm-mcp';
    this.serverVersion =
      this.configService.get<string>('MCP_SERVER_VERSION') ?? '1.0.0';
  }

  async onModuleInit(): Promise<void> {
    this.server = new McpServer({
      name: this.serverName,
      version: this.serverVersion,
    });

    this.registerListUsersTool();
    this.registerGetUserTool();
    this.registerSchemaResource();
    this.registerServerInfoResource();

    this.transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () =>
        globalThis.crypto?.randomUUID?.() ??
        Math.random().toString(36).slice(2),
    });
    await this.server.connect(this.transport);

    this.logger.log(
      `Local MCP server "${this.serverName}@${this.serverVersion}" ready with ${this.tools.length} tools and ${this.resources.length} resources`,
    );
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await this.transport?.close();
    } catch (err) {
      this.logger.warn(`Failed to close MCP transport cleanly: ${err}`);
    }
  }

  get id(): string {
    return LOCAL_SERVER_ID;
  }

  get name(): string {
    return this.serverName;
  }

  get version(): string {
    return this.serverVersion;
  }

  listTools(): McpToolSummary[] {
    return this.tools;
  }

  listResources(): McpResourceSummary[] {
    return this.resources;
  }

  async invokeTool(
    name: string,
    args: Record<string, unknown> = {},
  ): Promise<string> {
    const handler = this.toolHandlers.get(name);
    if (!handler) {
      throw new Error(`Unknown MCP tool: ${name}`);
    }
    return handler(args);
  }

  async readResource(uri: string): Promise<{ text: string; mimeType?: string }> {
    const handler = this.resourceHandlers.get(uri);
    if (!handler) {
      throw new Error(`Unknown MCP resource: ${uri}`);
    }
    return handler(new URL(uri));
  }

  /**
   * Bridges a Fastify request into the MCP Streamable HTTP transport. The
   * controller pulls `req.raw` / `reply.raw` because the SDK works with the
   * underlying Node IncomingMessage / ServerResponse.
   */
  async handleTransportRequest(
    req: IncomingMessage,
    res: ServerResponse,
    body: unknown,
  ): Promise<void> {
    if (!this.transport) {
      res.statusCode = 503;
      res.end(JSON.stringify({ error: 'MCP transport not initialised yet' }));
      return;
    }
    await this.transport.handleRequest(req, res, body);
  }

  private registerListUsersTool(): void {
    const description = 'List up to N users from the database.';
    const inputSchema = { limit: z.number().int().min(1).max(200).optional() };

    this.server.registerTool(
      'list-users',
      { description, inputSchema },
      async ({ limit }) => {
        const users = await this.usersService.list(limit ?? 25);
        const rows = users.map((u) => ({
          id: u.id,
          username: u.username,
          name: u.name,
          email: u.email,
          roles: u.roles?.map((r) => r.role) ?? [],
        }));
        return {
          content: [
            { type: 'text', text: JSON.stringify(rows, null, 2) },
          ],
        };
      },
    );

    this.tools.push({
      name: 'list-users',
      description,
      serverId: LOCAL_SERVER_ID,
      inputSchema: {
        type: 'object',
        properties: {
          limit: { type: 'integer', minimum: 1, maximum: 200 },
        },
      },
    });
    this.toolHandlers.set('list-users', async (args) => {
      const raw = Number(args.limit);
      const parsed = Number.isFinite(raw) ? Math.trunc(raw) : 25;
      const limit = Math.max(1, Math.min(parsed || 25, 200));
      const users = await this.usersService.list(limit);
      return JSON.stringify(
        users.map((u) => ({
          id: u.id,
          username: u.username,
          name: u.name,
          email: u.email,
          roles: u.roles?.map((r) => r.role) ?? [],
        })),
        null,
        2,
      );
    });
  }

  private registerGetUserTool(): void {
    const description = 'Look up a single user by username.';
    const inputSchema = { username: z.string().min(1) };

    this.server.registerTool(
      'get-user',
      { description, inputSchema },
      async ({ username }) => {
        const user = await this.usersService.getByUsername(username);
        if (!user) {
          return {
            isError: true,
            content: [{ type: 'text', text: `No user named "${username}"` }],
          };
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                {
                  id: user.id,
                  username: user.username,
                  name: user.name,
                  email: user.email,
                  roles: user.roles?.map((r) => r.role) ?? [],
                },
                null,
                2,
              ),
            },
          ],
        };
      },
    );

    this.tools.push({
      name: 'get-user',
      description,
      serverId: LOCAL_SERVER_ID,
      inputSchema: {
        type: 'object',
        required: ['username'],
        properties: { username: { type: 'string', minLength: 1 } },
      },
    });
    this.toolHandlers.set('get-user', async (args) => {
      const username = String(args.username ?? '');
      if (!username) {
        throw new Error('username is required');
      }
      const user = await this.usersService.getByUsername(username);
      if (!user) {
        return `No user named "${username}"`;
      }
      return JSON.stringify(
        {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          roles: user.roles?.map((r) => r.role) ?? [],
        },
        null,
        2,
      );
    });
  }

  private registerSchemaResource(): void {
    const uri = 'mcp://nest/schema/users';
    const text = JSON.stringify(
      {
        entity: 'User',
        columns: {
          id: 'number',
          username: 'string (unique)',
          name: 'string',
          email: 'string',
          gravatar: 'string (url)',
          roles: 'UserRoles[] (one-to-many)',
        },
      },
      null,
      2,
    );

    this.server.registerResource(
      'users-schema',
      uri,
      {
        title: 'Users table schema',
        description: 'Static description of the User entity columns.',
        mimeType: 'application/json',
      },
      async () => ({
        contents: [{ uri, mimeType: 'application/json', text }],
      }),
    );

    this.resources.push({
      uri,
      name: 'Users table schema',
      description: 'Static description of the User entity columns.',
      mimeType: 'application/json',
      serverId: LOCAL_SERVER_ID,
    });
    this.resourceHandlers.set(uri, async () => ({
      text,
      mimeType: 'application/json',
    }));
  }

  private registerServerInfoResource(): void {
    const uri = 'mcp://nest/server-info';

    this.server.registerResource(
      'server-info',
      uri,
      {
        title: 'Server info',
        description: 'Name, version, and runtime info for this MCP server.',
        mimeType: 'application/json',
      },
      async () => {
        const text = JSON.stringify(
          {
            name: this.serverName,
            version: this.serverVersion,
            node: process.version,
            uptimeSeconds: Math.round(process.uptime()),
          },
          null,
          2,
        );
        return {
          contents: [{ uri, mimeType: 'application/json', text }],
        };
      },
    );

    this.resources.push({
      uri,
      name: 'Server info',
      description: 'Name, version, and runtime info for this MCP server.',
      mimeType: 'application/json',
      serverId: LOCAL_SERVER_ID,
    });
    this.resourceHandlers.set(uri, async () => ({
      text: JSON.stringify(
        {
          name: this.serverName,
          version: this.serverVersion,
          node: process.version,
          uptimeSeconds: Math.round(process.uptime()),
        },
        null,
        2,
      ),
      mimeType: 'application/json',
    }));
  }
}
