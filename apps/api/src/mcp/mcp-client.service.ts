import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

import {
  McpContentBlock,
  McpPromptSummary,
  McpResourceSummary,
  McpServerInfo,
  McpToolSummary,
} from '@starter/mcp-types';

interface RemoteConnection {
  id: string;
  endpoint: string;
  client: Client;
  info: McpServerInfo;
  tools: McpToolSummary[];
  resources: McpResourceSummary[];
  prompts: McpPromptSummary[];
}

/**
 * Connects the API to one or more *external* MCP servers listed in the
 * MCP_CLIENT_REMOTES env var (comma-separated URLs). Each remote is
 * connected over Streamable HTTP, and its tools / resources / prompts are
 * mirrored into the gateway inventory so they can be called from the
 * Angular chat UI just like local ones.
 */
@Injectable()
export class McpClientService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(McpClientService.name);
  private readonly connections = new Map<string, RemoteConnection>();

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const raw = this.configService.get<string>('MCP_CLIENT_REMOTES') ?? '';
    const endpoints = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (endpoints.length === 0) {
      this.logger.log('No MCP_CLIENT_REMOTES configured; client is idle.');
      return;
    }

    await Promise.all(endpoints.map((url, idx) => this.connect(url, idx)));
  }

  async onModuleDestroy(): Promise<void> {
    await Promise.all(
      Array.from(this.connections.values()).map(async (conn) => {
        try {
          await conn.client.close();
        } catch (err) {
          this.logger.warn(
            `Failed to close MCP client for ${conn.endpoint}: ${err}`,
          );
        }
      }),
    );
    this.connections.clear();
  }

  listConnections(): McpServerInfo[] {
    return Array.from(this.connections.values()).map((c) => c.info);
  }

  listTools(): McpToolSummary[] {
    return Array.from(this.connections.values()).flatMap((c) => c.tools);
  }

  listResources(): McpResourceSummary[] {
    return Array.from(this.connections.values()).flatMap((c) => c.resources);
  }

  listPrompts(): McpPromptSummary[] {
    return Array.from(this.connections.values()).flatMap((c) => c.prompts);
  }

  async invokeTool(
    serverId: string,
    name: string,
    args: Record<string, unknown> = {},
  ): Promise<McpContentBlock[]> {
    const conn = this.connections.get(serverId);
    if (!conn) {
      throw new NotFoundException(`Unknown remote MCP server: ${serverId}`);
    }
    const result = await conn.client.callTool({ name, arguments: args });
    return (result.content ?? []) as McpContentBlock[];
  }

  async readResource(
    serverId: string,
    uri: string,
  ): Promise<McpContentBlock[]> {
    const conn = this.connections.get(serverId);
    if (!conn) {
      throw new NotFoundException(`Unknown remote MCP server: ${serverId}`);
    }
    const result = await conn.client.readResource({ uri });
    return (result.contents ?? []).map((c) => ({
      type: 'resource' as const,
      resource: {
        uri: c.uri,
        mimeType: c.mimeType,
        text: typeof c.text === 'string' ? c.text : undefined,
      },
    }));
  }

  private async connect(endpoint: string, index: number): Promise<void> {
    const id = `remote-${index}`;
    const client = new Client(
      { name: `nest-mcp-client[${id}]`, version: '1.0.0' },
      { capabilities: {} },
    );

    try {
      const transport = new StreamableHTTPClientTransport(new URL(endpoint));
      await client.connect(transport);

      const [toolsRes, resourcesRes, promptsRes] = await Promise.all([
        client.listTools().catch(() => ({ tools: [] })),
        client.listResources().catch(() => ({ resources: [] })),
        client.listPrompts().catch(() => ({ prompts: [] })),
      ]);

      const info: McpServerInfo = {
        id,
        name: endpoint,
        version: undefined,
        kind: 'remote',
        endpoint,
        connected: true,
      };

      const conn: RemoteConnection = {
        id,
        endpoint,
        client,
        info,
        tools: (toolsRes.tools ?? []).map((t) => ({
          name: t.name,
          description: t.description,
          inputSchema: t.inputSchema as Record<string, unknown> | undefined,
          serverId: id,
        })),
        resources: (resourcesRes.resources ?? []).map((r) => ({
          uri: r.uri,
          name: r.name,
          description: r.description,
          mimeType: r.mimeType,
          serverId: id,
        })),
        prompts: (promptsRes.prompts ?? []).map((p) => ({
          name: p.name,
          description: p.description,
          arguments: p.arguments?.map((a) => ({
            name: a.name,
            description: a.description,
            required: a.required,
          })),
          serverId: id,
        })),
      };

      this.connections.set(id, conn);
      this.logger.log(
        `Connected to remote MCP ${endpoint} (${conn.tools.length} tools, ${conn.resources.length} resources)`,
      );
    } catch (err) {
      this.logger.error(`Failed to connect to MCP remote ${endpoint}: ${err}`);
      this.connections.set(id, {
        id,
        endpoint,
        client,
        info: {
          id,
          name: endpoint,
          kind: 'remote',
          endpoint,
          connected: false,
        },
        tools: [],
        resources: [],
        prompts: [],
      });
    }
  }
}
